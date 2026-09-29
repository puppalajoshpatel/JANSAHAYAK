import express from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

app.use(express.json({ limit: '25mb' }));

// Initialize Google GenAI
const apiKey = process.env.GEMINI_API_KEY || '';
const ai = apiKey ? new GoogleGenAI() : null;

// Health endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    hasGeminiKey: !!apiKey
  });
});

// AI Complaint & Recommendation Analysis Endpoint
app.post('/api/ai/analyze-complaint', async (req, res) => {
  try {
    const { text, language = 'English', type = 'complaint', location = {} } = req.body;

    if (!text || typeof text !== 'string' || text.trim().length === 0) {
      return res.status(400).json({ error: 'Text content is required' });
    }

    if (!ai) {
      // Fallback response if no API key is provided
      return res.json(getLocalFallbackAnalysis(text, type, location));
    }

    const systemPrompt = `You are the Official Indian GovTech Civic Grievance & Development Intelligence System (JanVichar / CPGRAMS 3.0).
Analyze the citizen input submitted in any Indian language or English.
Input Details:
- Type: ${type === 'complaint' ? 'Citizen Grievance / Complaint' : 'Citizen Development Recommendation'}
- Stated Language: ${language}
- Location context: State: ${location.state || 'India'}, District: ${location.district || 'General'}, Ward/Body: ${location.localBodyName || 'Urban Local Body'}
- Raw Citizen Submission: """${text}"""

Extract and respond strictly with valid JSON conforming to this structure:
{
  "category": "roads" | "hospitals" | "schools" | "water_drainage" | "electricity" | "sanitation" | "transport" | "public_safety" | "environment",
  "subCategory": "string (e.g., Pothole Repair, Emergency Doctor Shortage, Drinking Water Contamination, Transformer Overload, High-density Solar Lighting)",
  "title": "A crisp, authoritative official headline in English (max 12 words)",
  "summary": "A clean 2-sentence formal administrative summary",
  "detectedLanguage": "The language detected (e.g. Hindi, Tamil, Telugu, Marathi, English, Bengali, etc.)",
  "translatedEnglishSummary": "Direct faithful English translation if input was in an Indian regional language, otherwise refined summary",
  "demandTier": "high" | "mid" | "low",
  "civicDemandGravityScore": number (1 to 100, scientific priority index combining public safety, vital infrastructure weight and citizen pain),
  "civicPriorityIndex": number (1 to 100, matching the gravity index),
  "verifiedCitizenEstimate": number (realistic volume of affected community co-signers, between 40 and 1500),
  "estimatedAffectedPer100": number (legacy field for backward compatibility),
  "urgencyScore": number (1 to 100, where 90+ is life-critical/hazard, 60-89 is severe community pain, <60 is planned maintenance),
  "recommendedDepartment": "Official Indian Department (e.g., Public Works Department (PWD), Municipal Health Society, Water Supply & Sewerage Board, State Discom / Power Corp, Directorate of School Education)",
  "applicableGovScheme": "Relevant National / State Mission (e.g., PMGSY, AMRUT 2.0, National Health Mission (NHM), Samagra Shiksha, Swachh Bharat Urban 2.0, Smart Cities Mission, Jal Jeevan Mission, RDSS)",
  "estimatedBudgetRange": "e.g., ₹25 Lakhs - ₹60 Lakhs, or ₹1.5 Cr - ₹3 Cr",
  "keyActionPoints": ["Array of 3 prioritized administrative steps for the nodal officer"],
  "slaDaysRecommended": number (e.g., 7 for contamination, 14 for road potholes, 28 for major civil works)
}`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: systemPrompt,
      config: {
        responseMimeType: 'application/json',
      }
    });

    const responseText = response.text || '';
    const parsed = JSON.parse(responseText);
    return res.json(parsed);
  } catch (error: any) {
    console.error('Gemini Analysis Error:', error);
    // Graceful fallback to heuristic classification
    const { text, type, location } = req.body;
    return res.json(getLocalFallbackAnalysis(text || '', type || 'complaint', location || {}));
  }
});

