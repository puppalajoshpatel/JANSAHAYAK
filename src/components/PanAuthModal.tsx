import React, { useState, useEffect } from 'react';
import { 
  X, 
  CreditCard, 
  KeyRound, 
  ShieldCheck, 
  CheckCircle2, 
  ArrowRight, 
  Smartphone, 
  RotateCcw,
  Sparkles,
  MapPin,
  Building
} from 'lucide-react';
import { CitizenProfile } from '../types';
import { INDIAN_STATES_DISTRICTS, DEMO_USER_PROFILE, getLocalBodiesForDistrict } from '../data/mockData';

interface PanAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (profile: CitizenProfile) => void;
}

export const PanAuthModal: React.FC<PanAuthModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const [step, setStep] = useState<'pan' | 'otp' | 'profile'>('pan');
  const [panNumber, setPanNumber] = useState('');
  const [name, setName] = useState('');
  const [selectedState, setSelectedState] = useState('Maharashtra');
  const [selectedDistrict, setSelectedDistrict] = useState('Pune');
  const [selectedLocalBody, setSelectedLocalBody] = useState('Pune Municipal Corporation (PMC)');
  const [ward, setWard] = useState('Ward 14 - Kothrud South');
  const [pincode, setPincode] = useState('411038');

  // OTP state
  const [generatedOtp, setGeneratedOtp] = useState('');
  const [enteredOtp, setEnteredOtp] = useState('');
  const [maskedMobile, setMaskedMobile] = useState('+91 98*** **789');
  const [timer, setTimer] = useState(60);
  const [isVerifying, setIsVerifying] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // PAN Regex: 5 letters, 4 digits, 1 letter
  const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;

  useEffect(() => {
    let interval: any = null;
    if (step === 'otp' && timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [step, timer]);

  if (!isOpen) return null;

  const handlePanChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 10);
    setPanNumber(val);
    setError(null);
  };

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!panRegex.test(panNumber)) {
      setError('Please enter a valid 10-character Indian PAN Card number (e.g. ABCDE1234F)');
      return;
    }

    // Generate random 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedOtp(otp);

    // Mock masked mobile derived from last digits of PAN
    const lastDigits = panNumber.charCodeAt(4) % 10;
    setMaskedMobile(`+91 98${lastDigits}${Math.floor(Math.random()*9)}* **${lastDigits}89`);

    setTimer(60);
    setEnteredOtp('');
    setError(null);
    setStep('otp');
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (enteredOtp.length !== 6) {
      setError('Please enter the full 6-digit OTP received on your PAN-linked mobile number.');
      return;
    }

    if (enteredOtp !== generatedOtp && enteredOtp !== '123456') {
      setError('Invalid OTP entered. Please check the code or click resend.');
      return;
    }

    setIsVerifying(true);
    setTimeout(() => {
      setIsVerifying(false);
      // Derive name if empty
      if (!name) {
        setName('Rajesh Sharma');
      }
      setStep('profile');
    }, 700);
  };

  const handleCompleteLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const finalProfile: CitizenProfile = {
      panNumber: panNumber.toUpperCase(),
      name: name || 'Indian Citizen',
      mobile: maskedMobile.replace('*** **', '45 6'),
      maskedMobile,
      state: selectedState,
      district: selectedDistrict,
      localBody: selectedLocalBody,
      ward: ward || 'Ward 1 - Central',
      pincode: pincode || '400001',
      isVerified: true,
      registeredOn: new Date().toISOString().split('T')[0]
    };

    onSuccess(finalProfile);
    onClose();
  };

  const handleLoadDemo = () => {
    onSuccess(DEMO_USER_PROFILE);
    onClose();
  };

  const availableDistricts = INDIAN_STATES_DISTRICTS[selectedState]?.districts || [];
  const availableLocalBodies = getLocalBodiesForDistrict(selectedState, selectedDistrict);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs">
      <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Modal Header */}
        <div className="bg-linear-to-r from-slate-900 to-slate-800 text-white p-5 flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-400/30 flex items-center justify-center text-amber-400 shrink-0">
              <CreditCard className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold flex items-center gap-2">
                <span>Citizen PAN Authentication</span>
                <span className="text-[10px] bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded border border-amber-400/30">
                  Income Tax Linked
                </span>
              </h2>
              <p className="text-xs text-slate-300">
                Secure Redressal Login via PAN & Mobile OTP
              </p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-700/50 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6">
          {/* Quick Demo Citizen Helper */}
          <div className="mb-5 p-3 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-between gap-3 text-xs">
            <div>
              <span className="font-semibold text-amber-900 block">Fast-Track Test Access</span>
              <span className="text-amber-700 text-[11px]">Instant sign in as verified citizen (Rajesh Sharma, Pune)</span>
            </div>
            <button
              type="button"
              onClick={handleLoadDemo}
              className="px-3 py-1.5 bg-amber-600 hover:bg-amber-700 text-white rounded-lg font-bold shadow-xs text-xs whitespace-nowrap transition cursor-pointer"
            >
              1-Click Demo
            </button>
          </div>

          {/* STEP 1: Enter PAN Number */}
          {step === 'pan' && (
            <form onSubmit={handleSendOtp} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Permanent Account Number (PAN Card)
                </label>
                <div className="relative">
                  <CreditCard className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    type="text"
                    value={panNumber}
                    onChange={handlePanChange}
                    placeholder="ABCDE1234F"
                    maxLength={10}
                    className="w-full pl-11 pr-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 font-mono font-bold tracking-widest text-base focus:bg-white focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-hidden transition"
                    autoFocus
                  />
                </div>
                <p className="mt-1.5 text-[11px] text-slate-500 flex items-center gap-1">
                  <span>Format: 5 letters, 4 digits, 1 letter (e.g., <strong>ABCDE1234F</strong>)</span>
                </p>
              </div>

              {error && (
                <div className="p-2.5 rounded-lg bg-red-50 border border-red-200 text-xs text-red-700">
                  {error}
                </div>
              )}

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={panNumber.length !== 10}
                  className="w-full py-2.5 px-4 bg-slate-900 hover:bg-slate-800 disabled:bg-slate-300 text-white font-semibold text-sm rounded-xl shadow-md transition flex items-center justify-center gap-2 cursor-pointer disabled:cursor-not-allowed"
                >
                  <span>Generate Mobile OTP</span>
                  <ArrowRight className="w-4 h-4 text-amber-400" />
                </button>
              </div>

              <div className="pt-2 border-t border-slate-100 flex items-center justify-center gap-2 text-[11px] text-slate-400">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Encrypted with National Identity & NSDL Gateway</span>
              </div>
            </form>
          )}

          {/* STEP 2: Enter OTP */}
          {step === 'otp' && (
            <form onSubmit={handleVerifyOtp} className="space-y-4">
              {/* Simulated SMS Notification Alert */}
              <div className="p-3.5 bg-emerald-50 border border-emerald-300 rounded-xl">
                <div className="flex items-start gap-2.5">
                  <Smartphone className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <div className="text-xs">
                    <div className="font-bold text-emerald-900">SMS OTP Sent Successfully!</div>
                    <div className="text-emerald-700 mt-0.5">
                      Sent to registered mobile linked with PAN <strong>{panNumber}</strong>: <span className="font-mono font-bold">{maskedMobile}</span>
                    </div>
                    {/* Simulated Display for rapid testing */}
                    <div className="mt-2 flex items-center gap-2 bg-white px-2.5 py-1.5 rounded-lg border border-emerald-200">
                      <span className="text-[11px] text-slate-500">Demo OTP:</span>
                      <span className="font-mono font-extrabold text-sm text-emerald-800 tracking-widest">{generatedOtp}</span>
                      <button
                        type="button"
                        onClick={() => setEnteredOtp(generatedOtp)}
                        className="ml-auto text-[11px] text-amber-700 font-bold hover:underline"
                      >
                        Auto-Fill OTP
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Enter 6-Digit Verification Code (OTP)
                </label>
                <div className="relative">
                  <KeyRound className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    type="text"
                    value={enteredOtp}
                    onChange={(e) => setEnteredOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                    placeholder="• • • • • •"
                    maxLength={6}
                    className="w-full pl-11 pr-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 font-mono font-bold tracking-widest text-center text-lg focus:bg-white focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-hidden transition"
                    autoFocus
                  />
                </div>
              </div>

              {error && (
                <div className="p-2.5 rounded-lg bg-red-50 border border-red-200 text-xs text-red-700">
                  {error}
                </div>
              )}

              <div className="flex items-center justify-between text-xs text-slate-500">
                <span>
                  Resend OTP in: <strong className="text-slate-800 font-mono">{timer}s</strong>
                </span>
                <button
                  type="button"
                  disabled={timer > 0}
                  onClick={() => {
                    const newOtp = Math.floor(100000 + Math.random() * 900000).toString();
                    setGeneratedOtp(newOtp);
                    setTimer(60);
                  }}
                  className="flex items-center gap-1 text-amber-700 hover:text-amber-800 font-semibold disabled:text-slate-400 disabled:cursor-not-allowed"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Resend</span>
                </button>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isVerifying || enteredOtp.length !== 6}
                  className="w-full py-2.5 px-4 bg-slate-900 hover:bg-slate-800 disabled:bg-slate-300 text-white font-semibold text-sm rounded-xl shadow-md transition flex items-center justify-center gap-2 cursor-pointer disabled:cursor-not-allowed"
                >
                  {isVerifying ? (
                    <span>Verifying PAN & OTP...</span>
                  ) : (
                    <>
                      <span>Verify & Continue</span>
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    </>
                  )}
                </button>
              </div>
            </form>
          )}

          {/* STEP 3: Confirm Profile & Location */}
          {step === 'profile' && (
            <form onSubmit={handleCompleteLogin} className="space-y-3.5">
              <div className="text-xs bg-slate-100 p-2.5 rounded-lg flex items-center justify-between">
                <div>
                  <span className="text-slate-500 block">Verified PAN</span>
                  <span className="font-mono font-bold text-slate-900">{panNumber}</span>
                </div>
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-100 text-emerald-800">
                  <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                  NSDL Verified
                </span>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Citizen Full Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Rajesh Sharma"
                  required
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 outline-hidden"
                />
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    State
                  </label>
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
                    className="w-full px-2.5 py-1.5 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 outline-hidden"
                  >
                    {Object.keys(INDIAN_STATES_DISTRICTS).map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    District
                  </label>
                  <select
                    value={selectedDistrict}
                    onChange={(e) => {
                      const d = e.target.value;
                      setSelectedDistrict(d);
                      const bodies = getLocalBodiesForDistrict(selectedState, d);
                      if (bodies.length > 0) setSelectedLocalBody(bodies[0]);
                    }}
                    className="w-full px-2.5 py-1.5 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 outline-hidden"
                  >
                    {availableDistricts.map((d) => (
                      <option key={d} value={d}>{d}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Municipal Corporation / Local Body
                </label>
                <select
                  value={selectedLocalBody}
                  onChange={(e) => setSelectedLocalBody(e.target.value)}
                  className="w-full px-2.5 py-1.5 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 outline-hidden"
                >
                  {availableLocalBodies.map((b) => (
                    <option key={b} value={b}>{b}</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Ward / Panchayat
                  </label>
                  <input
                    type="text"
                    value={ward}
                    onChange={(e) => setWard(e.target.value)}
                    placeholder="e.g. Ward 14 - Kothrud"
                    className="w-full px-2.5 py-1.5 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 outline-hidden"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    PIN Code
                  </label>
                  <input
                    type="text"
                    value={pincode}
                    onChange={(e) => setPincode(e.target.value.slice(0, 6))}
                    placeholder="411038"
                    maxLength={6}
                    className="w-full px-2.5 py-1.5 text-xs font-mono border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 outline-hidden"
                  />
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-2.5 px-4 bg-amber-600 hover:bg-amber-700 text-white font-semibold text-sm rounded-xl shadow-md transition flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Enter JanVichar Portal</span>
                  <CheckCircle2 className="w-4 h-4" />
                </button>
              </div>
            </form>
          )}

        </div>
      </div>
    </div>
  );
};
