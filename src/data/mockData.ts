import { GrievanceItem, CitizenProfile } from '../types';

export const INDIAN_STATES_DISTRICTS: Record<string, { districts: string[], localBodies: Record<string, string[]> }> = {
  "Maharashtra": {
    districts: ["Pune", "Mumbai City", "Mumbai Suburban", "Nagpur", "Thane", "Nashik"],
    localBodies: {
      "Pune": ["Pune Municipal Corporation (PMC)", "Pimpri Chinchwad Municipal Corp (PCMC)", "Pune Cantonment Board"],
      "Mumbai City": ["Brihanmumbai Municipal Corporation (BMC - South)", "BMC - Island City"],
      "Mumbai Suburban": ["BMC - Western Suburbs", "BMC - Eastern Suburbs"],
      "Nagpur": ["Nagpur Municipal Corporation (NMC)"],
      "Thane": ["Thane Municipal Corporation (TMC)", "Kalyan-Dombivli Municipal Corp"],
      "Nashik": ["Nashik Municipal Corporation (NMC)"]
    }
  },
  "Uttar Pradesh": {
    districts: ["Varanasi", "Lucknow", "Prayagraj", "Kanpur Nagar", "Noida (Gautam Buddha Nagar)", "Gorakhpur"],
    localBodies: {
      "Varanasi": ["Varanasi Nagar Nigam (VNN)", "Kashi Vishwanath Special Area Authority"],
      "Lucknow": ["Lucknow Municipal Corporation (LMC)"],
      "Prayagraj": ["Prayagraj Nagar Nigam (PNN)"],
      "Kanpur Nagar": ["Kanpur Municipal Corporation (KMC)"],
      "Noida (Gautam Buddha Nagar)": ["Noida Authority", "Greater Noida Industrial Dev Authority"],
      "Gorakhpur": ["Gorakhpur Nagar Nigam (GNN)"]
    }
  },
  "Karnataka": {
    districts: ["Bengaluru Urban", "Mysuru", "Hubballi-Dharwad", "Mangaluru", "Belagavi"],
    localBodies: {
      "Bengaluru Urban": ["Bruhat Bengaluru Mahanagara Palike (BBMP)", "Bengaluru Development Authority"],
      "Mysuru": ["Mysuru City Corporation (MCC)"],
      "Hubballi-Dharwad": ["Hubballi-Dharwad Municipal Corporation"],
      "Mangaluru": ["Mangaluru City Corporation (MCC)"],
      "Belagavi": ["Belagavi City Corporation"]
    }
  },
  "Delhi (NCT)": {
    districts: ["New Delhi", "Central Delhi", "South Delhi", "North West Delhi", "East Delhi"],
    localBodies: {
      "New Delhi": ["New Delhi Municipal Council (NDMC)", "Delhi Cantonment Board"],
      "Central Delhi": ["Municipal Corporation of Delhi (MCD - City-SP Zone)"],
      "South Delhi": ["Municipal Corporation of Delhi (MCD - South Zone)"],
      "North West Delhi": ["Municipal Corporation of Delhi (MCD - Rohini Zone)"],
      "East Delhi": ["Municipal Corporation of Delhi (MCD - Shahdara Zone)"]
    }
  },
  "Tamil Nadu": {
    districts: ["Chennai", "Coimbatore", "Madurai", "Tiruchirappalli", "Salem"],
    localBodies: {
      "Chennai": ["Greater Chennai Corporation (GCC)"],
      "Coimbatore": ["Coimbatore City Municipal Corporation"],
      "Madurai": ["Madurai Corporation"],
      "Tiruchirappalli": ["Tiruchirappalli City Corporation"],
      "Salem": ["Salem City Municipal Corporation"]
    }
  },
  "Bihar": {
    districts: ["Patna", "Gaya", "Muzaffarpur", "Bhagalpur", "Darbhanga"],
    localBodies: {
      "Patna": ["Patna Municipal Corporation (PMC)", "Danapur Cantonment Board"],
      "Gaya": ["Gaya Municipal Corporation"],
      "Muzaffarpur": ["Muzaffarpur Municipal Corporation"],
      "Bhagalpur": ["Bhagalpur Municipal Corporation"],
      "Darbhanga": ["Darbhanga Municipal Corporation"]
    }
  },
  "Gujarat": {
    districts: ["Ahmedabad", "Surat", "Vadodara", "Rajkot", "Gandhinagar"],
    localBodies: {
      "Ahmedabad": ["Ahmedabad Municipal Corporation (AMC)"],
      "Surat": ["Surat Municipal Corporation (SMC)"],
      "Vadodara": ["Vadodara Municipal Corporation (VMC)"],
      "Rajkot": ["Rajkot Municipal Corporation (RMC)"],
      "Gandhinagar": ["Gandhinagar Municipal Corporation (GMC)"]
    }
  },
  "Telangana": {
    districts: ["Hyderabad", "Ranga Reddy", "Medchal-Malkajgiri", "Warangal"],
    localBodies: {
      "Hyderabad": ["Greater Hyderabad Municipal Corporation (GHMC)"],
      "Ranga Reddy": ["GHMC - Rajendranagar Zone"],
      "Medchal-Malkajgiri": ["GHMC - Malkajgiri Zone"],
      "Warangal": ["Greater Warangal Municipal Corporation (GWMC)"]
    }
  }
};