// Voice Audio transcription & local language translation
app.post('/api/ai/transcribe-voice', async (req, res) => {
  try {
    const { audioBase64, mimeType = 'audio/webm', languageHint = 'hi-IN' } = req.body;

    if (!audioBase64) {
      return res.status(400).json({ error: 'Audio data is required' });
    }

    if (!ai) {
      return res.json({
        transcript: "Voice complaint received (Audio recorded successfully).",
        detectedLanguage: languageHint,
        confidence: 0.95
      });
    }

    const prompt = `Transcribe this citizen voice audio message accurately. The citizen may be speaking Hindi, Tamil, Telugu, Marathi, Bengali, Kannada, or Indian English describing a civic problem (roads, hospitals, schools, water, drainage, electricity, sanitation). Return JSON:
{
  "transcript": "Exact verbatim transcription in original language script",
  "englishTranslation": "Faithful English translation",
  "detectedLanguage": "Identified language name",
  "sentiment": "Urgent" | "Concerned" | "Constructive"
}`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: [
        {
          role: 'user',
          parts: [
            {
              inlineData: {
                mimeType: mimeType,
                data: audioBase64.replace(/^data:audio\/\w+;base64,/, '')
              }
            },
            {
              text: prompt
            }
          ]
        }
      ],
      config: {
        responseMimeType: 'application/json'
      }
    });

    const parsed = JSON.parse(response.text || '{}');
    return res.json(parsed);
  } catch (error: any) {
    console.error('Voice Transcribe Error:', error);
    return res.json({
      transcript: "Voice recording captured. You may review and refine the text details below.",
      detectedLanguage: "Indian Dialect",
      confidence: 0.88
    });
  }
});

