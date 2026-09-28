import React, { useState, useMemo } from 'react';
import { 
  BarChart3, 
  MapPin, 
  Filter, 
  TrendingUp, 
  Flame, 
  CheckCircle2, 
  AlertTriangle, 
  Clock, 
  Coins, 
  ThumbsUp, 
  Building2, 
  Layers, 
  ArrowUpRight, 
  ShieldCheck, 
  Calendar,
  Users,
  Search,
  ExternalLink,
  ChevronRight,
  Eye
} from 'lucide-react';
import { 
  GrievanceItem, 
  DemandTier, 
  GrievanceCategory, 
  CitizenProfile 
} from '../types';
import { INDIAN_STATES_DISTRICTS, CATEGORY_DETAILS, getLocalBodiesForDistrict } from '../data/mockData';

interface RealTimeDemandDashboardProps {
  grievances: GrievanceItem[];
  onEndorseGrievance: (id: string) => void;
  onSelectProjectForTimeline: (grievance: GrievanceItem) => void;
  userProfile: CitizenProfile | null;
  onOpenAuthModal: () => void;
  onSelectGrievanceDetail: (grievance: GrievanceItem) => void;
}

export const RealTimeDemandDashboard: React.FC<RealTimeDemandDashboardProps> = ({
  grievances,
  onEndorseGrievance,
  onSelectProjectForTimeline,
  userProfile,
  onOpenAuthModal,
  onSelectGrievanceDetail
}) => {
  // Geo Scope Filter
  const [geoScope, setGeoScope] = useState<'country' | 'state' | 'district' | 'localBody' | 'ward'>('country');
  const [selectedState, setSelectedState] = useState<string>('Maharashtra');
  const [selectedDistrict, setSelectedDistrict] = useState<string>('Pune');
  const [selectedLocalBody, setSelectedLocalBody] = useState<string>('Pune Municipal Corporation (PMC)');
  const [selectedWard, setSelectedWard] = useState<string>('All Wards');

  // Content Filters
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [demandTierFilter, setDemandTierFilter] = useState<string>('all'); // all | high | mid | low
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [typeFilter, setTypeFilter] = useState<string>('all'); // all | complaint | recommendation

  // Filter items based on geographic selection
  const filteredGrievances = useMemo(() => {
    return grievances.filter((item) => {
      // Geo filter
      if (geoScope === 'state' && item.location.state !== selectedState) return false;
      if (geoScope === 'district' && (item.location.state !== selectedState || item.location.district !== selectedDistrict)) return false;
      if (geoScope === 'localBody' && (item.location.state !== selectedState || item.location.district !== selectedDistrict || item.location.localBodyName !== selectedLocalBody)) return false;
      if (geoScope === 'ward' && selectedWard !== 'All Wards' && !item.location.wardOrPanchayat.toLowerCase().includes(selectedWard.toLowerCase())) return false;

      // Category filter
      if (categoryFilter !== 'all' && item.category !== categoryFilter) return false;

      // Demand tier filter
      if (demandTierFilter !== 'all' && item.demandTier !== demandTierFilter) return false;

      // Type filter
      if (typeFilter !== 'all' && item.type !== typeFilter) return false;

      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesTitle = item.title.toLowerCase().includes(q);
        const matchesDesc = item.description.toLowerCase().includes(q);
        const matchesLoc = item.location.wardOrPanchayat.toLowerCase().includes(q) || item.location.district.toLowerCase().includes(q);
        const matchesCat = CATEGORY_DETAILS[item.category]?.label.toLowerCase().includes(q);
        if (!matchesTitle && !matchesDesc && !matchesLoc && !matchesCat) return false;
      }

      return true;
    });
  }, [
    grievances, 
    geoScope, 
    selectedState, 
    selectedDistrict, 
    selectedLocalBody, 
    selectedWard, 
    categoryFilter, 
    demandTierFilter, 
    typeFilter, 
    searchQuery
  ]);

  // Key KPI Aggregations
  const totalCount = filteredGrievances.length;
  const highDemandCount = filteredGrievances.filter((g) => g.demandTier === 'high').length;
  const midDemandCount = filteredGrievances.filter((g) => g.demandTier === 'mid').length;
  const lowDemandCount = filteredGrievances.filter((g) => g.demandTier === 'low').length;
  
  const totalBudgetAllocated = filteredGrievances.reduce((acc, curr) => {
    return acc + (curr.budgetProject?.allocatedAmountLakhs || 0);
  }, 0);

  const resolvedCount = filteredGrievances.filter((g) => g.status === 'resolved').length;
  const inProgressCount = filteredGrievances.filter((g) => g.status === 'work_in_progress').length;

  const currentScopeTitle = useMemo(() => {
    if (geoScope === 'country') return 'All India (National Public Overview)';
    if (geoScope === 'state') return `State of ${selectedState}`;
    if (geoScope === 'district') return `${selectedDistrict} District, ${selectedState}`;
    if (geoScope === 'localBody') return `${selectedLocalBody} (${selectedDistrict})`;
    return `${selectedWard || 'Local Ward'}, ${selectedDistrict}`;
  }, [geoScope, selectedState, selectedDistrict, selectedLocalBody, selectedWard]);

  const availableDistricts = INDIAN_STATES_DISTRICTS[selectedState]?.districts || [];
  const availableLocalBodies = getLocalBodiesForDistrict(selectedState, selectedDistrict);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6">
      
      {/* Scope & Geographic Intelligence Header */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="text-xs font-bold text-amber-700 uppercase tracking-widest">
                Real-Time Citizen Demand Aggregation
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              {currentScopeTitle}
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Aggregated from citizen complaints and development proposals. Normalized per 100 members in the locality.
            </p>
          </div>

          {/* Geo Level Switcher */}
          <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl self-start lg:self-auto overflow-x-auto no-scrollbar">
            <button
              onClick={() => setGeoScope('country')}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg transition cursor-pointer ${
                geoScope === 'country' ? 'bg-amber-600 text-white shadow-2xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              National (Country)
            </button>
            <button
              onClick={() => setGeoScope('state')}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg transition cursor-pointer ${
                geoScope === 'state' ? 'bg-amber-600 text-white shadow-2xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              State
            </button>
            <button
              onClick={() => setGeoScope('district')}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg transition cursor-pointer ${
                geoScope === 'district' ? 'bg-amber-600 text-white shadow-2xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              District
            </button>
            <button
              onClick={() => setGeoScope('localBody')}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg transition cursor-pointer ${
                geoScope === 'localBody' ? 'bg-amber-600 text-white shadow-2xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Municipality / Corp
            </button>
          </div>
        </div>

        {/* Dropdowns when Drilling Down */}
        {geoScope !== 'country' && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4">
            <div>
              <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">Select State</label>
              <select
                value={selectedState}
                onChange={(e) => {
                  const st = e.target.value;
                  setSelectedState(st);
                  const dists = INDIAN_STATES_DISTRICTS[st]?.districts || [];
                  if (dists.length > 0) {
                    setSelectedDistrict(dists[0]);
                    const bodies = getLocalBodiesForDistrict(st, dists[0]);
                    if (bodies.length > 0) setSelectedLocalBody(bodies[0]);
                  }
                }}
                className="w-full text-xs px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 font-semibold text-slate-800"
              >
                {Object.keys(INDIAN_STATES_DISTRICTS).map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>

            {(geoScope === 'district' || geoScope === 'localBody' || geoScope === 'ward') && (
              <div>
                <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">Select District</label>
                <select
                  value={selectedDistrict}
                  onChange={(e) => {
                    const d = e.target.value;
                    setSelectedDistrict(d);
                    const bodies = getLocalBodiesForDistrict(selectedState, d);
                    if (bodies.length > 0) setSelectedLocalBody(bodies[0]);
                  }}
                  className="w-full text-xs px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 font-semibold text-slate-800"
                >
                  {availableDistricts.map((d) => (
                    <option key={d} value={d}>{d}</option>
                  ))}
                </select>
              </div>
            )}

            {(geoScope === 'localBody' || geoScope === 'ward') && (
              <div>
                <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">Municipal Body / Nagar Nigam</label>
                <select
                  value={selectedLocalBody}
                  onChange={(e) => setSelectedLocalBody(e.target.value)}
                  className="w-full text-xs px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 font-semibold text-slate-800"
                >
                  {availableLocalBodies.map((b) => (
                    <option key={b} value={b}>{b}</option>
                  ))}
                </select>
              </div>
            )}
          </div>
        )}
      </div>

      {/* KPI METRIC CARDS */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
        {/* High Demanded Card */}
        <div className="bg-linear-to-br from-rose-50 to-white border-2 border-rose-200/90 rounded-2xl p-4 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-rose-800 uppercase tracking-wider">
              High Demanded
            </span>
            <span className="flex h-2.5 w-2.5 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-rose-600"></span>
            </span>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-3xl font-black text-rose-700">{highDemandCount}</span>
            <span className="text-xs text-rose-600 font-semibold">Critical Issues</span>
          </div>
          <p className="text-[11px] text-rose-700/80 mt-1 font-medium">
            ≥ 35 out of 100 citizens affected
          </p>
        </div>

        {/* Mid Demanded Card */}
        <div className="bg-linear-to-br from-amber-50 to-white border border-amber-200 rounded-2xl p-4 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-amber-800 uppercase tracking-wider">
              Mid Demanded
            </span>
            <div className="w-2.5 h-2.5 rounded-full bg-amber-500"></div>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-3xl font-black text-amber-700">{midDemandCount}</span>
            <span className="text-xs text-amber-600 font-semibold">Community Demands</span>
          </div>
          <p className="text-[11px] text-amber-700/80 mt-1 font-medium">
            15 - 34 out of 100 citizens affected
          </p>
        </div>

        {/* Low Demanded Card */}
        <div className="bg-linear-to-br from-blue-50 to-white border border-blue-200 rounded-2xl p-4 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-blue-800 uppercase tracking-wider">
              Low Demanded
            </span>
            <div className="w-2.5 h-2.5 rounded-full bg-blue-500"></div>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-3xl font-black text-blue-700">{lowDemandCount}</span>
            <span className="text-xs text-blue-600 font-semibold">Localized Issues</span>
          </div>
          <p className="text-[11px] text-blue-700/80 mt-1 font-medium">
            &lt; 15 out of 100 citizens affected
          </p>
        </div>

        {/* Government Budget Allocated Card */}
        <div className="bg-linear-to-br from-emerald-50 to-white border border-emerald-200 rounded-2xl p-4 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider">
              Sanctioned Budget
            </span>
            <Coins className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="mt-2 flex items-baseline gap-1.5">
            <span className="text-3xl font-black text-emerald-700">
              ₹{(totalBudgetAllocated / 100).toFixed(2)}
            </span>
            <span className="text-xs text-emerald-700 font-bold">Crores</span>
          </div>
          <p className="text-[11px] text-emerald-700/80 mt-1 font-medium">
            {inProgressCount} projects currently in execution
          </p>
        </div>
      </div>

      {/* Real-time Sector Hotspot Matrix */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Flame className="w-4 h-4 text-rose-600" />
            <span className="text-xs font-bold text-slate-800 uppercase tracking-wider">
              Top Demand Hotspots by Civic Sector (Per 100 Citizens)
            </span>
          </div>
          <span className="text-[11px] text-slate-500 font-medium">Real-Time Area Aggregations</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
          {Object.entries(CATEGORY_DETAILS).slice(0, 6).map(([key, cat]) => {
            const catItems = filteredGrievances.filter((g) => g.category === key);
            const avgAffected = catItems.length > 0 
              ? Math.round(catItems.reduce((acc, c) => acc + c.affectedMembersCount, 0) / catItems.length)
              : 0;
            const hasHigh = catItems.some((g) => g.demandTier === 'high');

            return (
              <button
                key={key}
                onClick={() => setCategoryFilter(categoryFilter === key ? 'all' : key)}
                className={`p-2.5 rounded-xl border text-left transition cursor-pointer flex flex-col justify-between ${
                  categoryFilter === key
                    ? 'border-amber-500 bg-amber-50/80 ring-2 ring-amber-400/30'
                    : 'border-slate-200 bg-slate-50/50 hover:bg-slate-50'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-800 truncate">{cat.label.split(' ')[0]}</span>
                    {hasHigh && (
                      <span className="text-[9px] bg-rose-100 text-rose-800 font-black px-1.5 py-0.2 rounded-full border border-rose-300">
                        HOT
                      </span>
                    )}
                  </div>
                  <span className="text-[10px] text-slate-500 block truncate">{cat.hindi}</span>
                </div>
                <div className="mt-2 flex items-baseline justify-between">
                  <span className="text-[11px] text-slate-500">{catItems.length} issues</span>
                  <span className="font-mono text-xs font-black text-amber-700">
                    {avgAffected > 0 ? `${avgAffected}/100` : '—'}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* SEARCH AND FILTER BAR */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs space-y-3">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          {/* Search Box */}
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search problems, roads, hospitals, schools, or ward..."
              className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs sm:text-sm focus:bg-white focus:ring-2 focus:ring-amber-500 outline-hidden"
            />
          </div>

          {/* Type Filter */}
          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl shrink-0">
            <button
              onClick={() => setTypeFilter('all')}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg transition cursor-pointer ${
                typeFilter === 'all' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              All Types ({totalCount})
            </button>
            <button
              onClick={() => setTypeFilter('complaint')}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg transition cursor-pointer ${
                typeFilter === 'complaint' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Complaints
            </button>
            <button
              onClick={() => setTypeFilter('development_recommendation')}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg transition cursor-pointer ${
                typeFilter === 'development_recommendation' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Development Proposals
            </button>
          </div>
        </div>

        {/* Category Pills & Demand Tier Filter */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-slate-100">
          {/* Demand Tier Filter Tabs */}
          <div className="flex items-center gap-1.5 text-xs">
            <span className="font-bold text-slate-600 uppercase text-[10px]">Demand Tier:</span>
            <button
              onClick={() => setDemandTierFilter('all')}
              className={`px-2.5 py-1 rounded-md font-semibold transition ${
                demandTierFilter === 'all' ? 'bg-slate-800 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              All Tiers
            </button>
            <button
              onClick={() => setDemandTierFilter('high')}
              className={`px-2.5 py-1 rounded-md font-semibold transition ${
                demandTierFilter === 'high' ? 'bg-rose-600 text-white' : 'bg-rose-50 text-rose-700 hover:bg-rose-100'
              }`}
            >
              High Demand (≥35/100)
            </button>
            <button
              onClick={() => setDemandTierFilter('mid')}
              className={`px-2.5 py-1 rounded-md font-semibold transition ${
                demandTierFilter === 'mid' ? 'bg-amber-600 text-white' : 'bg-amber-50 text-amber-700 hover:bg-amber-100'
              }`}
            >
              Mid Demand (15-34)
            </button>
            <button
              onClick={() => setDemandTierFilter('low')}
              className={`px-2.5 py-1 rounded-md font-semibold transition ${
                demandTierFilter === 'low' ? 'bg-blue-600 text-white' : 'bg-blue-50 text-blue-700 hover:bg-blue-100'
              }`}
            >
              Low Demand (&lt;15)
            </button>
          </div>

          {/* Category Dropdown Filter */}
          <div className="flex items-center gap-2 text-xs">
            <span className="font-bold text-slate-600 uppercase text-[10px]">Sector:</span>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="px-2.5 py-1 bg-slate-50 border border-slate-300 rounded-md font-medium text-slate-800 outline-hidden"
            >
              <option value="all">All Sectors</option>
              {Object.entries(CATEGORY_DETAILS).map(([key, item]) => (
                <option key={key} value={key}>{item.label}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* GRIEVANCES & RECOMMENDATIONS CARDS LIST */}
      <div className="space-y-4">
        <div className="flex items-center justify-between text-xs text-slate-500 font-semibold px-1">
          <span>Showing {filteredGrievances.length} public records in {currentScopeTitle}</span>
          <span>Click any issue to inspect official government remarks & timeline</span>
        </div>

        {filteredGrievances.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center mx-auto text-slate-400">
              <Layers className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-800">No Complaints Match Current Filters</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              Try adjusting your geographic scope, sector category, or clearing the search query to see other district demands.
            </p>
          </div>
        ) : (
          filteredGrievances.map((item) => {
            const cat = CATEGORY_DETAILS[item.category] || CATEGORY_DETAILS.roads;
            const hasBudget = item.budgetProject && item.budgetProject.isBudgetAllocated;

            return (
              <div
                key={item.id}
                className={`bg-white rounded-2xl border transition-all duration-200 hover:shadow-md p-5 sm:p-6 space-y-4 ${
                  item.demandTier === 'high' 
                    ? 'border-rose-200/80 ring-1 ring-rose-500/10' 
                    : item.demandTier === 'mid' 
                    ? 'border-amber-200/80' 
                    : 'border-slate-200'
                }`}
              >
                {/* Top Row: Category, Demand Tier Badge, Token ID */}
                <div className="flex flex-wrap items-center justify-between gap-2.5">
                  <div className="flex items-center gap-2">
                    <span className={`px-2.5 py-1 rounded-lg text-xs font-bold border flex items-center gap-1.5 ${cat.bg} ${cat.color} ${cat.border}`}>
                      <Layers className="w-3.5 h-3.5" />
                      <span>{cat.label}</span>
                    </span>

                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-extrabold uppercase tracking-wide border flex items-center gap-1.5 ${
                      item.demandTier === 'high'
                        ? 'bg-rose-100 text-rose-800 border-rose-300'
                        : item.demandTier === 'mid'
                        ? 'bg-amber-100 text-amber-800 border-amber-300'
                        : 'bg-blue-100 text-blue-800 border-blue-300'
                    }`}>
                      {item.demandTier === 'high' && <Flame className="w-3.5 h-3.5 text-rose-600 animate-bounce" />}
                      <span>{item.demandTier} Demanded</span>
                    </span>

                    {item.type === 'development_recommendation' && (
                      <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
                        Citizen Proposal
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-2 text-xs font-mono">
                    <span className="text-slate-400">Token:</span>
                    <span className="bg-slate-100 text-slate-800 px-2 py-0.5 rounded border border-slate-300 font-bold">
                      {item.id}
                    </span>
                  </div>
                </div>

                {/* Main Headline & Description */}
                <div>
                  <h3 
                    onClick={() => onSelectGrievanceDetail(item)}
                    className="text-base sm:text-lg font-bold text-slate-900 hover:text-amber-700 cursor-pointer transition leading-snug"
                  >
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 mt-1 line-clamp-2 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                {/* THE CORE USER REQUIREMENT: GOVERNMENT DATA DEMAND METRIC (e.g. 30 out of 100 members) */}
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-2.5">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-amber-600" />
                      <span className="text-xs font-bold text-slate-800 uppercase tracking-wide">
                        Government Demand Ratio in {item.location.wardOrPanchayat || item.location.district}:
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-xs text-slate-500">Density Metric:</span>
                      <span className="text-sm font-black text-slate-900 bg-white px-2.5 py-0.5 rounded-md border border-slate-300 shadow-2xs font-mono">
                        <strong className="text-amber-700">{item.affectedMembersCount}</strong> out of 100 members
                      </span>
                    </div>
                  </div>

                  {/* Visual Proportion Bar with 100 member representation */}
                  <div>
                    <div className="w-full bg-slate-200 h-2.5 rounded-full overflow-hidden flex">
                      <div 
                        className={`h-full transition-all duration-500 ${
                          item.demandTier === 'high' ? 'bg-rose-600' : item.demandTier === 'mid' ? 'bg-amber-500' : 'bg-blue-500'
                        }`}
                        style={{ width: `${item.affectedMembersCount}%` }}
                      />
                    </div>
                    <div className="flex justify-between items-center text-[10px] text-slate-400 mt-1 font-mono">
                      <span>0 members</span>
                      <span>15 (Mid Threshold)</span>
                      <span>35 (High Demand Threshold)</span>
                      <span>100 surveyed citizens</span>
                    </div>
                  </div>

                  {/* Citizen Endorsement / +1 Button */}
                  <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
                    <span className="text-[11px] text-slate-500">
                      Total Verified Endorsements: <strong>{item.totalCommunityEndorsements} citizens</strong>
                    </span>

                    <button
                      type="button"
                      onClick={() => onEndorseGrievance(item.id)}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition shadow-2xs cursor-pointer ${
                        item.userHasEndorsed
                          ? 'bg-emerald-600 text-white'
                          : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-300'
                      }`}
                    >
                      <ThumbsUp className={`w-3.5 h-3.5 ${item.userHasEndorsed ? 'fill-current' : ''}`} />
                      <span>{item.userHasEndorsed ? 'Endorsed (+1)' : 'I Am Also Affected (+1 Me Too)'}</span>
                    </button>
                  </div>
                </div>

                {/* THE CORE USER REQUIREMENT: GOVERNMENT BUDGET & RESOLUTION TIMELINE INFO */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-2 border-t border-slate-100">
                  <div className="flex flex-wrap items-center gap-2">
                    {hasBudget ? (
                      <div className="flex items-center gap-1.5 bg-emerald-50 text-emerald-800 border border-emerald-300 px-3 py-1 rounded-lg text-xs font-semibold">
                        <Coins className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Sanctioned Budget: <strong>₹{(item.budgetProject!.allocatedAmountLakhs! / 100).toFixed(2)} Cr</strong></span>
                        <span className="text-[10px] bg-emerald-200/70 text-emerald-900 px-1.5 py-0.2 rounded font-mono">
                          {item.budgetProject?.currentProgressPercentage || 25}% Done
                        </span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-1.5 bg-slate-100 text-slate-600 px-2.5 py-1 rounded-lg text-xs font-medium border border-slate-200">
                        <Clock className="w-3.5 h-3.5 text-slate-400" />
                        <span>Budget Status: Under Review for Financial Year 2026-27</span>
                      </div>
                    )}

                    <span className="text-xs text-slate-500 font-medium">
                      Status: <strong className="text-slate-800">{item.statusBadge}</strong>
                    </span>
                  </div>

                  {/* Actions: View Timeline & Inspect */}
                  <div className="flex items-center gap-2 self-end sm:self-auto">
                    {hasBudget && (
                      <button
                        onClick={() => onSelectProjectForTimeline(item)}
                        className="flex items-center gap-1 px-3 py-1.5 bg-amber-600 hover:bg-amber-700 text-white rounded-lg text-xs font-bold shadow-2xs transition cursor-pointer"
                      >
                        <Calendar className="w-3.5 h-3.5" />
                        <span>Project Timeline</span>
                      </button>
                    )}

                    <button
                      onClick={() => onSelectGrievanceDetail(item)}
                      className="flex items-center gap-1 px-3 py-1.5 bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 rounded-lg text-xs font-semibold shadow-2xs transition cursor-pointer"
                    >
                      <Eye className="w-3.5 h-3.5 text-slate-500" />
                      <span>Full Audit Details</span>
                    </button>
                  </div>
                </div>

                {/* Location Footer Badge */}
                <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-slate-400" />
                    <span>{item.location.wardOrPanchayat}, {item.location.district} ({item.location.state})</span>
                  </span>
                  <span>Submitted by {item.citizenName} ({item.maskedPan})</span>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