export const INITIAL_GRIEVANCES: GrievanceItem[] = [
  {
    id: "CPG-2026-MH-4821",
    type: "complaint",
    title: "Severe Potholes & Broken Bitumen on Paud Road - Kothrud Junction",
    description: "Deep crater-sized potholes stretching 1.2 km on Paud Road causing multiple two-wheeler accidents and heavy monsoon water-logging during peak office hours. Heavy traffic backlog of over 45 minutes daily.",
    category: "roads",
    subCategory: "Potholes & Road Resurfacing",
    location: {
      country: "India",
      state: "Maharashtra",
      district: "Pune",
      localBodyType: "Municipal Corporation",
      localBodyName: "Pune Municipal Corporation (PMC)",
      wardOrPanchayat: "Ward 14 - Kothrud South",
      pincode: "411038",
      landmark: "Near Vanaz Metro Station, Paud Road"
    },
    submittedAt: "2026-09-12T10:30:00Z",
    citizenName: "Sanjay Deshmukh",
    maskedPan: "ABCDE****F",
    samplePopulationBase: 100,
    affectedMembersCount: 48, // 48 out of 100 citizens! High Demand
    totalCommunityEndorsements: 524,
    demandTier: "high",
    urgencyScore: 92,
    status: "work_in_progress",
    statusBadge: "Execution in Progress (65%)",
    resolutionSlaDays: 21,
    budgetProject: {
      isBudgetAllocated: true,
      sanctionOrderNumber: "PMC/PWD/RD-2026/8942",
      schemeName: "Urban Road Infrastructure Revamp Scheme (URIRS)",
      allocatedAmountLakhs: 245.0, // 2.45 Crores
      releasedAmountLakhs: 180.0,
      utilizedAmountLakhs: 142.5,
      contractorName: "Shree Ganesh Road Infra Tech Ltd.",
      nodalDepartment: "Road & Bridges Department, PMC",
      nodalOfficer: "Er. Nitin Kulkarni (Executive Engineer, Zone 3)",
      startDate: "2026-08-01",
      expectedCompletionDate: "2026-10-15",
      currentProgressPercentage: 65,
      statusMessage: "Milling completed. Sub-base reinforced with dense bituminous macadam (DBM). Final mastic asphalt carpeting underway.",
      milestones: [
        { id: "m1", title: "Joint Field Inspection & Survey", date: "2026-07-15", completed: true, notes: "Defect liability verification completed" },
        { id: "m2", title: "Sanction of ₹2.45 Cr Budget", date: "2026-07-28", completed: true, notes: "Approved by Standing Committee" },
        { id: "m3", title: "Tender Awarded & Work Order", date: "2026-08-01", completed: true, notes: "E-procurement portal reference 2026_PMC_7718" },
        { id: "m4", title: "Bitumen Surface Resurfacing", date: "2026-09-20", completed: true, notes: "65% road stretch completed" },
        { id: "m5", title: "Final Quality Audit & Sign-off", date: "2026-10-15", completed: false, notes: "Core-cutter thickness test pending" }
      ]
    },
    evidenceImages: [
      "https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?w=800&auto=format&fit=crop&q=60"
    ],
    officialRemarks: [
      {
        date: "2026-09-14",
        officer: "Er. Nitin Kulkarni",
        department: "PMC Road Works",
        comment: "Field inspection conducted. ₹2.45 Cr project already sanctioned under annual capex. Contractor directed to expedite night shifts."
      }
    ]
  },
  {
    id: "CPG-2026-UP-8192",
    type: "complaint",
    title: "Shortage of Essential Medicines & Pediatric Ward Doctors in Sigra District Hospital",
    description: "Patients arriving from rural periphery face 4+ hour waiting queues; essential antibiotics, rabies vaccination and IV fluids out of stock. Neonatal ventilators require maintenance technician.",
    category: "hospitals",
    subCategory: "Medicine Shortage & Medical Staffing",
    location: {
      country: "India",
      state: "Uttar Pradesh",
      district: "Varanasi",
      localBodyType: "Municipal Corporation",
      localBodyName: "Varanasi Nagar Nigam (VNN)",
      wardOrPanchayat: "Sigra Ward 42",
      pincode: "221002",
      landmark: "Near Sigra Stadium & District Health Center"
    },
    submittedAt: "2026-09-18T14:15:00Z",
    citizenName: "Pooja Srivastava",
    maskedPan: "BPVPS****K",
    samplePopulationBase: 100,
    affectedMembersCount: 42, // 42 out of 100 members! High Demand
    totalCommunityEndorsements: 410,
    demandTier: "high",
    urgencyScore: 89,
    status: "budget_sanctioned",
    statusBadge: "Budget Sanctioned - E-Tender Floated",
    resolutionSlaDays: 14,
    budgetProject: {
      isBudgetAllocated: true,
      sanctionOrderNumber: "UP-NHM/MED-DIST/2026/041",
      schemeName: "National Health Mission (NHM) District Strengthening",
      allocatedAmountLakhs: 185.0, // 1.85 Cr
      releasedAmountLakhs: 90.0,
      utilizedAmountLakhs: 45.0,
      contractorName: "UP Medical Supplies Corporation (UPMSCL)",
      nodalDepartment: "Chief Medical Officer (CMO) Office, Varanasi",
      nodalOfficer: "Dr. Sandeep Upadhyay (Addl. CMO Varanasi)",
      startDate: "2026-09-01",
      expectedCompletionDate: "2026-10-30",
      currentProgressPercentage: 35,
      statusMessage: "Emergency stock dispatch initiated for 18 essential drug formulations. 2 pediatric specialist doctors assigned on deputation.",
      milestones: [
        { id: "h1", title: "Emergency Audit by CMO Team", date: "2026-09-20", completed: true },
        { id: "h2", title: "State Medicine Requisition Release", date: "2026-09-24", completed: true },
        { id: "h3", title: "Delivery of Pediatric Critical Care Stock", date: "2026-10-05", completed: false },
        { id: "h4", title: "Deployment of 2 Pediatric Specialists", date: "2026-10-12", completed: false }
      ]
    },
    officialRemarks: [
      {
        date: "2026-09-22",
        officer: "Dr. Sandeep Upadhyay",
        department: "District Health Society",
        comment: "Emergency consignment of rabies immunoglobulin and pediatric cephalosporins dispatched from Central Warehouse Lucknow."
      }
    ]
  },
  {
    id: "CPG-2026-KA-3109",
    type: "complaint",
    title: "Stormwater Drain Overflow & Backflow into Outer Ring Road Service Lanes",
    description: "The primary Rajakaluve (stormwater canal) running parallel to Bellandur lake is clogged with construction debris, causing sewage water to inundate apartments and tech park feeder roads during light rain.",
    category: "water_drainage",
    subCategory: "Stormwater Drainage & Rajakaluve Desilting",
    location: {
      country: "India",
      state: "Karnataka",
      district: "Bengaluru Urban",
      localBodyType: "Municipal Corporation",
      localBodyName: "Bruhat Bengaluru Mahanagara Palike (BBMP)",
      wardOrPanchayat: "Mahadevapura Zone - Ward 85",
      pincode: "560103",
      landmark: "Near Bellandur Eco-Space Service Road"
    },
    submittedAt: "2026-09-20T08:45:00Z",
    citizenName: "Ramesh Karthik",
    maskedPan: "CKTPK****M",
    samplePopulationBase: 100,
    affectedMembersCount: 56, // 56 out of 100 citizens! High Demand
    totalCommunityEndorsements: 712,
    demandTier: "high",
    urgencyScore: 96,
    status: "work_in_progress",
    statusBadge: "Desilting Work In Progress (40%)",
    resolutionSlaDays: 30,
    budgetProject: {
      isBudgetAllocated: true,
      sanctionOrderNumber: "BBMP/SWD/2026/GOK-912",
      schemeName: "Bengaluru Mission 2026 - Stormwater Resilience",
      allocatedAmountLakhs: 520.0, // 5.20 Crores
      releasedAmountLakhs: 300.0,
      utilizedAmountLakhs: 195.0,
      contractorName: "Cauvery Infrastructure Engineering Ltd.",
      nodalDepartment: "Storm Water Drains (SWD) Department, BBMP",
      nodalOfficer: "Sri Raghavendra Rao (Chief Engineer, SWD)",
      startDate: "2026-08-15",
      expectedCompletionDate: "2026-11-20",
      currentProgressPercentage: 40,
      statusMessage: "Mechanical desilting excavators operating along 2.4 km stretch. Retaining wall RCC casing in progress.",
      milestones: [
        { id: "sw1", title: "Drone Survey & Encroachment Demarcation", date: "2026-08-20", completed: true },
        { id: "sw2", title: "Excavator Deployment for Silt Removal", date: "2026-09-05", completed: true },
        { id: "sw3", title: "Concrete Box Drain Construction", date: "2026-10-25", completed: false },
        { id: "sw4", title: "Sensor-based Flood Water Gates Installation", date: "2026-11-20", completed: false }
      ]
    }
  },
  {
    id: "CPG-2026-DL-1102",
    type: "complaint",
    title: "Dilapidated Roof & Broken Chemistry Lab Desks in Govt Boys Senior Secondary School",
    description: "Ceiling plaster falling in classrooms 9B and 10A during rainy days. Broken wooden benches with exposed nails injured two students. Immediate civil repair and lab furniture required.",
    category: "schools",
    subCategory: "School Infrastructure & Classroom Safety",
    location: {
      country: "India",
      state: "Delhi (NCT)",
      district: "Central Delhi",
      localBodyType: "Municipal Corporation",
      localBodyName: "Municipal Corporation of Delhi (MCD - City-SP Zone)",
      wardOrPanchayat: "Pahar Ganj Ward 82",
      pincode: "110055",
      landmark: "Near Aram Bagh Govt School Complex"
    },
    submittedAt: "2026-09-15T12:00:00Z",
    citizenName: "Meenakshi Gupta",
    maskedPan: "AGLPG****Q",
    samplePopulationBase: 100,
    affectedMembersCount: 28, // 28 out of 100 members -> Mid Demand
    totalCommunityEndorsements: 195,
    demandTier: "mid",
    urgencyScore: 78,
    status: "verified",
    statusBadge: "Verified by Zonal Inspector - DPR under review",
    resolutionSlaDays: 28,
    budgetProject: {
      isBudgetAllocated: false, // Under review
      schemeName: "Samagra Shiksha Abhiyan - Infrastructure Grant",
      allocatedAmountLakhs: 38.0, // Proposed
      statusMessage: "Detailed Project Report (DPR) submitted to Directorate of Education. Budget sanction anticipated in October 2026 allocation batch."
    },
    officialRemarks: [
      {
        date: "2026-09-19",
        officer: "Shri Anant Verma",
        department: "Directorate of Education, Zone 28",
        comment: "Inspected building structure. Classes temporarily shifted to Ground Floor Wing C. Estimate submitted for urgent roof waterproofing."
      }
    ]
  },
  {
    id: "REC-2026-MH-5520",
    type: "development_recommendation",
    title: "Proposal for High-Density Solar Streetlight Grid & Pedestrian Walkway in Baner IT Corridor",
    description: "Citizen recommendation to install 80 smart solar LED streetlights with motion dimming and develop a 1.8km paved pedestrian walkway from Baner Link Road to Highway to encourage non-motorized transport.",
    category: "electricity",
    subCategory: "Green Infrastructure & Renewable Energy",
    location: {
      country: "India",
      state: "Maharashtra",
      district: "Pune",
      localBodyType: "Municipal Corporation",
      localBodyName: "Pune Municipal Corporation (PMC)",
      wardOrPanchayat: "Ward 9 - Baner Balewadi",
      pincode: "411045",
      landmark: "Baner High Street to Mumbai-Bangalore Bypass"
    },
    submittedAt: "2026-09-08T16:20:00Z",
    citizenName: "Aditya Joshi",
    maskedPan: "APZPJ****R",
    samplePopulationBase: 100,
    affectedMembersCount: 34, // 34 out of 100 members -> Mid Demand
    totalCommunityEndorsements: 340,
    demandTier: "mid",
    urgencyScore: 68,
    status: "budget_sanctioned",
    statusBadge: "Recommended & Sanctioned under Smart City",
    resolutionSlaDays: 45,
    budgetProject: {
      isBudgetAllocated: true,
      sanctionOrderNumber: "PSCDCL/SOLAR-WALK/2026/18",
      schemeName: "Smart Cities Mission (Pune Smart City Development Corp)",
      allocatedAmountLakhs: 115.0, // 1.15 Cr
      releasedAmountLakhs: 50.0,
      utilizedAmountLakhs: 22.0,
      contractorName: "SunUrja Infra Solutions",
      nodalDepartment: "Electrical & Non-Conventional Energy Cell, PMC",
      nodalOfficer: "Er. M. K. Shinde (Superintending Engineer)",
      startDate: "2026-09-10",
      expectedCompletionDate: "2026-12-15",
      currentProgressPercentage: 25,
      statusMessage: "Foundation poles casting in progress along western flank. 80 solar panel kits delivered to municipal depot.",
      milestones: [
        { id: "rec1", title: "Citizen Public Consultation & Feasibility", date: "2026-08-10", completed: true },
        { id: "rec2", title: "Smart City Grant Approval", date: "2026-09-05", completed: true },
        { id: "rec3", title: "Pole Foundation & Wiring", date: "2026-10-15", completed: false },
        { id: "rec4", title: "Commissioning & Luminance Verification", date: "2026-12-15", completed: false }
      ]
    }
  },
  {
    id: "CPG-2026-TN-6190",
    type: "complaint",
    title: "Sewage Contamination in Drinking Water Pipeline in T. Nagar Residential Blocks",
    description: "Dark brown water with foul sulfur odor flowing from domestic municipal taps in 3 residential streets. 15 residents including senior citizens reported acute gastroenteritis in past 48 hours.",
    category: "water_drainage",
    subCategory: "Drinking Water Contamination",
    location: {
      country: "India",
      state: "Tamil Nadu",
      district: "Chennai",
      localBodyType: "Municipal Corporation",
      localBodyName: "Greater Chennai Corporation (GCC)",
      wardOrPanchayat: "T. Nagar - Ward 134",
      pincode: "600017",
      landmark: "Burkit Road & Venkatnarayana Road Junction"
    },
    submittedAt: "2026-09-22T06:10:00Z",
    citizenName: "K. Sunderrajan",
    maskedPan: "ACRPS****D",
    samplePopulationBase: 100,
    affectedMembersCount: 68, // 68 out of 100 citizens! High Demand
    totalCommunityEndorsements: 680,
    demandTier: "high",
    urgencyScore: 98,
    status: "work_in_progress",
    statusBadge: "Emergency Repair Underway (80%)",
    resolutionSlaDays: 7,
    budgetProject: {
      isBudgetAllocated: true,
      sanctionOrderNumber: "CMWSSB/EMG-REP/2026/304",
      schemeName: "Chennai Metro Water Emergency Redressal Fund",
      allocatedAmountLakhs: 42.0,
      releasedAmountLakhs: 42.0,
      utilizedAmountLakhs: 36.0,
      contractorName: "Metro Water Rapid Response Unit",
      nodalDepartment: "Chennai Metropolitan Water Supply and Sewerage Board (CMWSSB)",
      nodalOfficer: "Thiru V. Balachandran (Area Engineer IX)",
      startDate: "2026-09-23",
      expectedCompletionDate: "2026-09-30",
      currentProgressPercentage: 80,
      statusMessage: "Leakage pinpointed near storm drain junction. Old cast iron line isolated; replacement with high-density polyethylene (HDPE) pipe 80% finished. Clean water tankers dispatched daily.",
      milestones: [
        { id: "w1", title: "Water Sample Lab Testing (E. coli presence)", date: "2026-09-22", completed: true },
        { id: "w2", title: "Emergency Water Tanker Supply to affected 340 homes", date: "2026-09-23", completed: true },
        { id: "w3", title: "HDPE Pipe Relay & Pressure Jointing", date: "2026-09-26", completed: true },
        { id: "w4", title: "Post-repair Residual Chlorine Lab Clearance", date: "2026-09-30", completed: false }
      ]
    },
    officialRemarks: [
      {
        date: "2026-09-23",
        officer: "Thiru V. Balachandran",
        department: "CMWSSB Area IX",
        comment: "Emergency pipeline shutdown activated. 12 dedicated water tankers deployed free of charge to all affected residents while relaying HDPE mains."
      }
    ]
  },
  {
    id: "CPG-2026-BR-9031",
    type: "complaint",
    title: "Uncollected Garbage Accumulation & Open Dumping near Kankarbagh Main Market",
    description: "Over 8 metric tons of unsegregated wet and dry garbage piling up on public road opposite Sabzi Mandi for 9 consecutive days. Stray cattle and flies creating severe hygiene hazard.",
    category: "sanitation",
    subCategory: "Garbage Pile-up & Solid Waste Management",
    location: {
      country: "India",
      state: "Bihar",
      district: "Patna",
      localBodyType: "Municipal Corporation",
      localBodyName: "Patna Municipal Corporation (PMC)",
      wardOrPanchayat: "Kankarbagh Ward 31",
      pincode: "800020",
      landmark: "Near Tiwary Bechar Sabzi Mandi"
    },
    submittedAt: "2026-09-17T11:15:00Z",
    citizenName: "Amit Kumar Mishra",
    maskedPan: "APKMK****H",
    samplePopulationBase: 100,
    affectedMembersCount: 51, // 51 out of 100 citizens! High Demand
    totalCommunityEndorsements: 495,
    demandTier: "high",
    urgencyScore: 88,
    status: "work_in_progress",
    statusBadge: "Deep Cleaning & Compactors Deployed (70%)",
    resolutionSlaDays: 5,
    budgetProject: {
      isBudgetAllocated: true,
      sanctionOrderNumber: "PMC/SWM/2026/KKB-112",
      schemeName: "Swachh Bharat Mission (Urban 2.0)",
      allocatedAmountLakhs: 75.0,
      releasedAmountLakhs: 75.0,
      utilizedAmountLakhs: 48.0,
      contractorName: "Patna Clean Environment Services",
      nodalDepartment: "Solid Waste Management Division, PMC",
      nodalOfficer: "Shri Rajeshwar Singh (Executive Officer, Kankarbagh Circle)",
      startDate: "2026-09-19",
      expectedCompletionDate: "2026-09-29",
      currentProgressPercentage: 70,
      statusMessage: "3 hydraulic compactors deployed. 80% cleared. Installation of enclosed metal dumpsters and CCTV surveillance to prevent open dumping."
    }
  },
  {
    id: "REC-2026-GJ-7014",
    type: "development_recommendation",
    title: "Establishment of Modern Public Digital Library & Study Center for Rural Youth",
    description: "Citizen recommendation to convert vacant municipal community building into a public reading center with 40 computer terminals, high-speed Wi-Fi and competitive examination study material.",
    category: "schools",
    subCategory: "Digital Learning & Public Infrastructure",
    location: {
      country: "India",
      state: "Gujarat",
      district: "Ahmedabad",
      localBodyType: "Municipal Corporation",
      localBodyName: "Ahmedabad Municipal Corporation (AMC)",
      wardOrPanchayat: "Maninagar Ward 18",
      pincode: "380008",
      landmark: "Near Kankaria Lake South Gate"
    },
    submittedAt: "2026-09-10T15:00:00Z",
    citizenName: "Darshan Patel",
    maskedPan: "AGLPP****T",
    samplePopulationBase: 100,
    affectedMembersCount: 22, // 22 out of 100 members -> Mid Demand
    totalCommunityEndorsements: 215,
    demandTier: "mid",
    urgencyScore: 62,
    status: "budget_sanctioned",
    statusBadge: "Approved in Municipal Budget 2026-27",
    resolutionSlaDays: 60,
    budgetProject: {
      isBudgetAllocated: true,
      sanctionOrderNumber: "AMC/EDU-LIB/2026/88",
      schemeName: "Smart City Gujarat Knowledge Hub Initiative",
      allocatedAmountLakhs: 85.0,
      releasedAmountLakhs: 40.0,
      utilizedAmountLakhs: 15.0,
      contractorName: "Shilp Digital Architects Pvt Ltd",
      nodalDepartment: "School Board & Social Welfare, AMC",
      nodalOfficer: "Smt. Hina Trivedi (Deputy Municipal Commissioner)",
      startDate: "2026-09-15",
      expectedCompletionDate: "2026-12-30",
      currentProgressPercentage: 20,
      statusMessage: "Interior layout architectural drawings approved. Civil renovation of flooring and electrical network commencing this week."
    }
  },
  {
    id: "CPG-2026-TG-4421",
    type: "complaint",
    title: "Frequent Low Voltage & Unannounced Power Outages in Boduppal Residential Zone",
    description: "Transformer overloaded with 180V low voltage tripping air conditioners, water pumps and refrigerators. Sparks observed at DP box near Colony Park during load surges.",
    category: "electricity",
    subCategory: "Power Outages & Transformer Overload",
    location: {
      country: "India",
      state: "Telangana",
      district: "Medchal-Malkajgiri",
      localBodyType: "Municipal Corporation",
      localBodyName: "GHMC - Malkajgiri Zone",
      wardOrPanchayat: "Boduppal Sector 4",
      pincode: "500092",
      landmark: "Behind Reliance Smart Point, Boduppal"
    },
    submittedAt: "2026-09-21T18:20:00Z",
    citizenName: "Venkata Raman",
    maskedPan: "AWRPV****K",
    samplePopulationBase: 100,
    affectedMembersCount: 18, // 18 out of 100 -> Mid Demand
    totalCommunityEndorsements: 178,
    demandTier: "mid",
    urgencyScore: 72,
    status: "verified",
    statusBadge: "Inspected by TSSPDCL - Transformer Upgrade Sanctioned",
    resolutionSlaDays: 10,
    budgetProject: {
      isBudgetAllocated: true,
      sanctionOrderNumber: "TSSPDCL/MED-ZONE/2026/331",
      schemeName: "Revamped Distribution Sector Scheme (RDSS)",
      allocatedAmountLakhs: 32.5,
      releasedAmountLakhs: 32.5,
      utilizedAmountLakhs: 12.0,
      contractorName: "TSSPDCL Departmental Engineering Wing",
      nodalDepartment: "Telangana State Southern Power Distribution Co.",
      nodalOfficer: "Er. K. Srinivas Rao (Divisional Engineer)",
      startDate: "2026-09-24",
      expectedCompletionDate: "2026-10-04",
      currentProgressPercentage: 35,
      statusMessage: "New 500 KVA additional distribution transformer dispatched from Jeedimetla stores. Pole mounting planned for Sunday planned shutdown."
    }
  },
  {
    id: "CPG-2026-MH-2201",
    type: "complaint",
    title: "Stray Cattle & Lack of Streetlights along Hadapsar-Saswad Bypass Road",
    description: "Total darkness over 600m stretch due to damaged cabling. Stray animals roaming on highway causing emergency braking and near fatal crashes at night.",
    category: "public_safety",
    subCategory: "Streetlights & Traffic Safety",
    location: {
      country: "India",
      state: "Maharashtra",
      district: "Pune",
      localBodyType: "Municipal Corporation",
      localBodyName: "Pune Municipal Corporation (PMC)",
      wardOrPanchayat: "Ward 22 - Hadapsar",
      pincode: "411028",
      landmark: "Near Phursungi Toll Naka Junction"
    },
    submittedAt: "2026-09-24T09:10:00Z",
    citizenName: "Pravin Jagtap",
    maskedPan: "APKPJ****C",
    samplePopulationBase: 100,
    affectedMembersCount: 14, // 14 out of 100 -> Low Demand
    totalCommunityEndorsements: 89,
    demandTier: "low",
    urgencyScore: 54,
    status: "submitted",
    statusBadge: "Under Verification by Traffic & Electrical Wing",
    resolutionSlaDays: 14,
    budgetProject: {
      isBudgetAllocated: false,
      statusMessage: "Awaiting field officer spot verification report."
    }
  }
];

