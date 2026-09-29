import React, { useState, useRef, useEffect } from 'react';
import { 
  Mic, 
  Square, 
  RotateCcw, 
  Volume2, 
  Languages, 
  Sparkles, 
  CheckCircle2, 
  AlertCircle,
  HelpCircle,
  AudioWaveform
} from 'lucide-react';
import { transcribeAudioWithAI } from '../services/aiService';
import { ALL_INDIAN_STATE_LANGUAGES, IndianLanguage } from '../data/indianLanguages';

interface CivicVoiceRecorderProps {
  onTranscriptReady: (transcript: string, detectedLang?: string) => void;
  selectedLanguage: string;
}

export const CivicVoiceRecorder: React.FC<CivicVoiceRecorderProps> = ({
  onTranscriptReady,
  selectedLanguage
}) => {
  const [isRecording, setIsRecording] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [recordedBlob, setRecordedBlob] = useState<Blob | null>(null);
  const [recordingSeconds, setRecordingSeconds] = useState(0);
  const [liveTranscript, setLiveTranscript] = useState('');
  const [voiceLang, setVoiceLang] = useState('hi-IN');
  const [selectedRegionFilter, setSelectedRegionFilter] = useState<string>('All');
  const [isProcessingAI, setIsProcessingAI] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const recognitionRef = useRef<any>(null);
  const timerRef = useRef<any>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (mediaRecorderRef.current && isRecording) {
        mediaRecorderRef.current.stop();
      }
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, [isRecording]);

  const startRecording = async () => {
    setErrorMsg(null);
    setAudioUrl(null);
    setRecordedBlob(null);
    setLiveTranscript('');
    audioChunksRef.current = [];

    // Check SpeechRecognition support
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      try {
        const recognition = new SpeechRecognition();
        recognition.continuous = true;
        recognition.interimResults = true;
        recognition.lang = voiceLang;

        recognition.onresult = (event: any) => {
          let current = '';
          for (let i = 0; i < event.results.length; ++i) {
            current += event.results[i][0].transcript;
          }
          setLiveTranscript(current);
        };

        recognition.onerror = (e: any) => {
          console.warn('SpeechRecognition error:', e);
        };

        recognition.start();
        recognitionRef.current = recognition;
      } catch (e) {
        console.warn('SpeechRecognition start failed:', e);
      }
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        const url = URL.createObjectURL(blob);
        setAudioUrl(url);
        setRecordedBlob(blob);

        // Stop all audio tracks
        stream.getTracks().forEach((track) => track.stop());
      };

      mediaRecorder.start(250);
      setIsRecording(true);
      setRecordingSeconds(0);

      timerRef.current = setInterval(() => {
        setRecordingSeconds((prev) => prev + 1);
      }, 1000);
    } catch (err: any) {
      console.error('Microphone access denied or unavailable:', err);
      setErrorMsg('Microphone access not available or permitted. You can type or use 1-click voice presets below.');
      setIsRecording(false);
    }
  };

  const stopRecording = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
    }
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
    setIsRecording(false);

    // If speech was recognized, auto-propagate to form immediately
    if (liveTranscript.trim()) {
      onTranscriptReady(liveTranscript, voiceLang);
    }
  };

  const handleUseTranscript = () => {
    if (liveTranscript.trim()) {
      onTranscriptReady(liveTranscript, voiceLang);
    } else {
      setErrorMsg('No speech detected yet. Please speak into the mic or select a sample voice prompt.');
    }
  };

  const handleProcessVoiceWithAI = async () => {
    if (!recordedBlob && !liveTranscript) {
      setErrorMsg('Please record voice first.');
      return;
    }

    setIsProcessingAI(true);
    setErrorMsg(null);

    try {
      if (liveTranscript.trim()) {
        onTranscriptReady(liveTranscript, voiceLang);
      } else if (recordedBlob) {
        // Convert blob to base64
        const reader = new FileReader();
        reader.readAsDataURL(recordedBlob);
        reader.onloadend = async () => {
          const base64Audio = reader.result as string;
          const result = await transcribeAudioWithAI(base64Audio, 'audio/webm', voiceLang);
          onTranscriptReady(result.transcript || 'Voice complaint submitted.', result.detectedLanguage);
        };
      }
    } catch (e: any) {
      console.error('Error processing audio:', e);
      setErrorMsg('Could not transcribe audio via AI. You can still submit the text directly.');
    } finally {
      setIsProcessingAI(false);
    }
  };

  const handleSelectPreset = (preset: { lang: string; text: string; label?: string }) => {
    setVoiceLang(preset.lang);
    setLiveTranscript(preset.text);
    onTranscriptReady(preset.text, preset.lang);
  };

  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const rem = secs % 60;
    return `${mins.toString().padStart(2, '0')}:${rem.toString().padStart(2, '0')}`;
  };

  return (
    <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 sm:p-5 space-y-4">
      {/* Top Controls: Language and Status */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Languages className="w-4 h-4 text-amber-600" />
          <span className="text-xs font-bold text-slate-700 uppercase tracking-wide">
            Spoken Local Language:
          </span>
          <select
            value={voiceLang}
            onChange={(e) => setVoiceLang(e.target.value)}
            disabled={isRecording}
            className="text-xs bg-white border border-slate-300 rounded-lg px-2.5 py-1 text-slate-800 font-medium focus:ring-2 focus:ring-amber-500 outline-hidden max-w-[280px]"
          >
            {ALL_INDIAN_STATE_LANGUAGES.map((l) => (
              <option key={l.code} value={l.speechCode}>
                {l.native} ({l.label}) — {l.region}
              </option>
            ))}
          </select>
        </div>

        {isRecording && (
          <div className="flex items-center gap-2 text-xs font-semibold text-rose-600 bg-rose-50 px-2.5 py-1 rounded-full border border-rose-200">
            <span className="w-2 h-2 rounded-full bg-rose-600 animate-ping"></span>
            <span>Recording Voice ({formatTime(recordingSeconds)})</span>
          </div>
        )}
      </div>

      {/* Recording Waveform & Mic Button Center */}
      <div className="flex flex-col items-center justify-center p-6 bg-white border border-slate-200 rounded-xl shadow-2xs">
        {/* Animated Visualizer Bars */}
        <div className="h-10 flex items-center gap-1.5 mb-4">
          {[...Array(16)].map((_, i) => (
            <div
              key={i}
              className={`w-1.5 rounded-full transition-all duration-150 ${
                isRecording
                  ? 'bg-amber-500 animate-pulse'
                  : 'bg-slate-200'
              }`}
              style={{
                height: isRecording 
                  ? `${Math.max(12, ((i * 7 + recordingSeconds * 13) % 36) + 6)}px`
                  : '8px'
              }}
            />
          ))}
        </div>

        {/* Start / Stop Button */}
        {!isRecording ? (
          <button
            type="button"
            onClick={startRecording}
            className="flex items-center gap-2.5 px-6 py-3 bg-linear-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white font-bold text-sm rounded-full shadow-md shadow-amber-600/30 transition transform active:scale-95 cursor-pointer"
          >
            <Mic className="w-5 h-5" />
            <span>Tap to Speak Complaint in State Mother Tongue</span>
          </button>
        ) : (
          <button
            type="button"
            onClick={stopRecording}
            className="flex items-center gap-2.5 px-6 py-3 bg-rose-600 hover:bg-rose-700 text-white font-bold text-sm rounded-full shadow-md shadow-rose-600/30 transition animate-pulse cursor-pointer"
          >
            <Square className="w-5 h-5 fill-current" />
            <span>Stop Recording ({formatTime(recordingSeconds)})</span>
          </button>
        )}

        <p className="mt-3 text-[11px] text-slate-500 text-center max-w-md">
          Speak in any of India’s 22+ official state languages (Hindi, Telugu, Tamil, Marathi, Bengali, Kannada, Gujarati, Malayalam, Odia, Punjabi, Assamese, Urdu, etc.). Speech is transcribed and processed in real time.
        </p>
      </div>

      {/* Audio Playback if Recorded */}
      {audioUrl && (
        <div className="flex items-center gap-3 bg-white p-3 rounded-lg border border-slate-200">
          <Volume2 className="w-4 h-4 text-slate-600 shrink-0" />
          <audio src={audioUrl} controls className="w-full h-8" />
          <button
            type="button"
            onClick={startRecording}
            title="Re-record"
            className="p-1.5 text-slate-500 hover:text-slate-800 rounded-md hover:bg-slate-100"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Live Transcript Box */}
      {liveTranscript && (
        <div className="bg-amber-50/60 border border-amber-200 rounded-xl p-3.5 space-y-2">
          <div className="flex items-center justify-between text-xs font-semibold text-amber-900">
            <span className="flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              Recognized Speech (Live Transcription):
            </span>
            <span className="text-[11px] text-amber-700">{liveTranscript.length} characters</span>
          </div>
          <div className="text-sm text-slate-800 bg-white p-2.5 rounded-lg border border-amber-200 font-medium leading-relaxed max-h-32 overflow-y-auto">
            "{liveTranscript}"
          </div>

          <div className="flex flex-wrap items-center justify-end gap-2 pt-1">
            <button
              type="button"
              onClick={handleUseTranscript}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-600 hover:bg-amber-700 text-white rounded-lg text-xs font-bold shadow-xs transition cursor-pointer"
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Apply Transcript to Complaint Form</span>
            </button>
          </div>
        </div>
      )}

      {errorMsg && (
        <div className="p-2.5 rounded-lg bg-rose-50 border border-rose-200 text-xs text-rose-700 flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* Preset State Language Voice Samples */}
      <div className="pt-3 border-t border-slate-200 space-y-2.5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex items-center gap-1.5 text-[11px] font-bold text-slate-700">
            <HelpCircle className="w-3.5 h-3.5 text-amber-600" />
            <span>Test Real-World Voice Samples from Indian States:</span>
          </div>

          {/* Region Tabs */}
          <div className="flex items-center gap-1 overflow-x-auto no-scrollbar py-0.5">
            {['All', 'North', 'South', 'East', 'West', 'Northeast'].map((r) => (
              <button
                key={r}
                type="button"
                onClick={() => setSelectedRegionFilter(r)}
                className={`text-[10px] font-bold px-2 py-0.5 rounded-md transition cursor-pointer ${
                  selectedRegionFilter === r
                    ? 'bg-amber-600 text-white shadow-2xs'
                    : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
                }`}
              >
                {r}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 max-h-64 overflow-y-auto pr-1">
          {ALL_INDIAN_STATE_LANGUAGES
            .filter((lang) => 
              lang.sampleVoicePrompt && 
              (selectedRegionFilter === 'All' || lang.region === selectedRegionFilter || (selectedRegionFilter === 'North' && lang.region === 'Pan-India'))
            )
            .map((lang) => {
              const sample = lang.sampleVoicePrompt!;
              return (
                <button
                  key={lang.code}
                  type="button"
                  onClick={() => {
                    setVoiceLang(lang.speechCode);
                    setLiveTranscript(sample.text);
                    onTranscriptReady(sample.text, lang.speechCode);
                  }}
                  className="text-left p-2.5 rounded-lg bg-white hover:bg-amber-50/80 border border-slate-200 hover:border-amber-300 text-xs text-slate-700 hover:text-slate-900 transition flex flex-col gap-1 shadow-2xs group cursor-pointer"
                >
                  <div className="flex items-center justify-between gap-1">
                    <span className="font-bold text-slate-900 group-hover:text-amber-800 text-[11px] truncate">
                      {lang.native} ({lang.label})
                    </span>
                    <span className="text-[9px] bg-slate-100 text-slate-600 px-1.5 py-0.2 rounded font-semibold shrink-0">
                      {lang.region}
                    </span>
                  </div>
                  <div className="text-[10px] text-slate-500 font-medium line-clamp-1">
                    {lang.statesCovered.split(',').slice(0, 2).join(',')}
                  </div>
                  <div className="text-[11px] text-slate-800 font-medium line-clamp-2 italic bg-slate-50 p-1.5 rounded border border-slate-100">
                    "{sample.text}"
                  </div>
                </button>
              );
            })}
        </div>
      </div>
    </div>
  );
};
