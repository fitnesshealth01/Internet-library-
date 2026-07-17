import React, { useState, useEffect } from 'react';
import { Shield, Settings, Check, X, AlertTriangle } from 'lucide-react';

export default function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [consent, setConsent] = useState({
    necessary: true,
    analytics: true,
  });

  useEffect(() => {
    // Check if user has already made a choice
    const savedConsent = localStorage.getItem('user-cookie-consent');
    if (!savedConsent) {
      // Trigger banner entry after a small delay
      const timer = setTimeout(() => setShowBanner(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAcceptAll = () => {
    const preferences = { necessary: true, analytics: true };
    localStorage.setItem('user-cookie-consent', JSON.stringify(preferences));
    setConsent(preferences);
    setShowBanner(false);
  };

  const handleRejectOptional = () => {
    const preferences = { necessary: true, analytics: false };
    localStorage.setItem('user-cookie-consent', JSON.stringify(preferences));
    setConsent(preferences);
    setShowBanner(false);
  };

  const handleSaveCustom = () => {
    localStorage.setItem('user-cookie-consent', JSON.stringify(consent));
    setShowBanner(false);
    setShowSettings(false);
  };

  if (!showBanner) return null;

  return (
    <div 
      id="cookie-consent-bar"
      className="fixed bottom-6 left-6 right-6 md:left-auto md:max-w-md z-50 bg-[#0F0F12]/95 border border-zinc-800/80 rounded-2xl shadow-2xl backdrop-blur-xl p-5 text-zinc-300 font-sans text-xs flex flex-col gap-4 animate-slide-up"
    >
      {!showSettings ? (
        <>
          <div className="flex gap-3 items-start">
            <div className="p-2 bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 rounded-xl mt-0.5 shrink-0">
              <Shield className="h-4 w-4" />
            </div>
            <div className="space-y-1.5">
              <h4 className="text-sm font-bold text-white uppercase tracking-wider leading-none">Privacy &amp; Consent Hub</h4>
              <p className="text-zinc-400 leading-relaxed text-[11px]">
                To provide the highest quality content curation and track learning pathways, we utilize technical cookies and analytics metrics. Respecting your absolute privacy remains our guiding principle.
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row md:flex-col gap-2 pt-1">
            <div className="flex gap-2 w-full">
              <button
                onClick={handleAcceptAll}
                className="flex-1 py-2 px-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold transition text-center cursor-pointer border border-indigo-500/10 active:scale-98 uppercase tracking-widest text-[10px]"
              >
                Accept All
              </button>
              <button
                onClick={handleRejectOptional}
                className="flex-1 py-2 px-3 rounded-xl bg-zinc-900 hover:bg-zinc-850 text-zinc-300 font-semibold transition text-center cursor-pointer border border-zinc-800 active:scale-98 uppercase tracking-widest text-[10px]"
              >
                Essential Only
              </button>
            </div>
            <button
              onClick={() => setShowSettings(true)}
              className="w-full py-1.5 text-zinc-500 hover:text-zinc-300 font-medium transition flex items-center justify-center gap-1.5 cursor-pointer text-[10px] uppercase tracking-widest"
            >
              <Settings className="h-3 w-3" />
              Customize Consent
            </button>
          </div>
        </>
      ) : (
        <div className="space-y-4">
          <div className="flex items-center justify-between border-b border-zinc-800/80 pb-2">
            <span className="text-xs font-black uppercase tracking-widest text-white flex items-center gap-1.5">
              <Settings className="h-3.5 w-3.5 text-indigo-400" />
              Consent Customization
            </span>
            <button 
              onClick={() => setShowSettings(false)}
              className="p-1 text-zinc-500 hover:text-zinc-300 transition cursor-pointer"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>

          <div className="space-y-3">
            {/* Essential Cookies */}
            <div className="flex items-center justify-between gap-4 p-2.5 bg-zinc-950/30 border border-zinc-900 rounded-xl">
              <div>
                <p className="font-bold text-zinc-200">Necessary Systems</p>
                <p className="text-[10px] text-zinc-500 mt-0.5">Retains dark mode themes and viewport configurations.</p>
              </div>
              <span className="text-[10px] font-bold text-indigo-400 bg-indigo-500/10 border border-indigo-500/20 px-2 py-0.5 rounded-md uppercase tracking-wider shrink-0">
                Always On
              </span>
            </div>

            {/* Analytics Cookies */}
            <div className="flex items-center justify-between gap-4 p-2.5 bg-zinc-950/30 border border-zinc-900 rounded-xl">
              <div>
                <p className="font-bold text-zinc-200">Analytics &amp; Usage</p>
                <p className="text-[10px] text-zinc-500 mt-0.5">Captures general reading speeds and research pathway loops.</p>
              </div>
              <button
                onClick={() => setConsent(c => ({ ...c, analytics: !c.analytics }))}
                className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${consent.analytics ? 'bg-indigo-600' : 'bg-zinc-800'}`}
              >
                <span className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out ${consent.analytics ? 'translate-x-4' : 'translate-x-0'}`} />
              </button>
            </div>
          </div>

          <div className="flex gap-2 border-t border-zinc-800/60 pt-3">
            <button
              onClick={handleSaveCustom}
              className="flex-1 py-2 px-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold transition text-center cursor-pointer text-[10px] uppercase tracking-widest"
            >
              Apply Choices
            </button>
            <button
              onClick={() => setShowSettings(false)}
              className="py-2 px-3 rounded-xl border border-zinc-800 hover:bg-zinc-900 text-zinc-400 font-semibold transition text-center cursor-pointer text-[10px] uppercase tracking-widest"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
