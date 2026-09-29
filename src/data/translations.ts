export interface CategoryTranslation {
  roads: string;
  hospitals: string;
  schools: string;
  water_drainage: string;
  electricity: string;
  sanitation: string;
  transport: string;
  public_safety: string;
  environment: string;
}

export interface AppTranslation {
  appName: string;
  appNativeBadge: string;
  tagline: string;
  complaintTitle: string;
  complaintSubtitle: string;
  proposalTitle: string;
  proposalSubtitle: string;
  dashboardTab: string;
  formTab: string;
  budgetTab: string;
  recommendationsTab: string;
  categories: CategoryTranslation;
}

export const STATE_TRANSLATIONS: Record<string, AppTranslation> = {
  en: {
    appName: "Jana Sahayak",
    appNativeBadge: "National Portal",
    tagline: "AI-Powered Citizen Grievance & Civic Intelligence Platform",
    complaintTitle: "Civic Problem / Grievance",
    complaintSubtitle: "Report urgent issues: broken roads, hospital medicine shortage, water leaks, power outages.",
    proposalTitle: "Citizen Development Proposal",
    proposalSubtitle: "Recommend community improvements: new health clinic, smart streetlights, public reading room.",
    dashboardTab: "Real-Time Demand Dashboard",
    formTab: "Apply for Grievance / Voice & Text",
    budgetTab: "Budget & Timeline Tracker",
    recommendationsTab: "Citizen Proposals & Votes",
    categories: {
      roads: "Roads & Highways",
      hospitals: "Hospitals & Healthcare",
      schools: "Schools & Education",
      water_drainage: "Water Supply & Drainage",
      electricity: "Electricity & Power",
      sanitation: "Sanitation & Waste",
      transport: "Public Transport",
      public_safety: "Public Safety & Law",
      environment: "Environment & Parks"
    }
  },
  hi: {
    appName: "जन सहायक",
    appNativeBadge: "जन सहायक",
    tagline: "एआई-संचालित नागरिक शिकायत एवं जनहित मांग मंच",
    complaintTitle: "नागरिक समस्या / शिकायत",
    complaintSubtitle: "सड़क के गड्ढे, अस्पताल में दवा की कमी, दूषित पेयजल, बिजली कटौती दर्ज करें।",
    proposalTitle: "नागरिक विकास अनुशंसा",
    proposalSubtitle: "सामुदायिक सुधार: नया स्वास्थ्य उपकेंद्र, सौर स्ट्रीट लाइट, पुस्तकालय प्रस्तावित करें।",
    dashboardTab: "वास्तविक समय जन-मांग डैशबोर्ड",
    formTab: "शिकायत दर्ज करें / आवाज एवं पाठ",
    budgetTab: "बजट एवं प्रगति ट्रैकर",
    recommendationsTab: "नागरिक विकास प्रस्ताव एवं वोट",
    categories: {
      roads: "सड़कें एवं राजमार्ग",
      hospitals: "अस्पताल एवं स्वास्थ्य सेवाएं",
      schools: "स्कूल एवं बुनियादी शिक्षा",
      water_drainage: "जलापूर्ति एवं जल निकासी",
      electricity: "विद्युत एवं प्रकाश व्यवस्था",
      sanitation: "स्वच्छता एवं कचरा प्रबंधन",
      transport: "सार्वजनिक परिवहन",
      public_safety: "सार्वजनिक सुरक्षा एवं कानून",
      environment: "पर्यावरण एवं हरित क्षेत्र"
    }
  },
  te: {
    appName: "జన సహాయక్",
    appNativeBadge: "జన సహాయక్",
    tagline: "ఏఐ-ఆధారిత పౌర సమస్యల పరిష్కారం & ప్రజా డిమాండ్ వేదిక",
    complaintTitle: "పౌర సమస్య / ఫిర్యాదు",
    complaintSubtitle: "పాడైన రహదారులు, మందుల కొరత, మంచినీటి సమస్య, విద్యుత్ అంతరాయాలను నివేదించండి.",
    proposalTitle: "పౌర అభివృద్ధి ప్రతిపాదన",
    proposalSubtitle: "సమాజ ప్రగతి: కొత్త ఆరోగ్య ఉపకేంద్రం, వీధి దీపాలు, ప్రజా గ్రంథాలయం ప్రతిపాదించండి.",
    dashboardTab: "రియల్-టైమ్ ప్రజా డిమాండ్ డ్యాష్‌బోర్డ్",
    formTab: "ఫిర్యాదు చేయండి / వాయిస్ & టెక్స్ట్",
    budgetTab: "బడ్జెట్ & కాలపరిమితి ట్రాకర్",
    recommendationsTab: "పౌర ప్రతిపాదనలు & ఓట్లు",
    categories: {
      roads: "రహదారులు & వంతెనలు",
      hospitals: "ఆసుపత్రులు & వైద్యసేవలు",
      schools: "పాఠశాలలు & విద్య",
      water_drainage: "మంచినీరు & మురుగు కాలువలు",
      electricity: "విద్యుత్ & వీధి దీపాలు",
      sanitation: "పరిశుభ్రత & చెత్త నిర్వహణ",
      transport: "ప్రజా రవాణా",
      public_safety: "ప్రజా భద్రత & రక్షణ",
      environment: "పర్యావరణం & పార్కులు"
    }
  },
  ta: {
    appName: "ஜன சகாயக்",
    appNativeBadge: "ஜன சகாயக்",
    tagline: "செயற்கை நுண்ணறிவு அடிப்படையிலான மக்கள் குறைதீர்க்கும் தளம்",
    complaintTitle: "குடிமக்கள் குறை / புகார்",
    complaintSubtitle: "சேதமடைந்த சாலைகள், மருத்துவமனை மருந்து பற்றாக்குறை, குடிநீர் கசிவு குறித்து புகாரளிக்கவும்.",
    proposalTitle: "மக்கள் வளர்ச்சி திட்டம்",
    proposalSubtitle: "சமூக முன்னேற்றம்: புதிய சுகாதார மையம், ஸ்மார்ட் தெருவிளக்குகள், நூலகம் பரிந்துரைக்கவும்.",
    dashboardTab: "நேரடி மக்கள் தேவை டாஷ்போர்டு",
    formTab: "புகார் பதிவு செய்க / குரல் & உரை",
    budgetTab: "நிதி ஒதுக்கீடு & காலக்கெடு கண்காணிப்பு",
    recommendationsTab: "மக்கள் திட்டங்கள் & வாக்குகள்",
    categories: {
      roads: "சாலைகள் மற்றும் பாலங்கள்",
      hospitals: "மருத்துவமனைகள் மற்றும் சுகாதாரம்",
      schools: "பள்ளிகள் மற்றும் கல்வி",
      water_drainage: "குடிநீர் மற்றும் கழிவுநீர் வடிகால்",
      electricity: "மின்சாரம் மற்றும் விளக்குகள்",
      sanitation: "தூய்மை மற்றும் கழிவு மேலாண்மை",
      transport: "பொதுப் போக்குவரத்து",
      public_safety: "பொதுப் பாதுகாப்பு",
      environment: "சுற்றுச்சூழல் மற்றும் பூங்காக்கள்"
    }
  },
  mr: {
    appName: "जन सहाय्यक",
    appNativeBadge: "जन सहाय्यक",
    tagline: "एआय-सक्षम नागरिक तक्रार निवारण व नागरी मागणी व्यासपीठ",
    complaintTitle: "नागरी समस्या / तक्रार",
    complaintSubtitle: "रस्त्यावरील खड्डे, रुग्णालयात औषध टंचाई, पाणी गळती, वीज समस्या नोंदवा.",
    proposalTitle: "नागरी विकास शिफारस",
    proposalSubtitle: "परिसर सुधारणा: नवीन आरोग्य केंद्र, पथदिवे, वाचनालय सुचवा.",
    dashboardTab: "थेट जनमागणी डॅशबोर्ड",
    formTab: "तक्रार नोंदवा / व्हॉइस व मजकूर",
    budgetTab: "अर्थसंकल्प व प्रगती ट्रॅकर",
    recommendationsTab: "नागरी विकास प्रस्ताव व मते",
    categories: {
      roads: "रस्ते व पूल",
      hospitals: "रुग्णालये व आरोग्य सेवा",
      schools: "शाळा व शिक्षण",
      water_drainage: "पाणीपुरवठा व सांडपाणी निचरा",
      electricity: "वीज व पथदिवे",
      sanitation: "स्वच्छता व कचरा व्यवस्थापन",
      transport: "सार्वजनिक वाहतूक",
      public_safety: "सार्वजनिक सुरक्षा",
      environment: "पर्यावरण व उद्याने"
    }
  },
  bn: {
    appName: "জন সহায়ক",
    appNativeBadge: "জন সহায়ক",
    tagline: "এআই-চালিত নাগরিক অভিযোগ প্রতিকার ও নাগরিক চাহিদা প্ল্যাটফর্ম",
    complaintTitle: "নাগরিক সমস্যা / অভিযোগ",
    complaintSubtitle: "ভাঙা রাস্তা, হাসপাতালে ওষুধের অভাব, পানীয় জলের সমস্যা, বিদ্যুৎ বিভ্রাট জানান।",
    proposalTitle: "নাগরিক উন্নয়ন প্রস্তাবনা",
    proposalSubtitle: "এলাকার উন্নয়ন: নতুন স্বাস্থ্যকেন্দ্র, পথবাতি, পাঠাগার স্থাপনের সুপারিশ করুন।",
    dashboardTab: "রিয়েল-টাইম নাগরিক চাহিদা ড্যাশবোর্ড",
    formTab: "অভিযোগ দায়ের করুন / ভয়েস ও পাঠ্য",
    budgetTab: "বাজেট ও সময়রেখা ট্র্যাকার",
    recommendationsTab: "নাগরিক প্রস্তাব ও ভোট",
    categories: {
      roads: "রাস্তা ও সেতু",
      hospitals: "হাসপাতাল ও স্বাস্থ্যসেবা",
      schools: "বিদ্যালয় ও শিক্ষা",
      water_drainage: "জল সরবরাহ ও নিকাশী",
      electricity: "বিদ্যুৎ ও আলোকসজ্জা",
      sanitation: "পরিচ্ছন্নতা ও বর্জ্য ব্যবস্থাপনা",
      transport: "গণপরিবহন",
      public_safety: "জননিরাপত্তা",
      environment: "পরিবেশ ও উদ্যান"
    }
  },
  gu: {
    appName: "જન સહાયક",
    appNativeBadge: "જન સહાયક",
    tagline: "એઆઈ-સંચાલિત નાગરિક ફરિયાદ નિવારણ અને લોકમાગણી પ્લેટફોર્મ",
    complaintTitle: "નાગરિક સમસ્યા / ફરિયાદ",
    complaintSubtitle: "તૂટેલા રસ્તા, હોસ્પિટલમાં દવાની અછત, પીવાના પાણીની સમસ્યા, વીજળી કટ નોંધાવો.",
    proposalTitle: "નાગરિક વિકાસ દરખાસ્ત",
    proposalSubtitle: "વિસ્તાર સુધારણા: નવું આરોગ્ય કેન્દ્ર, સ્ટ્રીટ લાઇટ, વાચનાલયની ભલામણ કરો.",
    dashboardTab: "રિયલ-ટાઇમ લોકમાગણી ડેશબોર્ડ",
    formTab: "ફરિયાદ નોંધાવો / અવાજ અને લખાણ",
    budgetTab: "બજેટ અને પ્રગતિ ટ્રેકર",
    recommendationsTab: "નાગરિક દરખાસ્તો અને મતો",
    categories: {
      roads: "રસ્તાઓ અને પુલ",
      hospitals: "હોસ્પિટલો અને આરોગ્ય સેવાઓ",
      schools: "શાળાઓ અને શિક્ષણ",
      water_drainage: "પાણી પુરવઠો અને ગટર વ્યવસ્થા",
      electricity: "વીજળી અને સ્ટ્રીટ લાઇટ્સ",
      sanitation: "સ્વચ્છતા અને કચરા નિકાલ",
      transport: "જાહેર પરિવહન",
      public_safety: "જાહેર સુરક્ષા",
      environment: "પર્યાવરણ અને બગીચા"
    }
  },
  kn: {
    appName: "ಜನ ಸಹಾಯಕ",
    appNativeBadge: "ಜನ ಸಹಾಯಕ",
    tagline: "ಎಐ-ಆಧಾರಿತ ನಾಗರಿಕ ಕುಂದುಕೊರತೆ ನಿವಾರಣೆ ಮತ್ತು ಸಾರ್ವಜನಿಕ ಬೇಡಿಕೆ ವೇದಿಕೆ",
    complaintTitle: "ನಾಗರಿಕ ಸಮಸ್ಯೆ / ದೂರು",
    complaintSubtitle: "ಹಾಳಾದ ರಸ್ತೆಗಳು, ಆಸ್ಪತ್ರೆ ಔಷಧಿ ಕೊರತೆ, ಕುಡಿಯುವ ನೀರಿನ ಸಮಸ್ಯೆ, ವಿದ್ಯುತ್ ಕಡಿತ ವರದಿ ಮಾಡಿ.",
    proposalTitle: "ನಾಗರಿಕ ಅಭಿವೃದ್ಧಿ ಪ್ರಸ್ತಾವನೆ",
    proposalSubtitle: "ಸಮುದಾಯ ಸುಧಾರಣೆ: ಹೊಸ ಆರೋಗ್ಯ ಕೇಂದ್ರ, ಬೀದಿ ದೀಪಗಳು, ಸಾರ್ವಜನಿಕ ಗ್ರಂಥಾಲಯ ಶಿಫಾರಸು ಮಾಡಿ.",
    dashboardTab: "ನೈಜ ಸಮಯದ ಸಾರ್ವಜನಿಕ ಬೇಡಿಕೆ ಡ್ಯಾಶ್‌ಬೋರ್ಡ್",
    formTab: "ದೂರು ಸಲ್ಲಿಸಿ / ಧ್ವನಿ ಮತ್ತು ಪಠ್ಯ",
    budgetTab: "ಬಜೆಟ್ ಮತ್ತು ಪ್ರಗತಿ ಟ್ರ್ಯಾಕರ್",
    recommendationsTab: "ನಾಗರಿಕ ಪ್ರಸ್ತಾವನೆಗಳು ಮತ್ತು ಮತಗಳು",
    categories: {
      roads: "ರಸ್ತೆಗಳು ಮತ್ತು ಸೇತುವೆಗಳು",
      hospitals: "ಆಸ್ಪತ್ರೆಗಳು ಮತ್ತು ಆರೋಗ್ಯ ಸೇವೆಗಳು",
      schools: "ಶಾಲೆಗಳು ಮತ್ತು ಶಿಕ್ಷಣ",
      water_drainage: "ನೀರು ಸರಬರಾಜು ಮತ್ತು ಒಳಚರಂಡಿ",
      electricity: "ವಿದ್ಯುತ್ ಮತ್ತು ಬೀದಿ ದೀಪಗಳು",
      sanitation: "ಸ್ವಚ್ಛತೆ ಮತ್ತು ತ್ಯಾಜ್ಯ ವಿಲೇವಾರಿ",
      transport: "ಸಾರ್ವಜನಿಕ ಸಾರಿಗೆ",
      public_safety: "ಸಾರ್ವಜನಿಕ ಸುರಕ್ಷತೆ",
      environment: "ಪರಿಸರ ಮತ್ತು ಉದ್ಯಾನಗಳು"
    }
  },
  ml: {
    appName: "ജന സഹായക്",
    appNativeBadge: "ജന സഹായക്",
    tagline: "എഐ-അധിഷ്ഠിത പൗര പരാതി പരിഹാര & പൊതു ഡിമാൻഡ് പ്ലാറ്റ്ഫോം",
    complaintTitle: "പൗര പ്രശ്നം / പരാതി",
    complaintSubtitle: "തകർന്ന റോഡുകൾ, ആശുപത്രി മരുന്ന് ക്ഷാമം, കുടിവെള്ള ചോർച്ച, വൈദ്യുതി മുടക്കം റിപ്പോർട്ട് ചെയ്യുക.",
    proposalTitle: "പൗര വികസന നിർദ്ദേശം",
    proposalSubtitle: "പ്രാദേശിക വികസനം: പുതിയ ഹെൽത്ത് സബ് സെന്റർ, തെരുവ് വിളക്കുകൾ, ലൈബ്രറി നിർദ്ദേശിക്കുക.",
    dashboardTab: "തത്സമയ പൊതു ഡിമാൻഡ് ഡാഷ്‌ബോർഡ്",
    formTab: "പരാതി നൽകുക / വോയ്‌സ് & ടെക്‌സ്റ്റ്",
    budgetTab: "ബജറ്റ് & പുരോഗതി ട്രാക്കർ",
    recommendationsTab: "പൗര നിർദ്ദേശങ്ങളും വോട്ടുകളും",
    categories: {
      roads: "റോഡുകളും പാലങ്ങളും",
      hospitals: "ആശുപത്രികളും ആരോഗ്യ സേവനങ്ങളും",
      schools: "സ്കൂളുകളും വിദ്യാഭ്യാസവും",
      water_drainage: "കുടിവെള്ള വിതരണവും ഡ്രെയിനേജും",
      electricity: "വൈദ്യുതിയും തെരുവ് വിളക്കുകളും",
      sanitation: "ശുചിത്വവും മാലിന്യ സംസ്കരണവും",
      transport: "പൊതുഗതാഗതം",
      public_safety: "പൊതുസുരക്ഷ",
      environment: "പരിസ്ഥിതിയും പാർക്കുകളും"
    }
  },
  or: {
    appName: "ଜନ ସହାୟକ",
    appNativeBadge: "ଜନ ସହାୟକ",
    tagline: "ଏଆଇ-ଚାଳିତ ନାଗରିକ ଅଭିଯୋଗ ନିବାରଣ ଏବଂ ଜନ ଦାବି ମଞ୍ଚ",
    complaintTitle: "ନାଗରିକ ସମସ୍ୟା / ଅଭିଯୋଗ",
    complaintSubtitle: "ଭଙ୍ଗା ରାସ୍ତା, ଡାକ୍ତରଖାନାରେ ଔଷଧ ଅଭାବ, ପାନୀୟ ଜଳ ସମସ୍ୟା, ବିଦ୍ୟୁତ ବିଭ୍ରାଟ ଜଣାନ୍ତୁ।",
    proposalTitle: "ନାଗରିକ ବିକାଶ ପ୍ରସ୍ତାବ",
    proposalSubtitle: "ଅଞ୍ଚଳ ଉନ୍ନତି: ନୂତନ ସ୍ୱାସ୍ଥ୍ୟ ଉପକେନ୍ଦ୍ର, ଷ୍ଟ୍ରିଟ୍ ଲାଇଟ୍, ପାଠାଗାର ପ୍ରସ୍ତାବ ଦିଅନ୍ତୁ।",
    dashboardTab: "ରିଅଲ-ଟାଇମ ଜନ ଦାବି ଡ୍ୟାସବୋର୍ଡ",
    formTab: "ଅଭିଯୋଗ ଦାଖଲ କରନ୍ତୁ / ସ୍ୱର ଏବଂ ଲେଖା",
    budgetTab: "ବଜେଟ ଓ ପ୍ରଗତି ଟ୍ରାକର",
    recommendationsTab: "ନାଗରିକ ପ୍ରସ୍ତାବ ଓ ଭୋଟ",
    categories: {
      roads: "ରାସ୍ତା ଓ ପୋଲ",
      hospitals: "ଡାକ୍ତରଖାନା ଓ ସ୍ୱାସ୍ଥ୍ୟ ସେବା",
      schools: "ବିଦ୍ୟାଳୟ ଓ ଶିକ୍ଷା",
      water_drainage: "ଜଳ ଯୋଗାଣ ଓ ନିଷ୍କାସନ",
      electricity: "ବିଦ୍ୟୁତ ଓ ଆଲୋକ",
      sanitation: "ପରିମଳ ଓ ଆବର୍ଜନା ପରିଚାଳନା",
      transport: "ସର୍ବସାଧାରଣ ପରିବହନ",
      public_safety: "ଜନ ସୁରକ୍ଷା",
      environment: "ପରିବେଶ ଓ ପାର୍କ"
    }
  },
  pa: {
    appName: "ਜਨ ਸਹਾਇਕ",
    appNativeBadge: "ਜਨ ਸਹਾਇਕ",
    tagline: "ਏਆਈ-ਸੰਚਾਲਿਤ ਨਾਗਰਿਕ ਸ਼ਿਕਾਇਤ ਨਿਵਾਰਣ ਅਤੇ ਜਨਤਕ ਮੰਗ ਮੰਚ",
    complaintTitle: "ਨਾਗਰਿਕ ਸਮੱਸਿਆ / ਸ਼ਿਕਾਇਤ",
    complaintSubtitle: "ਟੁੱਟੀਆਂ ਸੜਕਾਂ, ਹਸਪਤਾਲ ਵਿਚ ਦਵਾਈਆਂ ਦੀ ਕਮੀ, ਪੀਣ ਵਾਲੇ ਪਾਣੀ ਦੀ ਸਮੱਸਿਆ, ਬਿਜਲੀ ਕੱਟ ਦਰਜ ਕਰੋ।",
    proposalTitle: "ਨਾਗਰਿਕ ਵਿਕਾਸ ਤਜਵੀਜ਼",
    proposalSubtitle: "ਇਲਾਕੇ ਦਾ ਸੁਧਾਰ: ਨਵਾਂ ਸਿਹਤ ਕੇਂਦਰ, ਸਟਰੀਟ ਲਾਈਟਾਂ, ਲਾਇਬ੍ਰੇਰੀ ਦੀ ਸਿਫਾਰਸ਼ ਕਰੋ।",
    dashboardTab: "ਰੀਅਲ-ਟਾਈਮ ਜਨਤਕ ਮੰਗ ਡੈਸ਼ਬੋਰਡ",
    formTab: "ਸ਼ਿਕਾਇਤ ਦਰਜ ਕਰੋ / ਆਵਾਜ਼ ਅਤੇ ਲਿਖਤ",
    budgetTab: "ਬਜਟ ਅਤੇ ਸਮਾਂ ਸੀਮਾ ਟਰੈਕਰ",
    recommendationsTab: "ਨਾਗਰਿਕ ਤਜਵੀਜ਼ਾਂ ਅਤੇ ਵੋਟਾਂ",
    categories: {
      roads: "ਸੜਕਾਂ ਅਤੇ ਪੁਲ",
      hospitals: "ਹਸਪਤਾਲ ਅਤੇ ਸਿਹਤ ਸੇਵਾਵਾਂ",
      schools: "ਸਕੂਲ ਅਤੇ ਸਿੱਖਿਆ",
      water_drainage: "ਜਲ ਸਪਲਾਈ ਅਤੇ ਸੀਵਰੇਜ",
      electricity: "ਬਿਜਲੀ ਅਤੇ ਸਟਰੀਟ ਲਾਈਟਾਂ",
      sanitation: "ਸਫ਼ਾਈ ਅਤੇ ਕੂੜਾ ਪ੍ਰਬੰਧਨ",
      transport: "ਜਨਤਕ ਆਵਾਜਾਈ",
      public_safety: "ਜਨਤਕ ਸੁਰੱਖਿਆ",
      environment: "ਵਾਤਾਵਰਣ ਅਤੇ ਪਾਰਕ"
    }
  },
  as: {
    appName: "জন সহায়ক",
    appNativeBadge: "জন সহায়ক",
    tagline: "এআই-চালিত নাগৰিক অভিযোগ নিবাৰণ আৰু জনদাবী মঞ্চ",
    complaintTitle: "নাগৰিক সমস্যা / অভিযোগ",
    complaintSubtitle: "ভগা বাট-পথ, চিকিৎসালয়ত ঔষধৰ নাটনি, খোৱাপানীৰ সমস্যা, বিদ্যুৎ কৰ্তন দাখিল কৰক।",
    proposalTitle: "নাগৰিক উন্নয়ন প্ৰস্তাৱনা",
    proposalSubtitle: "অঞ্চলৰ বিকাশ: নতুন উপস্বাস্থ্য কেন্দ্ৰ, পথৰ পোহৰ, পুথিভঁৰালৰ পৰামৰ্শ দিয়ক।",
    dashboardTab: "প্ৰত্যক্ষ জনদাবী ডেচবৰ্ড",
    formTab: "অভিযোগ দাখিল কৰক / মাত আৰু পাঠ",
    budgetTab: "বাজেট আৰু সময়সীমা ট্ৰেকাৰ",
    recommendationsTab: "নাগৰিক প্ৰস্তাৱ আৰু ভোট",
    categories: {
      roads: "পথ আৰু দলং",
      hospitals: "চিকিৎসালয় আৰু স্বাস্থ্য সেৱা",
      schools: "বিদ্যালয় আৰু শিক্ষা",
      water_drainage: "জল যোগান আৰু নলা-নৰ্দমা",
      electricity: "বিদ্যুৎ আৰু পথৰ পোহৰ",
      sanitation: "পৰিষ্কাৰ-পৰিচ্ছন্নতা আৰু আৱৰ্জনা ব্যৱস্থাপনা",
      transport: "ৰাজহুৱা পৰিবহণ",
      public_safety: "ৰাজহুৱা নিৰাপত্তা",
      environment: "পৰিৱেশ আৰু উদ্যান"
    }
  },
  ur: {
    appName: "جن سہایک",
    appNativeBadge: "جن سہایک",
    tagline: "مصنوعی ذہانت سے چلنے والا شہری شکایات اور عوامی مطالبات کا پلیٹ فارم",
    complaintTitle: "شہری مسئلہ / شکایت",
    complaintSubtitle: "ٹوٹی سڑکیں، ہسپتال میں ادویات کی کمی، پینے کا پانی، بجلی کی لوڈ شیڈنگ درج کریں۔",
    proposalTitle: "شہری ترقیاتی تجویز",
    proposalSubtitle: "علاقائی ترقی: نیا ہیلتھ سینٹر، اسٹریٹ لائٹس، پبلک لائبریری تجویز کریں۔",
    dashboardTab: "براہ راست عوامی طلب ڈیش بورڈ",
    formTab: "شکایت درج کریں / آواز اور متن",
    budgetTab: "بجٹ اور ٹائم لائن ٹریکر",
    recommendationsTab: "شہری تجاویز اور ووٹ",
    categories: {
      roads: "سڑکیں اور پل",
      hospitals: "ہسپتال اور صحت کی خدمات",
      schools: "اسکول اور تعلیم",
      water_drainage: "پانی کی فراہمی اور نکاسی آب",
      electricity: "بجلی اور اسٹریٹ لائٹس",
      sanitation: "صفائی اور کچرے کا انتظام",
      transport: "عوامی ٹرانسپورٹ",
      public_safety: "عوامی تحفظ",
      environment: "ماحولیات اور پارکس"
    }
  }
};

export function getTranslation(langCode: string): AppTranslation {
  return STATE_TRANSLATIONS[langCode] || STATE_TRANSLATIONS['en'];
}

export function getCategoryNativeName(categoryKey: string, langCode: string): string {
  const trans = getTranslation(langCode);
  return (trans.categories as any)?.[categoryKey] || (STATE_TRANSLATIONS['en'].categories as any)?.[categoryKey] || categoryKey;
}
