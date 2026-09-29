export type GrievanceCategory = 
  | 'roads' 
  | 'hospitals' 
  | 'schools' 
  | 'water_drainage' 
  | 'electricity' 
  | 'sanitation' 
  | 'transport' 
  | 'public_safety' 
  | 'environment';

export type DemandTier = 'high' | 'mid' | 'low';

export type GrievanceStatus = 
  | 'submitted' 
  | 'verified' 
  | 'budget_sanctioned' 
  | 'tender_awarded' 
  | 'work_in_progress' 
  | 'resolved';

export type SubmissionType = 'complaint' | 'development_recommendation';

export interface Milestone {
  id: string;
  title: string;
  date: string;
  completed: boolean;
  notes?: string;
}

export interface BudgetProjectInfo {
  isBudgetAllocated: boolean;
  sanctionOrderNumber?: string;
  schemeName?: string; // e.g. "Smart Cities Mission", "PMGSY", "AMRUT 2.0", "Samagra Shiksha", "NHM"
  allocatedAmountLakhs?: number; // in INR Lakhs (e.g. 150 = 1.5 Cr)
  releasedAmountLakhs?: number;
  utilizedAmountLakhs?: number;
  contractorName?: string;
  nodalDepartment?: string;
  nodalOfficer?: string;
  startDate?: string;
  expectedCompletionDate?: string;
  currentProgressPercentage?: number; // 0-100
  milestones?: Milestone[];
  statusMessage?: string;
}

export interface LocationHierarchy {
  country: string; // India
  state: string; // e.g. Maharashtra, Uttar Pradesh, Karnataka, Tamil Nadu, Delhi
  district: string; // e.g. Pune, Bengaluru Urban, Varanasi
  localBodyType: 'Municipal Corporation' | 'Municipality' | 'Gram Panchayat' | 'Cantonment';
  localBodyName: string; // e.g. Pune Municipal Corporation (PMC)
  wardOrPanchayat: string; // e.g. Ward 14 - Kothrud
  pincode: string;
  landmark?: string;
}

export interface GrievanceItem {
  id: string; // e.g. "CPG-2026-MH-4821"
  type: SubmissionType;
  title: string;
  description: string;
  originalLanguage?: string;
  category: GrievanceCategory;
  subCategory: string;
  location: LocationHierarchy;
  submittedAt: string;
  citizenName: string;
  maskedPan: string; // e.g. "ABCDE****F"
  
  // Government Demand Aggregation & Scientific Gravity Index
  samplePopulationBase?: number; // legacy backward compatibility
  affectedMembersCount: number; // mapped to Civic Priority Score (0-100)
  civicPriorityIndex?: number; // Civic Priority Gravity Index (CPI: 1-100)
  totalCommunityEndorsements: number; // e.g. 524 verified citizens
  demandVelocity?: 'Rapid Spike' | 'Steady' | 'Normal';
  demandTier: DemandTier; // high, mid, low
  urgencyScore: number; // 1-100
  
  status: GrievanceStatus;
  statusBadge: string;
  resolutionSlaDays: number;
  budgetProject?: BudgetProjectInfo;
  
  evidenceImages?: string[];
  audioRecordingUrl?: string;
  voiceTranscript?: string;
  officialRemarks?: {
    date: string;
    officer: string;
    department: string;
    comment: string;
  }[];
  userHasEndorsed?: boolean;
}

export interface CitizenProfile {
  panNumber: string; // e.g. "ABCDE1234F"
  name: string;
  mobile: string; // e.g. "+91 98765 43210"
  maskedMobile: string; // e.g. "+91 98*** **210"
  email?: string;
  state: string;
  district: string;
  localBody: string;
  ward: string;
  pincode: string;
  isVerified: boolean;
  registeredOn: string;
}

export interface DemandAggregateStat {
  category: GrievanceCategory;
  categoryLabel: string;
  categoryHindi: string;
  iconName: string;
  totalComplaints: number;
  resolvedComplaints: number;
  avgDemandGravity: number; // e.g. 78 out of 100 Civic Demand Gravity Index
  avgAffectedPer100?: number; // legacy backward compatibility
  demandTier: DemandTier;
  totalBudgetAllocatedLakhs: number;
  activeProjects: number;
}
