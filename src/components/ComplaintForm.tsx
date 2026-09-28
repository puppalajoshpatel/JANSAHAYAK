import React, { useState, useEffect } from 'react';
import { 
  FileText, 
  Mic, 
  Type, 
  Sparkles, 
  Send, 
  Upload, 
  MapPin, 
  ShieldCheck, 
  AlertCircle, 
  CheckCircle2, 
  Building2, 
  HelpCircle,
  Lightbulb,
  ExternalLink,
  Coins,
  Clock,
  Layers,
  Image as ImageIcon,
  Check
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { 
  GrievanceCategory, 
  SubmissionType, 
  CitizenProfile, 
  GrievanceItem,
  LocationHierarchy 
} from '../types';
import { INDIAN_STATES_DISTRICTS, CATEGORY_DETAILS } from '../data/mockData';
import { CivicVoiceRecorder } from './CivicVoiceRecorder';
import { analyzeCitizenGrievance, AIAnalysisResult } from '../services/aiService';

interface ComplaintFormProps {
  userProfile: CitizenProfile | null;
  onOpenAuthModal: () => void;
  onSubmitGrievance: (newGrievance: GrievanceItem) => void;
  selectedLanguage: string;
  initialSubmissionType?: SubmissionType;
}

const SAMPLE_EVIDENCE_PHOTOS = [
  {
    label: "Road Pothole & Craters",
    url: "https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?w=800&auto=format&fit=crop&q=60"
  },
  {
    label: "Overflowing Drain & Sewage",
    url: "https://images.unsplash.com/photo-1527525443983-6e60c75fff46?w=800&auto=format&fit=crop&q=60"
  },
  {
    label: "Dilapidated Classroom Wall",
    url: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=800&auto=format&fit=crop&q=60"
  },
  {
    label: "Hospital Medicine Counter Queue",
    url: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800&auto=format&fit=crop&q=60"
  }
];

export const ComplaintForm: React.FC<ComplaintFormProps> = ({
  userProfile,
  onOpenAuthModal,
  onSubmitGrievance,
  selectedLanguage,
  initialSubmissionType = 'complaint'
}) => {
  const [submissionType, setSubmissionType] = useState<SubmissionType>(initialSubmissionType);
  const [inputMode, setInputMode] = useState<'text' | 'voice'>('text');
  
  // Update submission type if prop changes
  useEffect(() => {
    if (initialSubmissionType) {
      setSubmissionType(initialSubmissionType);
    }
  }, [initialSubmissionType]);

  // Location form state (pre-filled from user profile or defaults)
  const [state, setState] = useState(userProfile?.state || 'Maharashtra');
  const [district, setDistrict] = useState(userProfile?.district || 'Pune');
  const [localBody, setLocalBody] = useState(userProfile?.localBody || 'Pune Municipal Corporation (PMC)');
  const [ward, setWard] = useState(userProfile?.ward || 'Ward 14 - Kothrud South');
  const [pincode, setPincode] = useState(userProfile?.pincode || '411038');
  const [landmark, setLandmark] = useState('');

  // Complaint content
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<GrievanceCategory>('roads');
  const [subCategory, setSubCategory] = useState('Potholes & Road Resurfacing');
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);

  // AI Analysis state
  const [isAnalyzingAI, setIsAnalyzingAI] = useState(false);
  const [aiResult, setAiResult] = useState<AIAnalysisResult | null>(null);
  const [submittedToken, setSubmittedToken] = useState<string | null>(null);
  const [copiedToken, setCopiedToken] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);

  // Keep location updated if user logs in
  useEffect(() => {
    if (userProfile) {
      setState(userProfile.state);
      setDistrict(userProfile.district);
      setLocalBody(userProfile.localBody);
      setWard(userProfile.ward);
      setPincode(userProfile.pincode);
    }
  }, [userProfile]);

  const handleVoiceTranscript = (transcript: string, detectedLang?: string) => {
    setDescription(transcript);
    // Automatically trigger AI classification for the voiced transcript
    triggerAiAnalysis(transcript);
  };

  const triggerAiAnalysis = async (textToAnalyze?: string) => {
    const content = textToAnalyze || description;
    if (!content || content.trim().length < 10) {
      setValidationError('Please enter at least 10 characters describing the problem before analyzing with AI.');
      return;
    }

    setValidationError(null);
    setIsAnalyzingAI(true);

    try {
      const result = await analyzeCitizenGrievance(
        content,
        selectedLanguage,
        submissionType,
        { state, district, localBodyName: localBody, wardOrPanchayat: ward }
      );

      setAiResult(result);
      if (result.category) {
        setCategory(result.category);
      }
      if (result.subCategory) {
        setSubCategory(result.subCategory);
      }
      if (result.title && !title) {
        setTitle(result.title);
      }
    } catch (e) {
      console.error('AI analysis error:', e);
    } finally {
      setIsAnalyzingAI(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!userProfile) {
      setValidationError('Please login with your PAN Card & Mobile OTP before applying.');
      onOpenAuthModal();
      return;
    }

    if (!description.trim() || description.length < 15) {
      setValidationError('Please describe your grievance or development proposal in detail (at least 15 characters).');
      return;
    }

    setValidationError(null);
    setIsSubmitting(true);

    setTimeout(() => {
      const stateCode = state.substring(0, 2).toUpperCase() || 'IN';
      const randomNum = Math.floor(1000 + Math.random() * 9000);
      const prefix = submissionType === 'complaint' ? 'CPG-2026' : 'REC-2026';
      const tokenId = `${prefix}-${stateCode}-${randomNum}`;

      // Calculate demand metric based on AI result or category base
      const affectedPer100 = aiResult?.estimatedAffectedPer100 || 
        (category === 'water_drainage' ? 52 : category === 'hospitals' ? 44 : category === 'roads' ? 38 : 28);
      
      const demandTier = affectedPer100 >= 35 ? 'high' : affectedPer100 >= 15 ? 'mid' : 'low';

      const newGrievance: GrievanceItem = {
        id: tokenId,
        type: submissionType,
        title: title || (aiResult?.title) || `${CATEGORY_DETAILS[category]?.label} issue in ${ward}`,
        description,
        category,
        subCategory: subCategory || (aiResult?.subCategory) || 'General Redressal',
        location: {
          country: 'India',
          state,
          district,
          localBodyType: 'Municipal Corporation',
          localBodyName: localBody,
          wardOrPanchayat: ward,
          pincode,
          landmark: landmark || undefined
        },
        submittedAt: new Date().toISOString(),
        citizenName: userProfile.name,
        maskedPan: `${userProfile.panNumber.substring(0, 5)}****${userProfile.panNumber.slice(-1)}`,
        samplePopulationBase: 100,
        affectedMembersCount: affectedPer100,
        totalCommunityEndorsements: Math.round(affectedPer100 * 9.5),
        demandTier,
        urgencyScore: aiResult?.urgencyScore || 75,
        status: 'submitted',
        statusBadge: 'Submitted - Under AI Triage & Verification',
        resolutionSlaDays: aiResult?.slaDaysRecommended || 14,
        evidenceImages: selectedPhoto ? [selectedPhoto] : undefined,
        budgetProject: submissionType === 'development_recommendation' ? {
          isBudgetAllocated: false,
          schemeName: aiResult?.applicableGovScheme || 'Municipal Civic Grant',
          statusMessage: 'Citizen proposal submitted for Area Development Committee budget appraisal.'
        } : undefined,
        officialRemarks: [
          {
            date: new Date().toISOString().split('T')[0],
            officer: 'JanVichar Gateway',
            department: aiResult?.recommendedDepartment || 'Central Administrative Triage',
            comment: `Grievance registered under PAN token. Auto-routed to ${aiResult?.recommendedDepartment || 'Zonal Municipal Office'}. Demand projection: ${affectedPer100} out of 100 citizens.`
          }
        ]
      };

      onSubmitGrievance(newGrievance);
      setSubmittedToken(tokenId);
      setIsSubmitting(false);

      // Trigger celebratory confetti
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    }, 800);
  };

  const handleResetForm = () => {
    setTitle('');
    setDescription('');
    setAiResult(null);
    setSelectedPhoto(null);
    setSubmittedToken(null);
    setValidationError(null);
  };

  const availableDistricts = INDIAN_STATES_DISTRICTS[state]?.districts || [];
  const availableLocalBodies = INDIAN_STATES_DISTRICTS[state]?.localBodies[district] || ['Municipal Corporation'];

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
      {/* Top Banner Notice */}
      <div className="bg-linear-to-r from-amber-600 via-amber-700 to-amber-800 text-white rounded-2xl p-6 shadow-md relative overflow-hidden">
        <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-500/30 border border-amber-300/40 text-amber-100 uppercase tracking-wide">
                Form Application
              </span>
              <span className="text-xs text-amber-200">
                Rule 4A, Citizen Charter of India
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black tracking-tight">
              Apply for Civic Grievance or Development Recommendation
            </h2>
            <p className="text-xs sm:text-sm text-amber-100 max-w-2xl mt-1">
              File complaints about roads, hospitals, schools, water, and power, or suggest development projects for your locality. Voice dictation in Indian languages supported.
            </p>
          </div>

          {!userProfile ? (
            <button
              onClick={onOpenAuthModal}
              className="px-4 py-2.5 bg-white text-slate-900 hover:bg-amber-50 rounded-xl font-bold text-xs shadow-md shrink-0 flex items-center gap-2 cursor-pointer transition"
            >
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Login with PAN Card</span>
            </button>
          ) : (
            <div className="bg-amber-900/50 border border-amber-400/30 px-3.5 py-2 rounded-xl text-xs text-left shrink-0">
              <span className="text-amber-200 block text-[10px] uppercase font-bold">Authenticated Citizen</span>
              <span className="font-bold text-white">{userProfile.name}</span>
              <span className="font-mono text-amber-300 block text-[11px]">
                PAN: {userProfile.panNumber.substring(0, 5)}****{userProfile.panNumber.slice(-1)}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* SUCCESS SCREEN WHEN TOKEN GENERATED */}
      {submittedToken ? (
        <div className="bg-white rounded-2xl border-2 border-emerald-500/40 p-6 sm:p-8 shadow-xl text-center space-y-5 animate-in fade-in zoom-in-95 duration-200">
          <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto text-emerald-600 shadow-md">
            <CheckCircle2 className="w-9 h-9" />
          </div>

          <div>
            <span className="text-xs font-bold text-emerald-700 uppercase tracking-widest bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
              Grievance Registered Successfully
            </span>
            <h3 className="text-2xl font-extrabold text-slate-900 mt-2">
              Official Grievance Token Generated
            </h3>
            <p className="text-xs text-slate-500 mt-1 max-w-md mx-auto">
              Your grievance has been auto-categorized, aggregated into the public demand statistics, and routed to the competent executive authority.
            </p>
          </div>

          <div className="p-4 bg-slate-900 text-white rounded-xl max-w-md mx-auto flex items-center justify-between border border-slate-700 shadow-inner">
            <div className="text-left">
              <span className="text-[10px] uppercase tracking-wider text-slate-400 block font-semibold">
                Permanent Tracking Token ID
              </span>
              <span className="font-mono text-lg font-black text-amber-400 tracking-wider">
                {submittedToken}
              </span>
            </div>
            <button
              onClick={() => {
                navigator.clipboard.writeText(submittedToken);
                setCopiedToken(true);
                setTimeout(() => setCopiedToken(false), 2500);
              }}
              className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-xs font-bold rounded-lg border border-slate-600 text-slate-200 transition cursor-pointer"
            >
              {copiedToken ? '✓ Copied!' : 'Copy Token'}
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-lg mx-auto text-left text-xs">
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
              <span className="text-slate-500 block text-[11px]">Category</span>
              <span className="font-bold text-slate-800">{CATEGORY_DETAILS[category]?.label}</span>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
              <span className="text-slate-500 block text-[11px]">Area Density Impact</span>
              <span className="font-bold text-amber-800">
                {aiResult?.estimatedAffectedPer100 || 38} out of 100 Citizens
              </span>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
              <span className="text-slate-500 block text-[11px]">Resolution SLA</span>
              <span className="font-bold text-slate-800">
                {aiResult?.slaDaysRecommended || 14} Working Days
              </span>
            </div>
          </div>

          <div className="pt-4 flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={handleResetForm}
              className="px-5 py-2.5 bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs rounded-xl shadow-md transition cursor-pointer"
            >
              File Another Grievance / Recommendation
            </button>
          </div>
        </div>
      ) : (
        /* MAIN FORM CARD */
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-6">
          
          {/* 1. Submission Type Switcher */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              Step 1: Select Application Type
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setSubmissionType('complaint')}
                className={`p-4 rounded-xl border text-left flex items-start gap-3 transition cursor-pointer ${
                  submissionType === 'complaint'
                    ? 'border-rose-500 bg-rose-50/60 ring-2 ring-rose-500/20 shadow-xs'
                    : 'border-slate-200 bg-slate-50/50 hover:bg-slate-50'
                }`}
              >
                <div className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${
                  submissionType === 'complaint' ? 'bg-rose-600 text-white' : 'bg-slate-200 text-slate-600'
                }`}>
                  <AlertCircle className="w-5 h-5" />
                </div>
                <div>
                  <span className="font-bold text-sm text-slate-900 block">
                    Civic Problem / Grievance (शिकायत)
                  </span>
                  <span className="text-xs text-slate-500 leading-normal">
                    Report urgent issues: broken roads, hospital medicine shortage, school repair, water leaks, power outages.
                  </span>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setSubmissionType('development_recommendation')}
                className={`p-4 rounded-xl border text-left flex items-start gap-3 transition cursor-pointer ${
                  submissionType === 'development_recommendation'
                    ? 'border-emerald-500 bg-emerald-50/60 ring-2 ring-emerald-500/20 shadow-xs'
                    : 'border-slate-200 bg-slate-50/50 hover:bg-slate-50'
                }`}
              >
                <div className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${
                  submissionType === 'development_recommendation' ? 'bg-emerald-600 text-white' : 'bg-slate-200 text-slate-600'
                }`}>
                  <Lightbulb className="w-5 h-5" />
                </div>
                <div>
                  <span className="font-bold text-sm text-slate-900 block">
                    Citizen Development Proposal (विकास अनुशंसा)
                  </span>
                  <span className="text-xs text-slate-500 leading-normal">
                    Recommend community improvements: new health clinic, smart streetlights, public reading room, sports park.
                  </span>
                </div>
              </button>
            </div>
          </div>

          {/* 2. Geographic Location Details */}
          <div className="bg-slate-50 p-4 sm:p-5 rounded-xl border border-slate-200 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-amber-600" />
                Step 2: Grievance Location & Jurisdiction
              </span>
              {userProfile && (
                <span className="text-[11px] text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  Auto-populated from PAN Profile
                </span>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-[11px] font-semibold text-slate-600 mb-1">State</label>
                <select
                  value={state}
                  onChange={(e) => {
                    const st = e.target.value;
                    setState(st);
                    const dists = INDIAN_STATES_DISTRICTS[st]?.districts || [];
                    if (dists.length > 0) {
                      setDistrict(dists[0]);
                      const bodies = INDIAN_STATES_DISTRICTS[st]?.localBodies[dists[0]] || [];
                      if (bodies.length > 0) setLocalBody(bodies[0]);
                    }
                  }}
                  className="w-full text-xs px-2.5 py-2 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 outline-hidden font-medium"
                >
                  {Object.keys(INDIAN_STATES_DISTRICTS).map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-600 mb-1">District</label>
                <select
                  value={district}
                  onChange={(e) => {
                    const d = e.target.value;
                    setDistrict(d);
                    const bodies = INDIAN_STATES_DISTRICTS[state]?.localBodies[d] || [];
                    if (bodies.length > 0) setLocalBody(bodies[0]);
                  }}
                  className="w-full text-xs px-2.5 py-2 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 outline-hidden font-medium"
                >
                  {availableDistricts.map((d) => (
                    <option key={d} value={d}>{d}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-600 mb-1">Local Body (Corporation/Panchayat)</label>
                <select
                  value={localBody}
                  onChange={(e) => setLocalBody(e.target.value)}
                  className="w-full text-xs px-2.5 py-2 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 outline-hidden font-medium"
                >
                  {availableLocalBodies.map((b) => (
                    <option key={b} value={b}>{b}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              <div>
                <label className="block text-[11px] font-semibold text-slate-600 mb-1">Ward / Area / Village</label>
                <input
                  type="text"
                  value={ward}
                  onChange={(e) => setWard(e.target.value)}
                  placeholder="e.g. Ward 14 - Kothrud South"
                  className="w-full text-xs px-3 py-2 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 outline-hidden font-medium"
                  required
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-600 mb-1">PIN Code & Specific Landmark</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={pincode}
                    onChange={(e) => setPincode(e.target.value.slice(0, 6))}
                    placeholder="Pincode (411038)"
                    maxLength={6}
                    className="w-28 text-xs font-mono px-2.5 py-2 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 outline-hidden"
                  />
                  <input
                    type="text"
                    value={landmark}
                    onChange={(e) => setLandmark(e.target.value)}
                    placeholder="Landmark (e.g. Near Vanaz Metro Station)"
                    className="flex-1 text-xs px-3 py-2 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 outline-hidden font-medium"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* 3. Input Mode: Voice or Typed Text */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                Step 3: Submit via Voice or Typed Text
              </label>

              <div className="flex items-center gap-1 bg-slate-100 p-0.5 rounded-lg border border-slate-200">
                <button
                  type="button"
                  onClick={() => setInputMode('text')}
                  className={`flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-bold transition cursor-pointer ${
                    inputMode === 'text' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <Type className="w-3.5 h-3.5" />
                  <span>Typed Text (Mobile/Laptop)</span>
                </button>
                <button
                  type="button"
                  onClick={() => setInputMode('voice')}
                  className={`flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-bold transition cursor-pointer ${
                    inputMode === 'voice' ? 'bg-amber-600 text-white shadow-2xs' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <Mic className="w-3.5 h-3.5" />
                  <span>Local Voice Complaint</span>
                </button>
              </div>
            </div>

            {/* Voice Input Section */}
            {inputMode === 'voice' && (
              <div className="mb-4">
                <CivicVoiceRecorder
                  onTranscriptReady={handleVoiceTranscript}
                  selectedLanguage={selectedLanguage}
                />
              </div>
            )}

            {/* Subject / Headline */}
            <div className="mb-3">
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Grievance Title / Headline (Optional - AI can generate)
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Severe potholes on Paud Road causing road accidents"
                className="w-full text-xs sm:text-sm px-3.5 py-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-amber-500 outline-hidden font-medium"
              />
            </div>

            {/* Description Textarea */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-xs font-semibold text-slate-700">
                  Detailed Grievance Description (in English, Hindi, or any regional language)
                </label>
                <span className="text-[11px] text-slate-400">
                  {description.length} characters
                </span>
              </div>
              <textarea
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe what happened, exact location, for how many days the issue has persisted, and how many citizens are impacted (e.g., 'हमारे वार्ड में पिछले 2 सप्ताह से पानी की मुख्य लाइन टूटी हुई है...')"
                className="w-full text-xs sm:text-sm p-3.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-amber-500 outline-hidden font-normal leading-relaxed"
                required
              />
            </div>

            {/* AI AUTO-CLASSIFICATION TRIGGER BUTTON */}
            <div className="mt-3 flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={() => triggerAiAnalysis()}
                disabled={isAnalyzingAI || description.length < 10}
                className="flex items-center gap-2 px-4 py-2 bg-linear-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 disabled:from-slate-200 disabled:to-slate-300 text-white disabled:text-slate-500 text-xs font-bold rounded-xl shadow-xs transition cursor-pointer disabled:cursor-not-allowed"
              >
                <Sparkles className="w-4 h-4 text-amber-300" />
                <span>{isAnalyzingAI ? 'JanVichar Analyzing...' : 'Analyze & Auto-Classify with AI'}</span>
              </button>

              <span className="text-[11px] text-slate-500 hidden sm:inline">
                Auto-extracts Category, Demand Tier, Urgency & Department Routing
              </span>
            </div>
          </div>

          {/* AI ANALYSIS CARD (PREVIEW) */}
          {aiResult && (
            <div className="bg-amber-50/70 border border-amber-300/80 rounded-2xl p-4 sm:p-5 space-y-3.5 animate-in fade-in duration-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-amber-600 text-white flex items-center justify-center">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-amber-950 uppercase tracking-wider">
                      JanVichar Intelligence Assessment
                    </h4>
                    <p className="text-[11px] text-amber-800">
                      Standardized classification conforming to Government Grievance Rules
                    </p>
                  </div>
                </div>

                <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold border ${
                  aiResult.demandTier === 'high'
                    ? 'bg-rose-100 text-rose-800 border-rose-300'
                    : aiResult.demandTier === 'mid'
                    ? 'bg-amber-100 text-amber-800 border-amber-300'
                    : 'bg-blue-100 text-blue-800 border-blue-300'
                }`}>
                  {aiResult.demandTier.toUpperCase()} DEMAND TIER
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-xs">
                <div className="p-2.5 bg-white rounded-xl border border-amber-200">
                  <span className="text-[10px] text-slate-500 font-semibold block uppercase">Category</span>
                  <span className="font-bold text-slate-900">{CATEGORY_DETAILS[aiResult.category]?.label || aiResult.category}</span>
                </div>

                <div className="p-2.5 bg-white rounded-xl border border-amber-200">
                  <span className="text-[10px] text-slate-500 font-semibold block uppercase">Projected Impact</span>
                  <span className="font-bold text-amber-800">{aiResult.estimatedAffectedPer100} / 100 Members</span>
                </div>

                <div className="p-2.5 bg-white rounded-xl border border-amber-200">
                  <span className="text-[10px] text-slate-500 font-semibold block uppercase">Urgency Score</span>
                  <span className="font-bold text-rose-700">{aiResult.urgencyScore} / 100</span>
                </div>

                <div className="p-2.5 bg-white rounded-xl border border-amber-200">
                  <span className="text-[10px] text-slate-500 font-semibold block uppercase">Estimated Budget</span>
                  <span className="font-bold text-emerald-800">{aiResult.estimatedBudgetRange}</span>
                </div>
              </div>

              <div className="p-3 bg-white rounded-xl border border-amber-200 text-xs space-y-1.5">
                <div className="flex items-center justify-between text-slate-700">
                  <span><strong>Recommended Department:</strong> {aiResult.recommendedDepartment}</span>
                  <span className="text-[11px] text-slate-500">SLA: {aiResult.slaDaysRecommended} Days</span>
                </div>
                <div className="text-slate-600 text-[11px]">
                  <strong>Applicable Scheme:</strong> {aiResult.applicableGovScheme}
                </div>
              </div>
            </div>
          )}

          {/* 4. Manual Category Selection */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              Step 4: Select Primary Sector / Category
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              {Object.entries(CATEGORY_DETAILS).map(([key, cat]) => {
                const isSelected = category === key;
                return (
                  <button
                    key={key}
                    type="button"
                    onClick={() => {
                      setCategory(key as GrievanceCategory);
                      setSubCategory(cat.label);
                    }}
                    className={`p-3 rounded-xl border text-left flex items-center gap-2.5 transition cursor-pointer ${
                      isSelected
                        ? `${cat.bg} border-amber-600 ring-2 ring-amber-500/20 shadow-2xs`
                        : 'border-slate-200 bg-white hover:bg-slate-50'
                    }`}
                  >
                    <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${
                      isSelected ? 'bg-amber-600 text-white' : 'bg-slate-100 text-slate-600'
                    }`}>
                      <Layers className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <span className="font-bold text-xs text-slate-900 block leading-tight">
                        {cat.label}
                      </span>
                      <span className="text-[10px] text-slate-500 block">
                        {cat.hindi}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 5. Photo / Proof Attachments */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              Step 5: Attach Evidence Photos / Spot Verification
            </label>
            <div className="space-y-3">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {SAMPLE_EVIDENCE_PHOTOS.map((photo, i) => {
                  const isPicked = selectedPhoto === photo.url;
                  return (
                    <div
                      key={i}
                      onClick={() => setSelectedPhoto(isPicked ? null : photo.url)}
                      className={`relative rounded-xl border overflow-hidden cursor-pointer group transition ${
                        isPicked ? 'ring-3 ring-amber-500 border-amber-500' : 'border-slate-200 opacity-80 hover:opacity-100'
                      }`}
                    >
                      <img src={photo.url} alt={photo.label} className="w-full h-20 object-cover" />
                      <div className="p-1.5 bg-white text-[11px] font-semibold text-slate-800 truncate">
                        {photo.label}
                      </div>
                      {isPicked && (
                        <div className="absolute top-1.5 right-1.5 bg-amber-600 text-white rounded-full p-0.5">
                          <Check className="w-3.5 h-3.5" />
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              <div className="flex items-center gap-2">
                <label className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-semibold cursor-pointer border border-slate-300">
                  <Upload className="w-3.5 h-3.5" />
                  <span>Upload Local File</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        const file = e.target.files[0];
                        const reader = new FileReader();
                        reader.onloadend = () => {
                          setSelectedPhoto(reader.result as string);
                        };
                        reader.readAsDataURL(file);
                      }
                    }}
                    className="hidden"
                  />
                </label>
                {selectedPhoto && (
                  <button
                    type="button"
                    onClick={() => setSelectedPhoto(null)}
                    className="text-xs text-rose-600 hover:underline"
                  >
                    Remove Photo
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Validation Error banner */}
          {validationError && (
            <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-800 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
              <span>{validationError}</span>
            </div>
          )}

          {/* Submit Action CTA */}
          <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-xs text-slate-500">
              <span className="block font-semibold text-slate-700">Public Audit Guarantee:</span>
              <span>All complaints are tracked openly with demand analytics on the public dashboard.</span>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full sm:w-auto px-7 py-3 bg-linear-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white font-bold text-sm rounded-xl shadow-md transition flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              <Send className="w-4 h-4" />
              <span>{isSubmitting ? 'Registering Grievance...' : 'Submit Grievance to Government'}</span>
            </button>
          </div>
        </form>
      )}
    </div>
  );
};
