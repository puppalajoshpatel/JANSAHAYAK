export interface IndianLanguage {
  code: string;
  speechCode: string;
  label: string;
  native: string;
  statesCovered: string;
  region: 'North' | 'South' | 'East' | 'West' | 'Northeast' | 'Central' | 'Pan-India';
  sampleVoicePrompt?: {
    category: string;
    label: string;
    text: string;
    translation: string;
  };
  civicKeywords?: {
    water?: string[];
    roads?: string[];
    hospital?: string[];
    school?: string[];
    electricity?: string[];
    sanitation?: string[];
  };
}

export const ALL_INDIAN_STATE_LANGUAGES: IndianLanguage[] = [
  {
    code: 'en',
    speechCode: 'en-IN',
    label: 'English (India)',
    native: 'English',
    statesCovered: 'Pan-India / Nagaland, Meghalaya, Mizoram, Chandigarh',
    region: 'Pan-India',
    sampleVoicePrompt: {
      category: 'water_drainage',
      label: 'English: Clogged Stormwater Canal (Drainage)',
      text: 'The main stormwater canal near the highway is completely choked with plastic waste and silt. During yesterday rain, dirty sewage water backed up into residential homes and commercial shops.',
      translation: 'Stormwater canal clogged with silt causing sewage flooding in homes and shops.'
    }
  },
  {
    code: 'hi',
    speechCode: 'hi-IN',
    label: 'Hindi',
    native: 'हिन्दी',
    statesCovered: 'UP, MP, Bihar, Rajasthan, Haryana, HP, Uttarakhand, Delhi, Chhattisgarh, Jharkhand',
    region: 'North',
    sampleVoicePrompt: {
      category: 'roads',
      label: 'हिन्दी: मुख्य मार्ग पर गहरे गड्ढे और दुर्घटना (सड़क)',
      text: 'हमारे वार्ड के मुख्य मार्ग पर पिछले एक महीने से बहुत गहरे गड्ढे हो गए हैं। स्ट्रीट लाइट भी बंद है जिससे रात में कई दोपहिया वाहन गिर चुके हैं। कृपया पीडब्ल्यूडी विभाग तुरंत डामरीकरण कराए।',
      translation: 'Deep potholes on main ward road with non-functioning streetlights causing two-wheeler accidents.'
    }
  },
  {
    code: 'te',
    speechCode: 'te-IN',
    label: 'Telugu',
    native: 'తెలుగు',
    statesCovered: 'Andhra Pradesh, Telangana, Puducherry (Yanam)',
    region: 'South',
    sampleVoicePrompt: {
      category: 'water_drainage',
      label: 'తెలుగు: తాగునీటి పైపులైన్ లీకేజీ (మంచినీరు)',
      text: 'మా కాలనీలో ప్రధాన తాగునీటి పైపులైన్ పగిలిపోయి వారం రోజులుగా మురుగునీరు కలుస్తోంది. తాగునీరు దుర్వాసన వస్తోంది, ప్రజలు అనారోగ్యం పాలవుతున్నారు. మున్సిపల్ అధికారులు తక్షణమే సరిచేయాలి.',
      translation: 'Drinking water pipeline ruptured for a week, mixing with sewage; municipal water board must repair immediately.'
    }
  },
  {
    code: 'ta',
    speechCode: 'ta-IN',
    label: 'Tamil',
    native: 'தமிழ்',
    statesCovered: 'Tamil Nadu, Puducherry',
    region: 'South',
    sampleVoicePrompt: {
      category: 'hospitals',
      label: 'தமிழ்: அரசு ஆரம்ப சுகாதார நிலையத்தில் மருத்துவர் பற்றாக்குறை (மருத்துவம்)',
      text: 'எங்கள் பகுதியில் உள்ள ஆரம்ப சுகாதார நிலையத்தில் மருத்துவர்கள் மற்றும் அவசர கால மருந்துகள் இல்லை. பாம்பு கடி மற்றும் பிரசவ சிகிச்சைக்கு 30 கி.மீ தூரம் செல்ல வேண்டியுள்ளது.',
      translation: 'Primary health centre lacks emergency doctors and anti-venom medicines; residents travel 30 km for emergency care.'
    }
  },
  {
    code: 'mr',
    speechCode: 'mr-IN',
    label: 'Marathi',
    native: 'मराठी',
    statesCovered: 'Maharashtra, Goa',
    region: 'West',
    sampleVoicePrompt: {
      category: 'schools',
      label: 'मराठी: जिल्हा परिषद प्राथमिक शाळेची पडकी इमारत (शिक्षण)',
      text: 'आमच्या गावातील जिल्हा परिषद शाळेच्या वर्गांचे छप्पर गळत आहे आणि भिंतींना भेगा पडल्या आहेत. मुलांच्या सुरक्षिततेसाठी नवीन वर्गखोल्या मंजूर कराव्यात.',
      translation: 'Zilla Parishad primary school building has leaking roof and cracked walls; new classrooms required for child safety.'
    }
  },
  {
    code: 'bn',
    speechCode: 'bn-IN',
    label: 'Bengali',
    native: 'বাংলা',
    statesCovered: 'West Bengal, Tripura, Assam (Barak Valley), A&N Islands',
    region: 'East',
    sampleVoicePrompt: {
      category: 'sanitation',
      label: 'বাংলা: খোলা নর্দমা ও আবর্জনা স্তূপ (নিকাশী ও বর্জ্য)',
      text: 'আমাদের ওয়ার্ডের বাজার এলাকায় ১০ দিন ধরে আবর্জনা পরিষ্কার করা হয়নি। খোলা নর্দমার জল রাস্তায় উপচে পড়ছে এবং ডেঙ্গু মশার উপদ্রব বৃদ্ধি পেয়েছে। পুরসভার দ্রুত হস্তক্ষেপ প্রয়োজন।',
      translation: 'Garbage uncollected for 10 days in market area; open drains overflowing causing severe dengue mosquito hazard.'
    }
  },
  {
    code: 'gu',
    speechCode: 'gu-IN',
    label: 'Gujarati',
    native: 'ગુજરાતી',
    statesCovered: 'Gujarat, Dadra & Nagar Haveli and Daman & Diu',
    region: 'West',
    sampleVoicePrompt: {
      category: 'electricity',
      label: 'ગુજરાતી: ખુલ્લા ટ્રાન્સફોર્મર અને વીજ વાયરનો ખતરો (વીજળી)',
      text: 'રહેણાંક વિસ્તારમાં વીજળીનું ટ્રાન્સફોર્મર ખુલ્લું પડ્યું છે અને જીવંત વાયરો લટકી રહ્યા છે. ચોમાસામાં શોર્ટ સર્કિટના કારણે જાનમાલનું મોટું નુકસાન થવાનો ભય છે.',
      translation: 'Open electrical distribution transformer with live hanging wires posing electrocution hazard in residential zone.'
    }
  },
  {
    code: 'kn',
    speechCode: 'kn-IN',
    label: 'Kannada',
    native: 'ಕನ್ನಡ',
    statesCovered: 'Karnataka',
    region: 'South',
    sampleVoicePrompt: {
      category: 'roads',
      label: 'ಕನ್ನಡ: ಮುಖ್ಯ ರಸ್ತೆಯ ಆಳವಾದ ಗುಂಡಿಗಳು ಮತ್ತು ಧೂಳು (ರಸ್ತೆಗಳು)',
      text: 'ನಮ್ಮ ಬಡಾವಣೆಯ ಮುಖ್ಯ ರಸ್ತೆಯಲ್ಲಿ ದೊಡ್ಡ ಗುಂಡಿಗಳು ಬಿದ್ದಿದ್ದು ವಾಹನ ಸಂಚಾರ ಅಸಾಧ್ಯವಾಗಿದೆ. ಶಾಲಾ ಮಕ್ಕಳು ಮತ್ತು ವೃದ್ಧರು ಪ್ರತಿದಿನ ತೊಂದರೆ ಅನುಭವಿಸುತ್ತಿದ್ದಾರೆ, ಬಿಬಿಎಂಪಿ ತಕ್ಷಣ ರಸ್ತೆ ಡಾಂಬರೀಕರಣ ಮಾಡಬೇಕು.',
      translation: 'Main colony road filled with deep craters making transit hazardous; municipal corporation must repave road.'
    }
  },
  {
    code: 'ml',
    speechCode: 'ml-IN',
    label: 'Malayalam',
    native: 'മലയാളം',
    statesCovered: 'Kerala, Lakshadweep, Puducherry (Mahe)',
    region: 'South',
    sampleVoicePrompt: {
      category: 'water_drainage',
      label: 'മലയാളം: കുടിവെള്ള വിതരണം നിലച്ചു, മലിനജല ഭീഷണി (ജലവിതരണം)',
      text: 'കഴിഞ്ഞ രണ്ടാഴ്ചയായി പഞ്ചായത്തിൽ ശുദ്ധജല വിതരണം തടസ്സപ്പെട്ടിരിക്കുകയാണ്. കിണറുകളിൽ മലിനജലം കലർന്നതിനാൽ നാട്ടുകാർക്ക് പകർച്ചവ്യാധി സാധ്യതയുണ്ട്. വാട്ടർ അതോറിറ്റി ഉടൻ പരിഹാരം കാണണം.',
      translation: 'Drinking water supply disrupted for two weeks; well water contaminated, requiring urgent Water Authority action.'
    }
  },
  {
    code: 'or',
    speechCode: 'or-IN',
    label: 'Odia',
    native: 'ଓଡ଼ିଆ',
    statesCovered: 'Odisha',
    region: 'East',
    sampleVoicePrompt: {
      category: 'hospitals',
      label: 'ଓଡ଼ିଆ: ଗୋଷ୍ଠୀ ସ୍ୱାସ୍ଥ୍ୟ କେନ୍ଦ୍ରରେ ଆମ୍ବୁଲାନ୍ସ ଏବଂ ଡାକ୍ତର ଅଭାବ (ଚିକିତ୍ସା)',
      text: 'ଆମ ବ୍ଲକର ଗୋଷ୍ଠୀ ସ୍ୱାସ୍ଥ୍ୟ କେନ୍ଦ୍ରରେ ନିୟମିତ ଡାକ୍ତର ଉପସ୍ଥିତ ନାହାଁନ୍ତି ଏବଂ ଜରୁରୀକାଳୀନ ଆମ୍ବୁଲାନ୍ସ ସେବା ବନ୍ଦ ରହିଛି। ଗର୍ଭବତୀ ମହିଳାମାନେ ବହୁ ଅସୁବିଧାର ସମ୍ମୁଖୀନ ହେଉଛନ୍ତି।',
      translation: 'Community health centre lacks doctors and functional ambulance service; emergency patients facing severe hardship.'
    }
  },
  {
    code: 'pa',
    speechCode: 'pa-IN',
    label: 'Punjabi',
    native: 'ਪੰਜਾਬੀ',
    statesCovered: 'Punjab, Chandigarh, Haryana, Delhi',
    region: 'North',
    sampleVoicePrompt: {
      category: 'water_drainage',
      label: 'ਪੰਜਾਬੀ: ਖੇਤਾਂ ਅਤੇ ਪਿੰਡ ਵਿੱਚ ਗੰਦੇ ਪਾਣੀ ਦੀ ਨਿਕਾਸੀ (ਨਿਕਾਸੀ ਪ੍ਰਣਾਲੀ)',
      text: 'ਸਾਡੇ ਪਿੰਡ ਦੇ ਛੱਪੜ ਦੀ ਸਫਾਈ ਨਾ ਹੋਣ ਕਾਰਨ ਗੰਦਾ ਪਾਣੀ ਗਲੀਆਂ ਵਿੱਚ ਭਰ ਗਿਆ ਹੈ ਅਤੇ ਘਰਾਂ ਦੀ ਨੀਂਹ ਵਿੱਚ ਜਾ ਰਿਹਾ ਹੈ। ਪੰਚਾਇਤ ਅਤੇ ਬੀਡੀਪੀਓ ਤੁਰੰਤ ਨਾਲੇ ਦੀ ਖੁਦਾਈ ਕਰਵਾਉਣ।',
      translation: 'Village pond overflow causing sewage water in streets and homes; BDPO must arrange drainage canal excavation.'
    }
  },
  {
    code: 'as',
    speechCode: 'as-IN',
    label: 'Assamese',
    native: 'অসমীয়া',
    statesCovered: 'Assam, Arunachal Pradesh border areas',
    region: 'Northeast',
    sampleVoicePrompt: {
      category: 'roads',
      label: 'অসমীয়া: বানপানীৰ পিছত ভগা বাঁহৰ দলং আৰু পথ (পথ আৰু দলং)',
      text: 'যোৱা বানপানীত আমাৰ গাঁৱৰ মূল পথ আৰু কালভাৰ্টটো সম্পূৰ্ণৰূপে উটি গৈছে। যাৰ ফলত ছাত্ৰ-ছাত্ৰী আৰু ৰোগীসকল যোগাযোগহীন হৈ পৰিছে। অতিশীঘ্ৰে পকী দলং নিৰ্মাণ কৰক।',
      translation: 'Culvert washed away during floods severing road connectivity; urgent bridge reconstruction needed.'
    }
  },
  {
    code: 'ur',
    speechCode: 'ur-IN',
    label: 'Urdu',
    native: 'اردو',
    statesCovered: 'Telangana, Uttar Pradesh, Bihar, Jammu & Kashmir, Delhi, Andhra Pradesh',
    region: 'Pan-India',
    sampleVoicePrompt: {
      category: 'sanitation',
      label: 'اردو: سیوریج لائن کا ابال اور گندگی کا ڈھیر (صفائی ستھرائی)',
      text: 'محلے کی پرانی سیوریج پائپ لائن پھٹ گئی ہے اور گندا پانی سڑک پر بہہ رہا ہے جس سے نمازیوں اور اسکول جانے والے بچوں کو شدید تکلیف ہے۔ میونسپل کارپوریشن فی الفور مرمت کرے۔',
      translation: 'Old sewerage pipeline burst causing foul wastewater on street; Municipal Corporation must repair immediately.'
    }
  },
  {
    code: 'mai',
    speechCode: 'hi-IN',
    label: 'Maithili',
    native: 'मैथिली',
    statesCovered: 'Bihar, Jharkhand',
    region: 'East',
    sampleVoicePrompt: {
      category: 'water_drainage',
      label: 'मैथिली: कमला नदी बाँध मरम्मत आ बाढ़ि सुरक्षा (जल संसाधन)',
      text: 'हमार गामक समीप नदीक बाँध कमजोर भऽ गेल अछि। वर्षा ऋतुमे कटानक भय सँ हजारो ग्रामीण सशंकित छथि। जल संसाधन विभाग तुरन्त बोरा आ बोल्डर सँ मरम्मत कराबय।',
      translation: 'River embankment weakened near village posing severe flood hazard; Water Resources Department must reinforce.'
    }
  },
  {
    code: 'kok',
    speechCode: 'kok-IN',
    label: 'Konkani',
    native: 'कोंकणी',
    statesCovered: 'Goa, Karnataka (Karwar, Mangaluru), Maharashtra',
    region: 'West',
    sampleVoicePrompt: {
      category: 'electricity',
      label: 'कोंकणी: पावसात सतत वीज गुल आनी पडिल्ली खांब (वीज)',
      text: 'आमच्या वाड्यांत वादळी वाऱ्याक लागून विजेचे दोन खांब मोडले आसात. तीन दिसां साकून वीज नासल्यान उदकाची समस्या गंभीर जाल्या. वीज खात्यान तातडीन खांब बदल्चे.',
      translation: 'Two electric poles damaged due to storm winds leaving village without electricity for 3 days; Electricity Dept must replace.'
    }
  },
  {
    code: 'ne',
    speechCode: 'ne-NP',
    label: 'Nepali',
    native: 'नेपाली',
    statesCovered: 'Sikkim, West Bengal (Darjeeling, Kalimpong), Assam',
    region: 'Northeast',
    sampleVoicePrompt: {
      category: 'roads',
      label: 'नेपाली: पहिरोले भत्किएको पहाडी बाटो (सडक पूर्वाधार)',
      text: 'पहिरोको कारण हाम्रो गाउँलाई जोड्ने मुख्य सडक आधा बगेको छ। आपतकालीन सवारी साधन पनि आउन सकेका छैनन्। पीडब्ल्यूडी विभागले तुरुन्त पर्खाल लगाएर बाटो खुलाओस्।',
      translation: 'Hill connecting road damaged by landslide blocking emergency vehicles; PWD must build retaining wall.'
    }
  },
  {
    code: 'ks',
    speechCode: 'ks-IN',
    label: 'Kashmiri',
    native: 'कॉशुर / كٲشُر',
    statesCovered: 'Jammu & Kashmir',
    region: 'North',
    sampleVoicePrompt: {
      category: 'electricity',
      label: 'कॉशुर: वंदस मंज़ बिजली ट्रांसफार्मर खराबी (बिजली विभाग)',
      text: 'असिंदिस मुहल्लस मंज़ गो बिजली ट्रांसफार्मर जलित। शदीद थुरि मंज़ छि लोकन वारिया तकलीफ गछान। पी.डी.डी विभागन पज़ि नय ट्रांसफार्मर जलद लगॉवुन।',
      translation: 'Electric transformer burnt out leaving neighbourhood without power in severe cold; PDD must replace transformer.'
    }
  },
  {
    code: 'doi',
    speechCode: 'hi-IN',
    label: 'Dogri',
    native: 'डोगरी',
    statesCovered: 'Jammu & Kashmir (Jammu Division), Himachal Pradesh',
    region: 'North',
    sampleVoicePrompt: {
      category: 'water_drainage',
      label: 'डोगरी: कुएं ते नलके च गंदा पानी (पीने दा पानी)',
      text: 'साढ़े पेंडू इलाके च सरकारी ट्यूबवेल दी मोटर सड़ोई ऐ ते लोकी गंदा पानी पीने आस्तै मजबूर न। जल शक्ति महकमे गी फौरन नई मोटर लानी चाहिदी ऐ।',
      translation: 'Tube-well motor burnt out forcing residents to drink untreated water; Jal Shakti Dept must install new pump.'
    }
  },
  {
    code: 'mni',
    speechCode: 'en-IN',
    label: 'Manipuri (Meitei)',
    native: 'মৈতৈলোন্ (Meitei)',
    statesCovered: 'Manipur, Assam border',
    region: 'Northeast',
    sampleVoicePrompt: {
      category: 'hospitals',
      label: 'মৈতৈলোন্: পিএইচসিতে লাইয়েংশঙগী ওজা অমসুং হিদাক ৱাৎপা (অনাব-লাইয়েং)',
      text: 'ঐখোয়গী লমদমগী পিএইচসি অসিদা দোক্তর অমসুং মরুওইবা হিদাক-লাংথকশিং ৱাৎলি। অনা-অয়েক মীওইশিংনা ইম্ফালদা চৎতুনা লাইয়েংনবগীদমক অৱাবা ফাওরি।',
      translation: 'Primary health sub-centre lacks attending doctor and basic medicines forcing patients to travel to district hospital.'
    }
  },
  {
    code: 'brx',
    speechCode: 'as-IN',
    label: 'Bodo',
    native: 'बड़ो (Bodo)',
    statesCovered: 'Assam (Bodoland Territorial Region)',
    region: 'Northeast',
    sampleVoicePrompt: {
      category: 'schools',
      label: 'बड़ो: फरायसालिनि न’ आरो लामा गाज्रि जानाय (फोरोंथाय)',
      text: 'जोंनि गामिनि एल.पि. फरायसालिनि न’आ गाज्रि जाबाय आरो लामायाव दै बाना जादों। गथ’फोरा फरायनो थांनो हायाखै। बि.टि.सि. सरकारा गोदान न’ लुना होनांगौ।',
      translation: 'Village LP school building dilapidated and access road submerged; BTC administration must reconstruct.'
    }
  },
  {
    code: 'sat',
    speechCode: 'hi-IN',
    label: 'Santali',
    native: 'ᱥᱟᱱᱛᱟᱲᱤ (Ol Chiki)',
    statesCovered: 'Jharkhand, West Bengal, Odisha, Bihar',
    region: 'East',
    sampleVoicePrompt: {
      category: 'water_drainage',
      label: 'ᱥᱟᱱᱛᱟᱲᱤ: ᱟᱛᱳ ᱨᱮ ᱰᱟᱠ ᱠᱩᱞᱤ ᱟᱨ ᱦᱮᱸᱰᱯᱟᱢᱯ ᱵᱟᱹᱲᱤᱡ (ᱫᱟᱜ ᱥᱩᱵᱤᱫᱷᱟ)',
      text: 'ᱟᱞᱮ ᱟᱛᱳ ᱨᱮᱭᱟᱜ ᱵᱟᱨᱭᱟ ᱦᱮᱸᱰᱯᱟᱢᱯ ᱠᱷᱚᱨᱟᱯ ᱟᱠᱟᱱᱟ᱾ ᱟᱭᱳ ᱦᱚᱲ ᱠᱚ ᱫᱟᱜ ᱟᱹᱜᱩ ᱞᱟᱹᱜᱤᱫ ᱵᱟᱨ ᱠᱤᱞᱳᱢᱤᱴᱟᱨ ᱪᱟᱞᱟᱜ ᱦᱩᱭᱩᱜ ᱠᱟᱱᱟ᱾ ᱥᱚᱨᱠᱟᱨ ᱩᱥᱟᱹᱨᱟ ᱡᱩᱛ ᱠᱟᱜ ᱢᱟ᱾',
      translation: 'Both village handpumps broken forcing women to walk 2 km for water; Drinking Water Dept must repair immediately.'
    }
  },
  {
    code: 'sd',
    speechCode: 'hi-IN',
    label: 'Sindhi',
    native: 'सिन्धी / سنڌي',
    statesCovered: 'Gujarat (Kutch), Maharashtra, Rajasthan, MP',
    region: 'West',
    sampleVoicePrompt: {
      category: 'sanitation',
      label: 'सिन्धी: बज़ार जे इलाके में कचरे जा ढेर (सफाई इंतज़ाम)',
      text: 'असांजे इलाके जे मुख्य बज़ार में हफ़्ते खां कचरो न खणियो वियो आहे। बदबू ऐं मच्छरन जे सबब दुकानदान ऐं गिराहकन खे भारी तकलीफ़ थी रही आहे।',
      translation: 'Garbage uncollected in main commercial market area causing foul smell and disease vectors.'
    }
  },
  {
    code: 'lus',
    speechCode: 'en-IN',
    label: 'Mizo',
    native: 'Mizo ṭawng',
    statesCovered: 'Mizoram',
    region: 'Northeast',
    sampleVoicePrompt: {
      category: 'water_drainage',
      label: 'Mizo: Tuikhur leh Tui Pipe Chhia (Tui Thianghlim)',
      text: 'Kan veng tui pipe a chhiat avangin kar hnih chhung tui connection a awm tawh lo. PHE Department-in hmanhmawh taka siamṭha tura ngen a ni.',
      translation: 'Water distribution pipe damaged leaving residential ward without supply for two weeks; PHE must fix.'
    }
  },
  {
    code: 'kha',
    speechCode: 'en-IN',
    label: 'Khasi & Garo',
    native: 'Khasi / A·chik',
    statesCovered: 'Meghalaya',
    region: 'Northeast',
    sampleVoicePrompt: {
      category: 'roads',
      label: 'Khasi: Ka Surok ba la Jot bad ki Pothole (Road Infrastructure)',
      text: 'Ka surok kaba pyniasoh ia ka shnong jong ngi bad ka market ka la jot bad bun ki thliew baheh. Ki kali kim lah shuh ban iaid, sngewbha maramot noh.',
      translation: 'Connecting road to regional market severely deteriorated with hazardous potholes preventing transport.'
    }
  },
  {
    code: 'sa',
    speechCode: 'hi-IN',
    label: 'Sanskrit',
    native: 'संस्कृतम्',
    statesCovered: 'Uttarakhand (Second Official), All India Classical',
    region: 'Pan-India',
    sampleVoicePrompt: {
      category: 'schools',
      label: 'संस्कृतम्: विद्यालये पुस्तकालयस्य आधारभूतसंरचनायाः च आवश्यकता',
      text: 'अस्माकं मण्डले संस्कृतमाध्यमिकविद्यालये पुस्तकालयस्य जलव्यवस्थायाः च अभावः वर्तते। सर्वकारेण छात्राणां हिताय शीघ्रं अनुदानं प्रदातव्यम्।',
      translation: 'Secondary school lacks library resources and drinking water facility; education department must sanction funds.'
    }
  }
];

export const REGIONS = ['All', 'North', 'South', 'East', 'West', 'Northeast', 'Central', 'Pan-India'] as const;

export function getLanguageByCode(code: string): IndianLanguage | undefined {
  return ALL_INDIAN_STATE_LANGUAGES.find(l => l.code === code || l.speechCode === code);
}