// Heuristic fallback for offline/no-key states
function getLocalFallbackAnalysis(rawText: string, type: string, location: any) {
  const text = (rawText || '').toLowerCase();
  
  let category = 'roads';
  let subCategory = 'Road Repair & Resurfacing';
  let urgency = 75;
  let demandTier: 'high' | 'mid' | 'low' = 'mid';
  let estimatedAffectedPer100 = 34;
  let department = 'Public Works Department (PWD)';
  let scheme = 'Urban Infrastructure Revamp Scheme (UIRS)';
  let budgetRange = '₹45 Lakhs - ₹1.2 Crores';
  let slaDays = 21;

  if (text.includes('hospital') || text.includes('doctor') || text.includes('medicine') || text.includes('nurse') || text.includes('clinic') || text.includes('ambulance') || text.includes('इलाज') || text.includes('दवा') || text.includes('अस्पताल')) {
    category = 'hospitals';
    subCategory = 'Healthcare Staff & Medicine Supply';
    department = 'Chief Medical Officer (CMO) / District Health Society';
    scheme = 'National Health Mission (NHM)';
    urgency = 90;
    demandTier = 'high';
    estimatedAffectedPer100 = 46;
    budgetRange = '₹60 Lakhs - ₹2.5 Crores';
    slaDays = 14;
  } else if (text.includes('school') || text.includes('teacher') || text.includes('desk') || text.includes('classroom') || text.includes('student') || text.includes('विद्या') || text.includes('स्कूल') || text.includes('शिक्षा')) {
    category = 'schools';
    subCategory = 'School Infrastructure & Learning Facilities';
    department = 'Department of School Education & Literacy';
    scheme = 'Samagra Shiksha Abhiyan';
    urgency = 72;
    demandTier = 'mid';
    estimatedAffectedPer100 = 28;
    budgetRange = '₹20 Lakhs - ₹80 Lakhs';
    slaDays = 28;
  } else if (text.includes('water') || text.includes('drain') || text.includes('sewage') || text.includes('pipe') || text.includes('leak') || text.includes('flood') || text.includes('पानी') || text.includes('नाली') || text.includes('जल')) {
    category = 'water_drainage';
    subCategory = 'Drinking Water Supply & Drainage Network';
    department = 'Jal Sansthan / Municipal Water Supply & Sewerage Board';
    scheme = 'Jal Jeevan Mission (Urban) / AMRUT 2.0';
    urgency = 92;
    demandTier = 'high';
    estimatedAffectedPer100 = 54;
    budgetRange = '₹35 Lakhs - ₹1.8 Crores';
    slaDays = 7;
  } else if (text.includes('electric') || text.includes('light') || text.includes('power') || text.includes('transformer') || text.includes('outage') || text.includes('बिजली') || text.includes('पोल')) {
    category = 'electricity';
    subCategory = 'Power Distribution & Street Lighting';
    department = 'State Electricity Distribution Company (DISCOM)';
    scheme = 'Revamped Distribution Sector Scheme (RDSS)';
    urgency = 68;
    demandTier = 'mid';
    estimatedAffectedPer100 = 22;
    budgetRange = '₹15 Lakhs - ₹45 Lakhs';
    slaDays = 10;
  } else if (text.includes('garbage') || text.includes('trash') || text.includes('waste') || text.includes('clean') || text.includes('dump') || text.includes('कचरा') || text.includes('सफाई')) {
    category = 'sanitation';
    subCategory = 'Solid Waste Management & Regular Collection';
    department = 'Municipal Solid Waste Management Cell';
    scheme = 'Swachh Bharat Mission (Urban 2.0)';
    urgency = 84;
    demandTier = 'high';
    estimatedAffectedPer100 = 48;
    budgetRange = '₹20 Lakhs - ₹75 Lakhs';
    slaDays = 5;
  } else if (text.includes('bus') || text.includes('traffic') || text.includes('auto') || text.includes('station') || text.includes('मेट्रो') || text.includes('बस')) {
    category = 'transport';
    subCategory = 'Public Transit & Commuter Connectivity';
    department = 'Regional Transport Authority / Municipal Transport Undertaking';
    scheme = 'PM-eBus Sewa / National Urban Transport Policy';
    urgency = 62;
    demandTier = 'mid';
    estimatedAffectedPer100 = 26;
    budgetRange = '₹80 Lakhs - ₹3.0 Crores';
    slaDays = 30;
  }

  const titleWords = rawText.trim().split(/\s+/).slice(0, 10).join(' ');
  const title = titleWords.length > 5 ? `${titleWords}...` : `Civic Grievance regarding ${subCategory}`;
  const cpiScore = Math.min(98, Math.max(30, Math.round(urgency * 0.95)));

  return {
    category,
    subCategory,
    title: type === 'development_recommendation' ? `Civic Development Proposal: ${subCategory}` : title,
    summary: `Citizen grievance reported regarding ${subCategory} in ${location.wardOrPanchayat || 'the locality'}. Urgent administrative intervention recommended.`,
    detectedLanguage: 'Detected from Text',
    translatedEnglishSummary: rawText,
    demandTier,
    civicDemandGravityScore: cpiScore,
    civicPriorityIndex: cpiScore,
    verifiedCitizenEstimate: Math.max(30, Math.round(cpiScore * 6.2)),
    estimatedAffectedPer100,
    urgencyScore: urgency,
    recommendedDepartment: department,
    applicableGovScheme: scheme,
    estimatedBudgetRange: budgetRange,
    keyActionPoints: [
      `Dispatch field inspection officer within ${Math.max(2, Math.floor(slaDays / 3))} days`,
      `Verify defect against departmental master plan & estimate cost`,
      `Commence redressal work under ${scheme}`
    ],
    slaDaysRecommended: slaDays
  };
}

// Vite integration
async function startServer() {
  const isProd = process.env.NODE_ENV === 'production';

  if (!isProd) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`JanVichar GovTech Server running at http://0.0.0.0:${PORT}`);
  });
}

startServer().catch(err => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
