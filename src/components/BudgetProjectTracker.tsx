import React, { useState } from 'react';
import { 
  Coins, 
  Calendar, 
  CheckCircle2, 
  Clock, 
  Building2, 
  UserCheck, 
  AlertCircle, 
  MapPin, 
  ExternalLink,
  ChevronRight,
  TrendingUp,
  FileCheck,
  HardHat,
  Search,
  Filter
} from 'lucide-react';
import { GrievanceItem, Milestone } from '../types';
import { CATEGORY_DETAILS } from '../data/mockData';

interface BudgetProjectTrackerProps {
  grievances: GrievanceItem[];
  selectedProjectGrievance: GrievanceItem | null;
  onClearSelectedProject: () => void;
  onSelectProject: (grievance: GrievanceItem) => void;
}

export const BudgetProjectTracker: React.FC<BudgetProjectTrackerProps> = ({
  grievances,
  selectedProjectGrievance,
  onClearSelectedProject,
  onSelectProject
}) => {
  const [filterScheme, setFilterScheme] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [verifiedAuditMap, setVerifiedAuditMap] = useState<Record<string, boolean>>({});

  // Filter only items that have an allocated government budget
  const budgetedProjects = grievances.filter((g) => g.budgetProject && g.budgetProject.isBudgetAllocated);

  const filteredProjects = budgetedProjects.filter((item) => {
    if (filterScheme !== 'all' && !item.budgetProject?.schemeName?.toLowerCase().includes(filterScheme.toLowerCase())) {
      return false;
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchesTitle = item.title.toLowerCase().includes(q);
      const matchesScheme = item.budgetProject?.schemeName?.toLowerCase().includes(q);
      const matchesDept = item.budgetProject?.nodalDepartment?.toLowerCase().includes(q);
      const matchesLocation = item.location.district.toLowerCase().includes(q) || item.location.wardOrPanchayat.toLowerCase().includes(q);
      if (!matchesTitle && !matchesScheme && !matchesDept && !matchesLocation) return false;
    }
    return true;
  });

  const totalSanctionedLakhs = budgetedProjects.reduce((acc, curr) => acc + (curr.budgetProject?.allocatedAmountLakhs || 0), 0);
  const totalReleasedLakhs = budgetedProjects.reduce((acc, curr) => acc + (curr.budgetProject?.releasedAmountLakhs || 0), 0);
  const totalUtilizedLakhs = budgetedProjects.reduce((acc, curr) => acc + (curr.budgetProject?.utilizedAmountLakhs || 0), 0);

  const activeModalItem = selectedProjectGrievance || null;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6">
      
      {/* Tracker Hero Header */}
      <div className="bg-linear-to-r from-slate-900 via-slate-800 to-slate-900 text-white rounded-2xl p-6 sm:p-8 shadow-lg relative overflow-hidden border border-slate-700">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-500/20 text-amber-300 border border-amber-400/30 uppercase tracking-widest">
                Government Budget & Project Tracking
              </span>
              <span className="text-xs text-slate-300">
                Public Financial Management System (PFMS) Sync
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
              Public Infrastructure Resolution Timelines
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl mt-1">
              Transparent monitoring of government sanctioned funds, assigned contractors, and milestone execution for citizen grievances across municipal jurisdictions.
            </p>
          </div>

          <div className="bg-slate-800/80 border border-slate-700 p-4 rounded-xl flex items-center gap-4 shrink-0 shadow-inner">
            <div className="w-12 h-12 rounded-xl bg-amber-500/20 border border-amber-400/40 flex items-center justify-center text-amber-400">
              <Coins className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[11px] uppercase font-bold text-slate-400 block tracking-wider">
                Total Tracked Capex
              </span>
              <span className="text-2xl font-black text-amber-400 font-mono">
                ₹{(totalSanctionedLakhs / 100).toFixed(2)} Cr
              </span>
              <span className="text-[10px] text-emerald-400 block font-semibold">
                Across {budgetedProjects.length} Sanctioned Redressal Works
              </span>
            </div>
          </div>
        </div>

        {/* Financial Flow Summary Bar */}
        <div className="mt-6 pt-6 border-t border-slate-700/80 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div className="bg-slate-800/60 p-3 rounded-xl border border-slate-700">
            <span className="text-slate-400 block text-[11px]">Sanctioned Allocation</span>
            <span className="text-lg font-bold text-white font-mono">₹{(totalSanctionedLakhs / 100).toFixed(2)} Crores</span>
            <span className="text-[10px] text-slate-400 block mt-0.5">Approved in State/Municipal Budget</span>
          </div>
          <div className="bg-slate-800/60 p-3 rounded-xl border border-slate-700">
            <span className="text-slate-400 block text-[11px]">Treasury Funds Released</span>
            <span className="text-lg font-bold text-amber-300 font-mono">₹{(totalReleasedLakhs / 100).toFixed(2)} Crores</span>
            <span className="text-[10px] text-slate-400 block mt-0.5">{((totalReleasedLakhs / totalSanctionedLakhs) * 100).toFixed(0)}% of sanction released</span>
          </div>
          <div className="bg-slate-800/60 p-3 rounded-xl border border-slate-700">
            <span className="text-slate-400 block text-[11px]">Utilized on Ground</span>
            <span className="text-lg font-bold text-emerald-400 font-mono">₹{(totalUtilizedLakhs / 100).toFixed(2)} Crores</span>
            <span className="text-[10px] text-emerald-300 block mt-0.5">Verified via Contractor MB Records</span>
          </div>
        </div>
      </div>

      {/* SEARCH AND SCHEME FILTER */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search project, scheme, contractor or ward..."
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs sm:text-sm focus:ring-2 focus:ring-amber-500 outline-hidden font-medium"
          />
        </div>

        <div className="flex items-center gap-2 text-xs w-full sm:w-auto justify-end">
          <span className="font-bold text-slate-600 uppercase text-[10px]">Filter Scheme:</span>
          <select
            value={filterScheme}
            onChange={(e) => setFilterScheme(e.target.value)}
            className="px-3 py-1.5 bg-slate-50 border border-slate-300 rounded-lg text-xs font-semibold text-slate-800 outline-hidden"
          >
            <option value="all">All National & State Schemes</option>
            <option value="Smart Cities">Smart Cities Mission</option>
            <option value="Road">Road Infrastructure Schemes</option>
            <option value="Health">National Health Mission</option>
            <option value="Stormwater">Stormwater / AMRUT 2.0</option>
            <option value="Swachh">Swachh Bharat Mission</option>
          </select>
        </div>
      </div>

      {/* PROJECT CARDS WITH DETAILED TIMELINES */}
      <div className="space-y-6">
        {filteredProjects.map((item) => {
          const bp = item.budgetProject!;
          const cat = CATEGORY_DETAILS[item.category] || CATEGORY_DETAILS.roads;
          const progress = bp.currentProgressPercentage || 25;

          return (
            <div
              key={item.id}
              className="bg-white rounded-2xl border border-slate-200 shadow-xs hover:shadow-md transition p-6 space-y-5"
            >
              {/* Header: Sanction Order, Scheme & Status */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
                <div>
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <span className="font-mono text-xs font-bold bg-slate-900 text-amber-400 px-2.5 py-0.5 rounded border border-slate-700">
                      Sanction No: {bp.sanctionOrderNumber || 'SAN/2026/GOV-771'}
                    </span>
                    <span className="text-xs font-bold text-slate-700 bg-slate-100 px-2.5 py-0.5 rounded">
                      {bp.schemeName}
                    </span>
                    <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                      {item.statusBadge}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mt-1">
                    {item.title}
                  </h3>
                  <div className="flex items-center gap-1.5 text-xs text-slate-500 mt-0.5">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" />
                    <span>{item.location.wardOrPanchayat}, {item.location.district} ({item.location.state})</span>
                  </div>
                </div>

                {/* Sanctioned Amount Pill */}
                <div className="sm:text-right shrink-0 bg-amber-50 sm:bg-transparent p-3 sm:p-0 rounded-xl border sm:border-none border-amber-200">
                  <span className="text-[10px] text-slate-500 font-bold uppercase block tracking-wider">
                    Total Sanctioned Fund
                  </span>
                  <span className="text-2xl font-black text-amber-700 font-mono">
                    ₹{(bp.allocatedAmountLakhs! / 100).toFixed(2)} Cr
                  </span>
                  <span className="text-[11px] text-slate-500 block">
                    (₹{bp.allocatedAmountLakhs} Lakhs)
                  </span>
                </div>
              </div>

              {/* Financial Progress & Department Card */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs bg-slate-50 p-4 rounded-xl border border-slate-200">
                <div>
                  <span className="text-slate-500 block font-medium">Nodal Department</span>
                  <span className="font-bold text-slate-900 block mt-0.5">{bp.nodalDepartment || 'Public Works Department'}</span>
                  <span className="text-[11px] text-slate-500 block mt-0.5">In-charge: <strong>{bp.nodalOfficer || 'Executive Engineer'}</strong></span>
                </div>

                <div>
                  <span className="text-slate-500 block font-medium">Assigned Contractor</span>
                  <span className="font-bold text-slate-900 block mt-0.5 flex items-center gap-1">
                    <HardHat className="w-3.5 h-3.5 text-amber-600" />
                    <span>{bp.contractorName || 'Government Engineering Cell'}</span>
                  </span>
                  <span className="text-[11px] text-slate-500 block mt-0.5">E-tender contract active</span>
                </div>

                <div>
                  <span className="text-slate-500 block font-medium">Resolution Timeline</span>
                  <span className="font-bold text-slate-900 block mt-0.5">
                    Start: {bp.startDate || '2026-08-01'} | Target: {bp.expectedCompletionDate || '2026-10-30'}
                  </span>
                  <span className="inline-block mt-1 text-[11px] font-semibold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">
                    On Schedule (Target in SLA)
                  </span>
                </div>
              </div>

              {/* Progress Bar with Completion % */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs font-semibold">
                  <span className="text-slate-700 flex items-center gap-1.5">
                    <TrendingUp className="w-4 h-4 text-emerald-600" />
                    Physical Ground Progress:
                  </span>
                  <span className="font-mono text-emerald-700 font-bold text-sm">
                    {progress}% Completed
                  </span>
                </div>
                <div className="w-full bg-slate-200 h-3 rounded-full overflow-hidden">
                  <div 
                    className="bg-linear-to-r from-amber-500 to-emerald-600 h-full rounded-full transition-all duration-500"
                    style={{ width: `${progress}%` }}
                  />
                </div>
                {bp.statusMessage && (
                  <p className="text-xs text-slate-600 italic bg-amber-50/50 p-2.5 rounded-lg border border-amber-100">
                    "{bp.statusMessage}"
                  </p>
                )}
              </div>

              {/* VISUAL MILESTONE TIMELINE */}
              {bp.milestones && bp.milestones.length > 0 && (
                <div className="space-y-3 pt-2">
                  <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                    <Calendar className="w-4 h-4 text-amber-600" />
                    Resolution Milestones & Audit Trail
                  </h4>

                  <div className="relative pl-6 space-y-4 border-l-2 border-slate-200">
                    {bp.milestones.map((m, idx) => (
                      <div key={m.id} className="relative group">
                        {/* Dot indicator */}
                        <div className={`absolute -left-[31px] top-0.5 w-4 h-4 rounded-full border-2 bg-white flex items-center justify-center ${
                          m.completed 
                            ? 'border-emerald-600 bg-emerald-600 text-white' 
                            : 'border-slate-300 text-transparent'
                        }`}>
                          {m.completed && <CheckCircle2 className="w-3 h-3 fill-white text-emerald-600" />}
                        </div>

                        <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs gap-1">
                          <span className={`font-bold ${m.completed ? 'text-slate-900' : 'text-slate-500'}`}>
                            {m.title}
                          </span>
                          <span className="font-mono text-[11px] text-slate-500">
                            Target Date: <strong>{m.date}</strong>
                          </span>
                        </div>

                        {m.notes && (
                          <p className="text-[11px] text-slate-500 mt-0.5">
                            {m.notes}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Citizen Spot Audit Action */}
              <div className="pt-2 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs">
                <span className="text-slate-600">
                  Verified Priority: <strong className="text-amber-800 font-mono">CPI {item.civicPriorityIndex || item.affectedMembersCount}/100</strong> • <strong>{item.totalCommunityEndorsements} verified citizens</strong> co-signed
                </span>

                <button
                  type="button"
                  onClick={() => {
                    setVerifiedAuditMap((prev) => ({ ...prev, [item.id]: true }));
                  }}
                  className={`px-3.5 py-1.5 rounded-lg font-bold border transition cursor-pointer ${
                    verifiedAuditMap[item.id]
                      ? 'bg-emerald-600 text-white border-emerald-500 shadow-2xs'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-800 border-slate-300'
                  }`}
                >
                  {verifiedAuditMap[item.id] ? '✓ Ground Spot Audit Logged' : 'Verify Work On Ground (Public Audit)'}
                </button>
              </div>
              {verifiedAuditMap[item.id] && (
                <div className="p-2.5 bg-emerald-50 border border-emerald-200 rounded-lg text-[11px] text-emerald-800 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Citizen Spot Verification logged for Sanction <strong>{bp.sanctionOrderNumber}</strong>. Status updated in Public Audit Registry.</span>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
