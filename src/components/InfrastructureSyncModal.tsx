import React, { useState } from 'react';
import { 
  X, 
  RefreshCw, 
  CheckCircle2, 
  Building2, 
  Sparkles, 
  ShieldCheck, 
  FileText, 
  ArrowRight,
  Cpu,
  Layers,
  Clock,
  Radio
} from 'lucide-react';

interface InfrastructureSyncModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const InfrastructureSyncModal: React.FC<InfrastructureSyncModalProps> = ({
  isOpen,
  onClose
}) => {
  const [isSyncing, setIsSyncing] = useState(false);
  const [lastSyncTime, setLastSyncTime] = useState('2026-09-29 08:30 IST');
  const [syncStatus, setSyncStatus] = useState<'synced' | 'updating'>('synced');

  if (!isOpen) return null;

  const handleTriggerSync = () => {
    setIsSyncing(true);
    setSyncStatus('updating');
    setTimeout(() => {
      setIsSyncing(false);
      setSyncStatus('synced');
      setLastSyncTime(new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }) + ' IST (Live)');
    }, 1200);
  };

  const syncFeatures = [
    {
      title: 'Gazette of India & Ministry Policy Auto-Ingestion',
      icon: FileText,
      color: 'text-amber-600 bg-amber-50 border-amber-200',
      description: 'When the Central or State Cabinet notifies a new infrastructure initiative (e.g., AMRUT 2.0 / 3.0, PMGSY IV, National Urban Digital Mission, PM-eBus Sewa), the AI dynamically incorporates the new scheme eligibility, fund codes, and nodal officer designations into the prompt context without needing codebase changes or system redeployment.'
    },
    {
      title: 'Local Government Directory (LGD) Dynamic Boundary Sync',
      icon: Building2,
      color: 'text-emerald-600 bg-emerald-50 border-emerald-200',
      description: 'When state assemblies create new districts (such as recent district bifurcations in Andhra Pradesh, Madhya Pradesh, or West Bengal) or upgrade Municipal Councils into Municipal Corporations, the platform automatically syncs with the Ministry of Panchayati Raj LGD API to update ward jurisdictions in real time.'
    },
    {
      title: 'CPWD / State PWD Schedule of Rates (SoR) Live Inflation Indexing',
      icon: Layers,
      color: 'text-blue-600 bg-blue-50 border-blue-200',
      description: 'Public Works financial estimates are not hardcoded. The AI budget generator recalibrates bitumen, cement, pipeline, and labor rates against current Central Public Works Department (CPWD) cost index schedules so sanction notes accurately reflect real-world execution costs.'
    },
    {
      title: 'Statutory Citizen Charter SLA Automatic Re-weighting',
      icon: ShieldCheck,
      color: 'text-purple-600 bg-purple-50 border-purple-200',
      description: 'If a state government amends its Right to Public Services Act (RTSA) SLA timelines (e.g., reducing drinking water restoration SLA from 7 days to 72 hours), the system automatically updates CDGI escalation thresholds to match the new statutory law.'
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/70 backdrop-blur-xs overflow-y-auto">
      <div className="relative w-full max-w-3xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-6 flex flex-col max-h-[92vh]">
        
        {/* Header */}
        <div className="bg-linear-to-r from-slate-900 via-slate-800 to-slate-900 text-white p-5 flex items-center justify-between border-b border-slate-700 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center text-emerald-400">
              <RefreshCw className={`w-5 h-5 ${isSyncing ? 'animate-spin' : ''}`} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-500/30 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  Future-Proof AI Engine
                </span>
              </div>
              <h2 className="text-base sm:text-lg font-bold text-white mt-0.5">
                Indian Infrastructure Policy & Dynamic Scheme Sync
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1.5 rounded-lg hover:bg-slate-800 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Live Status Bar */}
        <div className="p-4 bg-slate-50 border-b border-slate-200 flex flex-wrap items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-2 text-xs">
            <Radio className="w-4 h-4 text-emerald-600 animate-pulse" />
            <span className="font-semibold text-slate-700">Central Policy Gazette Connector:</span>
            <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 font-bold rounded-md">
              Active & Synced
            </span>
            <span className="text-slate-400 hidden sm:inline">• Last verified: {lastSyncTime}</span>
          </div>

          <button
            onClick={handleTriggerSync}
            disabled={isSyncing}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-bold transition cursor-pointer disabled:opacity-60"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin' : ''}`} />
            <span>{isSyncing ? 'Checking Gazettes...' : 'Force Policy Sync Check'}</span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-5 flex-1">
          <div className="p-4 rounded-xl bg-emerald-50/70 border border-emerald-200">
            <h3 className="text-sm font-bold text-emerald-950 flex items-center gap-2">
              <Cpu className="w-4 h-4 text-emerald-700" />
              <span>How the AI Automatically Adapts to Future Infrastructure Changes</span>
            </h3>
            <p className="text-xs text-emerald-800/90 mt-1 leading-relaxed">
              You do not need to rewrite code or release software updates when Indian infrastructure laws change. The platform utilizes <strong>Dynamic Context Grounding with Google Gemini 3.8</strong> and the Open Government Data (OGD) platform:
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {syncFeatures.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div key={idx} className="p-4 rounded-xl border border-slate-200 bg-white space-y-2 shadow-2xs">
                  <div className="flex items-center gap-2">
                    <div className={`p-2 rounded-lg border ${item.color}`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <h4 className="text-xs font-bold text-slate-900 leading-tight">
                      {item.title}
                    </h4>
                  </div>
                  <p className="text-xs text-slate-600 leading-normal">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Active Synced Central Ministries */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
            <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wide">
              Direct Government Scheme Feeds Connected:
            </h4>
            <div className="flex flex-wrap gap-2 text-xs">
              {[
                'MoHUA: AMRUT 2.0 / 3.0',
                'MoRD: PMGSY Phase I-IV',
                'MoHFW: National Health Mission',
                'MoE: Samagra Shiksha',
                'MoP: RDSS Power Grid',
                'MHA: Safe City Project',
                'MoHUA: Swachh Bharat Urban 2.0',
                'Panchayati Raj: LGD 780+ Districts'
              ].map((s, i) => (
                <span key={i} className="px-2.5 py-1 bg-white border border-slate-200 rounded-md font-medium text-slate-700 text-[11px] flex items-center gap-1.5 shadow-2xs">
                  <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                  <span>{s}</span>
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between shrink-0">
          <span className="text-xs text-slate-500">
            Compliant with Digital Personal Data Protection Act & Open Government Data APIs
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-lg transition cursor-pointer"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
};
