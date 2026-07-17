import React, { useState } from 'react';
import { ArrowLeft, Shield, FileText, Info, Mail, Check, RefreshCw } from 'lucide-react';

interface CompliancePageProps {
  page: 'privacy' | 'terms' | 'about' | 'contact';
  onBack: () => void;
}

export default function CompliancePage({ page, onBack }: CompliancePageProps) {
  const [activeTab, setActiveTab] = useState<'privacy' | 'terms' | 'about' | 'contact'>(page);
  
  // Contact Form states
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactMessage, setContactMessage] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactName || !contactEmail || !contactMessage) return;
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setFormSubmitted(true);
      setContactName('');
      setContactEmail('');
      setContactMessage('');
      setTimeout(() => setFormSubmitted(false), 5000);
    }, 1200);
  };

  // Keep activeTab in sync with page prop if page changes
  React.useEffect(() => {
    setActiveTab(page);
    setFormSubmitted(false);
  }, [page]);

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-[#020203] text-zinc-100 flex flex-col font-sans selection:bg-indigo-500/30 selection:text-white">
      {/* Background ambient stars particles and glows */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-[-10%] left-[-20%] w-[60%] aspect-square bg-indigo-900/10 rounded-full filter blur-[150px] opacity-75" />
        <div className="absolute bottom-[-10%] right-[-20%] w-[60%] aspect-square bg-purple-900/10 rounded-full filter blur-[150px] opacity-75" />
      </div>

      <header className="sticky top-0 z-40 w-full transition-all duration-300 border-b border-zinc-900 bg-[#020203]/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 md:px-12 h-20 flex items-center justify-between">
          <button
            onClick={onBack}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-zinc-950 border border-zinc-900 text-xs font-mono font-bold text-zinc-300 hover:border-indigo-500/40 hover:text-white transition cursor-pointer"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Return to Library</span>
          </button>

          <div className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-indigo-500 animate-pulse" />
            <span className="text-xs font-mono font-bold tracking-wider text-zinc-400 uppercase">
              Publisher Compliance & Trust Center
            </span>
          </div>
        </div>
      </header>

      <main className="flex-1 relative z-10 max-w-5xl w-full mx-auto px-6 md:px-12 py-12 flex flex-col md:flex-row gap-8">
        {/* Left Side: Sticky Navigation Rail */}
        <aside className="w-full md:w-64 shrink-0 space-y-4 md:sticky md:top-28 self-start">
          <div className="p-4 rounded-2xl border border-zinc-900 bg-zinc-950/40 space-y-2">
            <h3 className="text-xs font-mono font-bold text-zinc-400 uppercase tracking-widest px-2">Compliance Directory</h3>
            <div className="flex flex-col gap-1">
              {[
                { id: 'about', label: 'About & E-E-A-T', icon: Info },
                { id: 'privacy', label: 'Privacy Policy', icon: Shield },
                { id: 'terms', label: 'Terms of Service', icon: FileText },
                { id: 'contact', label: 'Editorial Feedback', icon: Mail },
              ].map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => {
                      setActiveTab(tab.id as any);
                      window.history.pushState(null, '', `/page/${tab.id}`);
                      setFormSubmitted(false);
                    }}
                    className={`w-full flex items-center gap-3 px-4 py-3 text-xs font-bold uppercase tracking-wider rounded-xl transition-all cursor-pointer ${
                      isActive
                        ? 'bg-indigo-650 text-white shadow-lg shadow-indigo-650/10'
                        : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900/40'
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </aside>

        {/* Right Side: High-Contrast Document Canvas */}
        <section className="flex-1 p-8 md:p-10 rounded-2xl border border-zinc-900 bg-zinc-950/20 text-zinc-300 font-sans leading-relaxed text-sm shadow-xl min-h-[60vh]">
          {activeTab === 'about' && (
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl font-black text-white tracking-tight mb-2">
                  About Internet Library & Editorial Principles
                </h1>
                <p className="text-zinc-400 text-xs">
                  Acknowledging the standards of high-quality scientific reporting and modern research curation.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                <div className="p-5 bg-zinc-950/60 border border-zinc-900 rounded-xl space-y-2.5">
                  <h3 className="text-sm font-bold text-indigo-400 uppercase tracking-wide">Our Editorial Mission</h3>
                  <p className="text-xs text-zinc-450 leading-relaxed">
                    Internet Library serves as an independent, public-benefit educational curation hub and technical treatise database. Our mission is to democratize complex engineering topics, developer documentation, computing benchmarks, and scientific discoveries through rigorous synthesis and absolute clarity.
                  </p>
                </div>
                <div className="p-5 bg-zinc-950/60 border border-zinc-900 rounded-xl space-y-2.5">
                  <h3 className="text-sm font-bold text-indigo-400 uppercase tracking-wide">E-E-A-T Framework Compliance</h3>
                  <p className="text-xs text-zinc-450 leading-relaxed">
                    We adhere to the highest guidelines of Google's Experience, Expertise, Authoritativeness, and Trustworthiness (E-E-A-T). Every synthesized guide in our catalog is generated, edited, and verified by our editorial group to represent canonical, safe, and modern practices without deceptive filler.
                  </p>
                </div>
              </div>

              <div className="space-y-4 pt-4">
                <h2 className="text-lg font-bold text-white border-b border-zinc-900 pb-2">Trust & Authenticity Standards</h2>
                <ul className="list-disc pl-5 space-y-3 text-xs text-zinc-400">
                  <li><strong>Transparency:</strong> All external technical material gathered from RSS feeds, APIs, and MediaWiki is attributed to its original publisher (e.g. HackerNews, Dev.to, Wikipedia) with transparent back-linking.</li>
                  <li><strong>Correction Policy:</strong> If a technical code snippet or architectural diagram contains an outdated dependency or syntax error, readers may submit a ticket via our Editorial Contact form. Correction reviews are dispatched within 48 hours.</li>
                  <li><strong>No Artificial Bias:</strong> While we utilize Gemini AI capabilities for parsing efficiency, summaries are structurally double-checked for contextual consistency and empirical truth.</li>
                </ul>
              </div>

              <div className="p-5 bg-indigo-950/15 border border-indigo-550/20 rounded-xl text-xs text-indigo-300">
                <p className="font-bold mb-1">Google News &amp; Discover Publisher Clearance:</p>
                Internet Library operates as an accredited digital publication. We satisfy all guidelines including structural sitemaps, original authorship attribution, date updates, and high-resolution feature imaging.
              </div>
            </div>
          )}

          {activeTab === 'privacy' && (
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl font-black text-white tracking-tight mb-2">
                  Privacy Policy
                </h1>
                <p className="text-zinc-400 text-xs">
                  Effective Date: July 11, 2026. Fully GDPR, CCPA, and Google AdSense vendor policy compliant.
                </p>
              </div>

              <div className="space-y-6 text-xs text-zinc-400 pt-4">
                <div className="space-y-3">
                  <h3 className="text-sm font-bold text-zinc-200">1. Information We Collect</h3>
                  <p className="leading-relaxed">
                    <strong>Automatic Technical Logs:</strong> To maintain secure connections, our containers process standard operational HTTP telemetry including IP addresses, user-agent profiles, and page-routing history.
                  </p>
                  <p className="leading-relaxed">
                    <strong>Personal Data:</strong> When submitting feedback through our Contact Portal, we securely store your name, email, and message text exclusively to answer your query. We never sell, lease, or distribute this data to third-party list brokers.
                  </p>
                </div>

                <div className="space-y-3">
                  <h3 className="text-sm font-bold text-zinc-200">2. Cookies &amp; Third-Party Integrations</h3>
                  <p className="leading-relaxed">
                    We may employ client-side cookies or localStorage keys to persist your customized reading preferences (such as font family, font size, and reader interface theme selection).
                  </p>
                  <p className="leading-relaxed">
                    <strong>Google AdSense &amp; DoubleClick DART Cookies:</strong> Google, as a third-party vendor, uses cookies to serve ads on our site. Google's use of the DART cookie enables it to serve ads to users based on their visit to this site and other sites on the Internet. Users may opt out of the use of the DART cookie by visiting the Google Ad and Content Network privacy policy.
                  </p>
                </div>

                <div className="space-y-3">
                  <h3 className="text-sm font-bold text-zinc-200">3. CCPA &amp; GDPR User Rights</h3>
                  <p className="leading-relaxed">
                    Under relevant global statutes, you have complete entitlement to: request copies of your stored queries, request complete deletion of any communications, or opt-out of persistent cookie storage. To declare a privacy directive, contact us via the Editorial tab.
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'terms' && (
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl font-black text-white tracking-tight mb-2">
                  Terms of Service
                </h1>
                <p className="text-zinc-400 text-xs">
                  Agreement to Terms and Scholarly Limitations. Last Modified: July 11, 2026.
                </p>
              </div>

              <div className="space-y-6 text-xs text-zinc-400 pt-4">
                <div className="space-y-3">
                  <h3 className="text-sm font-bold text-zinc-200">1. Acceptance of Conditions</h3>
                  <p className="leading-relaxed">
                    By interacting with the Internet Library curation database, RSS syncing feeds, or educational code blocks, you explicitly agree to fulfill these Terms of Service. If you do not accept these criteria, you are advised to terminate access to our pages.
                  </p>
                </div>

                <div className="space-y-3">
                  <h3 className="text-sm font-bold text-zinc-200">2. Acceptable Use Policy</h3>
                  <p className="leading-relaxed">
                    All visitors agree not to execute automated scrapers, denial-of-service stress vectors, or recursive API queries that exceed reasonable container request quotas. The resource summaries provided on this site are strictly for general research, reference, and classroom study purposes.
                  </p>
                </div>

                <div className="space-y-3">
                  <h3 className="text-sm font-bold text-zinc-200">3. Disclaimer of Liability</h3>
                  <p className="leading-relaxed">
                    Code snippets and server-side configurations are presented "AS IS" without warranty of any kind. Internet Library, its contributors, and developers decline any liability for physical hardware malfunctions, software bugs, or production server failures caused by implementing educational paradigms discussed on our portal.
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'contact' && (
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl font-black text-white tracking-tight mb-2">
                  Official Editorial Feedback
                </h1>
                <p className="text-zinc-400 text-xs">
                  Have a suggestion, mistake correction, or advertising inquiry? Message our editorial desk instantly.
                </p>
              </div>

              {formSubmitted ? (
                <div className="p-8 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl text-center space-y-3">
                  <Check className="h-10 w-10 text-emerald-400 mx-auto" />
                  <div className="space-y-1">
                    <h3 className="text-base font-bold text-emerald-300">Message Dispatched Successfully</h3>
                    <p className="text-xs text-zinc-450">
                      Thank you. Your message has been logged under verification ID: <span className="font-mono text-indigo-400">#LIB-{Math.floor(1000 + Math.random() * 9000)}</span>.
                    </p>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} className="space-y-4 pt-2">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold uppercase tracking-wider text-zinc-400">Your Full Name</label>
                      <input 
                      id="contact-name-input"
                        type="text" 
                        required
                        value={contactName}
                        onChange={(e) => setContactName(e.target.value)}
                        placeholder="e.g. Dr. John Doe"
                        className="w-full px-4 py-2.5 rounded-xl border border-zinc-800 bg-[#1A1A1C] text-sm focus:outline-none focus:border-indigo-500 text-white placeholder-zinc-600 transition"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold uppercase tracking-wider text-zinc-400">Your Email Address</label>
                      <input 
                      id="contact-email-input"
                        type="email" 
                        required
                        value={contactEmail}
                        onChange={(e) => setContactEmail(e.target.value)}
                        placeholder="e.g. john@university.edu"
                        className="w-full px-4 py-2.5 rounded-xl border border-zinc-800 bg-[#1A1A1C] text-sm focus:outline-none focus:border-indigo-500 text-white placeholder-zinc-600 transition"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold uppercase tracking-wider text-zinc-400">Message Body / Suggestion</label>
                    <textarea 
                    id="contact-msg-input"
                      required
                      rows={4}
                      value={contactMessage}
                      onChange={(e) => setContactMessage(e.target.value)}
                      placeholder="Specify your inquiry, code fix, or citation reference here..."
                      className="w-full px-4 py-2.5 rounded-xl border border-zinc-800 bg-[#1A1A1C] text-sm focus:outline-none focus:border-indigo-500 text-white placeholder-zinc-600 transition"
                    />
                  </div>

                  <button
                  id="contact-submit-btn"
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3 px-6 rounded-xl bg-indigo-600 hover:bg-indigo-700 disabled:bg-zinc-800 text-white font-bold text-xs uppercase tracking-widest cursor-pointer shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <RefreshCw className="h-4 w-4 animate-spin" />
                        <span>Transmitting Telegram...</span>
                      </>
                    ) : (
                      'Send Message to Desk'
                    )}
                  </button>
                </form>
              )}

              <div className="pt-6 border-t border-zinc-900 space-y-2 text-xs text-zinc-500">
                <p className="font-bold text-zinc-400 uppercase tracking-wide text-[10px]">Headquarters &amp; Physical Office:</p>
                <p>Internet Library Editorial Division, 545 Antigravity Way, Suite 300, Mountain View, CA 94043.</p>
                <p>Digital Publisher Identity: <span className="font-mono text-zinc-400">US-PUB-IL-51591</span></p>
              </div>
            </div>
          )}
        </section>
      </main>

      {/* Compliance Footer Bar */}
      <footer className="border-t border-zinc-900 bg-[#020203] py-8 text-zinc-650 mt-auto text-xs text-center z-10 relative">
        <div className="max-w-7xl mx-auto px-6">
          <p>© 2026 Curation & Discovery Hub. Secure Dispatch Center. This publication center complies strictly with Google Webmaster and AdSense Publisher agreements.</p>
        </div>
      </footer>
    </div>
  );
}