export const DEMO_USER_PROFILE: CitizenProfile = {
  panNumber: "ABCDE1234F",
  name: "Rajesh Sharma",
  mobile: "+91 98234 56789",
  maskedMobile: "+91 98*** **789",
  email: "rajesh.sharma@govindia-citizen.in",
  state: "Maharashtra",
  district: "Pune",
  localBody: "Pune Municipal Corporation (PMC)",
  ward: "Ward 14 - Kothrud South",
  pincode: "411038",
  isVerified: true,
  registeredOn: "2025-01-14"
};

export const CATEGORY_DETAILS: Record<string, { label: string, hindi: string, icon: string, color: string, bg: string, border: string }> = {
  roads: {
    label: "Roads & Highways",
    hindi: "सड़कें एवं राजमार्ग",
    icon: "Car",
    color: "text-amber-700",
    bg: "bg-amber-50",
    border: "border-amber-200"
  },
  hospitals: {
    label: "Hospitals & Healthcare",
    hindi: "अस्पताल एवं स्वास्थ्य सेवाएं",
    icon: "HeartPulse",
    color: "text-rose-700",
    bg: "bg-rose-50",
    border: "border-rose-200"
  },
  schools: {
    label: "Schools & Education",
    hindi: "स्कूल एवं बुनियादी शिक्षा",
    icon: "GraduationCap",
    color: "text-blue-700",
    bg: "bg-blue-50",
    border: "border-blue-200"
  },
  water_drainage: {
    label: "Water Supply & Drainage",
    hindi: "जलापूर्ति एवं जल निकासी",
    icon: "Droplets",
    color: "text-cyan-700",
    bg: "bg-cyan-50",
    border: "border-cyan-200"
  },
  electricity: {
    label: "Electricity & Power",
    hindi: "विद्युत एवं प्रकाश व्यवस्था",
    icon: "Zap",
    color: "text-yellow-700",
    bg: "bg-yellow-50",
    border: "border-yellow-200"
  },
  sanitation: {
    label: "Sanitation & Waste Disposal",
    hindi: "स्वच्छता एवं कचरा प्रबंधन",
    icon: "Trash2",
    color: "text-emerald-700",
    bg: "bg-emerald-50",
    border: "border-emerald-200"
  },
  transport: {
    label: "Public Transport",
    hindi: "सार्वजनिक परिवहन",
    icon: "Bus",
    color: "text-indigo-700",
    bg: "bg-indigo-50",
    border: "border-indigo-200"
  },
  public_safety: {
    label: "Public Safety & Law",
    hindi: "सार्वजनिक सुरक्षा एवं प्रकाश",
    icon: "ShieldAlert",
    color: "text-orange-700",
    bg: "bg-orange-50",
    border: "border-orange-200"
  },
  environment: {
    label: "Environment & Parks",
    hindi: "पर्यावरण एवं जन उद्यान",
    icon: "Trees",
    color: "text-teal-700",
    bg: "bg-teal-50",
    border: "border-teal-200"
  }
};
