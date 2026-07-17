import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Sparkles, BookOpen, AlertCircle, ChevronRight, Layers, HelpCircle, FileText, CheckCircle2, Type } from 'lucide-react';
import { AISummary, LibraryItem } from '../types';
import ReactMarkdown from 'react-markdown';

interface SummaryModalProps {
  item: LibraryItem | null;
  initialTab?: 'tldr' | 'full';
  onClose: () => void;
  onOpenFullArticle?: (item: LibraryItem) => void;
}

export default function SummaryModal({ item, initialTab = 'tldr', onClose, onOpenFullArticle }: SummaryModalProps) {
  const [loading, setLoading] = useState(false);
  const [summary, setSummary] = useState<AISummary | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Deep-dive long article states
  const [activeTab, setActiveTab] = useState<'tldr' | 'full'>('tldr');
  const [articleContent, setArticleContent] = useState<string | null>(null);
  const [loadingArticle, setLoadingArticle] = useState(false);
  const [articleError, setArticleError] = useState<string | null>(null);

  // Reader Customization State
  const [fontFamily, setFontFamily] = useState<'sans' | 'serif' | 'mono'>('sans');
  const [fontSize, setFontSize] = useState<'sm' | 'base' | 'lg' | 'xl'>('base');
  const [readingTheme, setReadingTheme] = useState<'slate' | 'sepia' | 'paper'>('slate');
  const [scrollProgress, setScrollProgress] = useState(0);

  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Reset reader customization on item change to defaults
  useEffect(() => {
    if (!item) {
      setSummary(null);
      setError(null);
      setActiveTab('tldr');
      setArticleContent(null);
      setArticleError(null);
      setScrollProgress(0);
      return;
    }

    // Initialize with selected tab
    setActiveTab(initialTab);
    setScrollProgress(0);

    const fetchSummary = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch('/api/summarize', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            title: item.title,
            description: item.description,
            source: item.source,
            url: item.url,
          }),
        });
        const data = await response.json();
        if (data.success) {
          setSummary(data.data);
        } else {
          throw new Error(data.error || 'Failed to generate summary');
        }
      } catch (err: any) {
        console.error(err);
        setError('Could not connect to Gemini AI helper. Loading local intelligent fallback summary.');
        setSummary({
          summary: `An essential curation detailing key patterns and execution paths. It explores topics covered in "${item.title}" with standard architectures.`,
          takeaways: [
            "Provides crucial baseline mechanics for modern developers.",
            "Integrates practical, efficient developer guidelines.",
            "Exposes external source tools and core documentation paths."
          ],
          difficulty: 'Intermediate',
          prerequisites: ['Basic Web Mechanics', 'Programming Fundamentals']
        });
      } finally {
        setLoading(false);
      }
    };

    fetchSummary();
  }, [item, initialTab]);

  const fetchFullArticle = async () => {
    if (articleContent || loadingArticle || !item) return;
    setLoadingArticle(true);
    setArticleError(null);
    try {
      const response = await fetch('/api/full-article', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: item.title,
          description: item.description,
          category: item.category,
          source: item.source,
          tags: item.tags,
        }),
      });
      const data = await response.json();
      if (data.success || data.content) {
        setArticleContent(data.content);
      } else {
        throw new Error(data.error || 'Failed to generate full article');
      }
    } catch (err: any) {
      console.error(err);
      setArticleError('Could not fetch complete study guide from server. Loaded local pre-seeded manual fallback.');
      setArticleContent(`# Comprehensive Deep Dive Study Guide: ${item.title}

*An elite, pre-seeded study manual generated offline. Connect your \`GEMINI_API_KEY\` to stream custom 3000-word SEO Handbooks dynamically.*

---

## 1. Executive Abstract & Industry Significance
Modern application layouts have shifted toward highly reactive, client-hydrated interfaces. This manual, centering on the core concepts of **${item.title}** (curated from **${item.source}**), serves as a complete offline study guide for developers seeking high-performance engineering standards.

In typical software systems, the presentation layer must manage network pipelines, coordinate state trees, handle layout boundaries, and minimize client-side bundle footprints. **${item.description}** By mastering these low-level optimizations, teams can reduce asset sizes, streamline layout flows, and achieve optimal performance marks.

## 2. Historical Context & Problem Space
To understand the technical achievements represented here, we must trace historical rendering milestones:
- **Phase A (Monolithic Rendering)**: Server engines generated static HTML structures and served them synchronously. Every user interaction triggered a full page reload, flushing browser memory and resetting client scroll anchors.
- **Phase B (Dynamic Fragments)**: AJAX-driven scripts manipulated the DOM tree dynamically. However, nested asynchronous operations frequently caused layout thrashing, where browser layout engines recalculated geometry bounds repeatedly.
- **Phase C (Declarative Hydration)**: Modern component frameworks (like React or Vue) batched updates inside a Virtual DOM. While this minimized immediate layout thrashing, it introduced heavy CPU reconciliation bottlenecks on mobile browsers.

This asset addresses these historical challenges by offering isolated, modular structures that bypass full-tree reconciliation and execute rendering operations at near-native speeds.

## 3. Core Mechanics & Architecture
An effective system segregates operations into clear, decoupled boundaries:
1. **Layout Boundary Separation**: Isolates individual component nodes so that state updates do not trigger cascading reflow calculations across parent layout grids.
2. **State Propagation Models**: Utilizes micro-state observables (like signals or reactive hooks) to trigger precise target DOM patches instead of re-evaluating the complete document object tree.
3. **Passive Thread Execution**: Registers event listeners with passive parameters, letting browser scroll animations run at locked frame-rates without waiting for synchronous main-thread scripts.

## 4. Architectural Blueprint & Practical Code Walkthrough
Let's review a production-ready, highly optimized code skeleton illustrating these low-level component rendering optimization methods:

\`\`\`typescript
// High-Performance Layout Coordinator & Viewport Monitor
export class LayoutCoordinator {
  private container: HTMLElement;
  private observer: IntersectionObserver;

  constructor(targetElement: HTMLElement) {
    this.container = targetElement;
    
    // Configure asynchronous observer executing natively in the browser background
    this.observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          this.triggerHardwareComposition();
          // Stop observing to limit background ticks
          this.observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
  }

  public registerNode(node: HTMLElement): void {
    this.observer.observe(node);
  }

  private triggerHardwareComposition(): void {
    // Inject hardware-accelerated transform rules to delegate painting tasks to GPU
    this.container.style.transform = 'translate3d(0, 0, 0)';
    this.container.style.willChange = 'transform';
  }
}
\`\`\`

This setup ensures that off-screen elements consume zero layout memory, with calculations executing asynchronously only when elements cross visible screen margins.

## 5. Comparative Structural Analysis
The table below contrasts modern rendering strategies under heavy data loads:

| Rendering Architecture | Initial Bundle size | Hydration Delay | Memory Profile | SEO Compatibility |
| :--- | :--- | :--- | :--- | :--- |
| **Client-Only (SPA)** | High (Framework) | Slow (Heavy JS) | $O(N)$ elements | Poor |
| **Server-First (MPA)** | Low (Static HTML) | Instant (No JS) | $O(1)$ client RAM | Outstanding |
| **Island Architecture**| Low (Modular code) | Fast (Targeted) | $O(1)$ static blocks| Outstanding |
| **Virtual Viewport** | Moderate | Fast | $O(1)$ locked viewport| Outstanding |

## 6. Frequently Asked Questions (FAQ)
- **Q1: Why are passive scroll listeners preferred for reading modes?**
  - **A1**: Standard scroll handlers block smooth animations because the browser must wait for the script to finish executing. Passive listeners state that \`preventDefault()\` is never called, allowing the browser to scroll instantly.
- **Q2: What is container containment, and how does it prevent thrashing?**
  - **A2**: Applying properties like \`contain: layout size\` tells the layout engine that changes inside this block cannot influence the size of outer container elements, completely skipping global reflow steps.
- **Q3: When should a project opt for static pre-rendering?**
  - **A3**: When content is highly marketing or documentation focused, static rendering is preferred as it delivers perfect SEO indexability and runs instantly on the network edge.

## 7. Strategic Summary & Roadmap
In conclusion, delivering seamless, low-latency reading platforms requires meticulous attention to painting pipelines, containment bounds, and network delivery channels. By structuring systems according to these architectural boundaries, development teams can scale content libraries to thousands of items with zero lag.

Over the next few years, compilers will continue to automate layout calculations. Maintaining deep mastery of browser mechanics remains a critical, evergreen capability for systems engineers.`);
    } finally {
      setLoadingArticle(false);
    }
  };

  // Trigger loading of full article when active tab is selected
  useEffect(() => {
    if (activeTab === 'full' && item) {
      fetchFullArticle();
    }
  }, [activeTab, item]);

  // Handle Scroll Progress Calculations
  const handleScroll = () => {
    const container = scrollContainerRef.current;
    if (!container) return;
    const totalHeight = container.scrollHeight - container.clientHeight;
    if (totalHeight <= 0) {
      setScrollProgress(0);
    } else {
      const progress = (container.scrollTop / totalHeight) * 100;
      setScrollProgress(progress);
    }
  };

  if (!item) return null;

  // Custom typography computed classes
  const fontClass = 
    fontFamily === 'serif' ? 'font-serif tracking-normal text-zinc-800' :
    fontFamily === 'mono' ? 'font-mono tracking-tight text-xs' :
    'font-sans';

  const sizeClass = 
    fontSize === 'sm' ? 'text-xs md:text-sm prose-sm' :
    fontSize === 'lg' ? 'text-base md:text-lg prose-lg' :
    fontSize === 'xl' ? 'text-lg md:text-xl prose-xl' :
    'text-sm md:text-base prose-base';

  const themeClass = 
    readingTheme === 'sepia' ? 
      'bg-[#F4ECD8] text-[#433422] p-6 md:p-10 rounded-xl border border-[#E4DCC8] shadow-inner prose-headings:text-[#2F2214] prose-h2:text-[#5C3C15] prose-strong:text-[#2F2214] prose-code:bg-[#E8DFC8] prose-code:text-[#5C3C15] prose-pre:bg-[#E4DCC8] prose-pre:border-[#D4CCC8] prose-th:bg-[#E8DFC8] prose-th:text-[#2F2214] prose-th:border-[#D4CCC8] prose-td:border-[#D4CCC8] prose-td:text-[#433422] prose-a:text-[#5C3C15]' :
    readingTheme === 'paper' ?
      'bg-[#F9F9F9] text-[#1E1E1F] p-6 md:p-10 rounded-xl border border-zinc-200 shadow-inner prose-headings:text-[#09090B] prose-h2:text-indigo-700 prose-strong:text-[#09090B] prose-code:bg-zinc-200 prose-code:text-indigo-700 prose-pre:bg-zinc-100 prose-pre:border-zinc-300 prose-th:bg-zinc-100 prose-th:text-[#09090B] prose-th:border-zinc-200 prose-td:border-zinc-200 prose-td:text-zinc-700 prose-a:text-indigo-600' :
      'text-zinc-300 prose-invert prose-headings:text-white prose-h2:text-indigo-400 prose-strong:text-white prose-code:bg-[#1A1A1C] prose-code:text-indigo-300 prose-pre:bg-[#111112] prose-pre:border-zinc-800 prose-th:bg-[#111112] prose-th:text-zinc-200 prose-th:border-zinc-800 prose-td:border-zinc-800 prose-td:text-zinc-300 prose-a:text-indigo-400';

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          id="modal-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-black/85 backdrop-blur-md"
          onClick={onClose}
        />

        {/* Modal Window */}
        <motion.div
          id="summary-modal"
          initial={{ scale: 0.96, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.96, opacity: 0 }}
          transition={{ type: 'spring', duration: 0.4 }}
          className="relative w-full max-w-3xl overflow-hidden rounded-2xl bg-[#0A0A0B] shadow-2xl border border-zinc-800 flex flex-col h-[85vh]"
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-zinc-800 bg-[#111112] px-5 py-3.5 shrink-0">
            <div className="flex items-center gap-2 text-indigo-400">
              <Sparkles className="h-4 w-4 fill-indigo-500/10 animate-pulse text-indigo-400" />
              <span className="font-sans font-bold text-xs uppercase tracking-wider text-indigo-300">
                Internet Library Reader Platform
              </span>
            </div>
            <button
              id="close-summary-btn"
              onClick={onClose}
              className="rounded-full p-1 text-zinc-400 hover:bg-zinc-800 hover:text-white transition cursor-pointer"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Title Area */}
          <div className="p-5 bg-[#111112]/50 border-b border-zinc-800/60 shrink-0">
            <div className="flex items-center gap-2 mb-1.5">
              <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-zinc-800 border border-zinc-700 text-zinc-300 font-mono uppercase">
                {item.category}
              </span>
              <span className="text-[11px] font-semibold text-zinc-500 font-sans">
                Curated from {item.source}
              </span>
            </div>
            <h2 className="font-sans text-lg font-extrabold text-white leading-snug">
              {item.title}
            </h2>
          </div>

          {/* Tab Switcher & Progress Bar */}
          <div className="flex flex-col border-b border-zinc-800 bg-[#111112]/30 shrink-0">
            <div className="flex px-4">
              <button
                onClick={() => setActiveTab('tldr')}
                className={`py-3 px-4 text-xs font-bold uppercase tracking-wider transition-all border-b-2 ${
                  activeTab === 'tldr'
                    ? 'border-indigo-500 text-indigo-400'
                    : 'border-transparent text-zinc-500 hover:text-zinc-300'
                } cursor-pointer flex items-center gap-1.5`}
              >
                <BookOpen className="h-3.5 w-3.5" />
                Quick TL;DR
              </button>
              <button
                onClick={() => {
                  if (onOpenFullArticle && item) {
                    onClose();
                    onOpenFullArticle(item);
                  } else {
                    setActiveTab('full');
                  }
                }}
                className={`py-3 px-4 text-xs font-bold uppercase tracking-wider transition-all border-b-2 ${
                  activeTab === 'full'
                    ? 'border-indigo-500 text-indigo-400'
                    : 'border-transparent text-zinc-500 hover:text-zinc-300'
                } cursor-pointer flex items-center gap-1.5`}
              >
                <FileText className="h-3.5 w-3.5" />
                Full Masterclass Article
              </button>
            </div>

            {/* Reading Scroll Progress Tracker */}
            {activeTab === 'full' && (
              <div className="h-[2px] w-full bg-zinc-800 relative shrink-0">
                <div
                  className="absolute left-0 top-0 h-full bg-indigo-500 transition-all duration-75"
                  style={{ width: `${scrollProgress}%` }}
                />
              </div>
            )}
          </div>

          {/* Sticky Reader Customization Ribbon */}
          {activeTab === 'full' && articleContent && !loadingArticle && (
            <div className="flex flex-wrap items-center justify-between gap-4 px-5 py-2.5 border-b border-zinc-800 bg-[#111112]/60 text-xs shrink-0 select-none">
              {/* Fonts */}
              <div className="flex items-center gap-1">
                <span className="text-[9px] uppercase font-mono font-bold text-zinc-500 mr-1.5">FONT</span>
                {(['sans', 'serif', 'mono'] as const).map((f) => (
                  <button
                    key={f}
                    onClick={() => setFontFamily(f)}
                    className={`px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider border transition-colors cursor-pointer ${
                      fontFamily === f
                        ? 'bg-indigo-600 text-white border-indigo-500'
                        : 'bg-zinc-900 text-zinc-400 border-zinc-800 hover:text-white hover:bg-zinc-800'
                    }`}
                  >
                    {f}
                  </button>
                ))}
              </div>

              {/* Sizes */}
              <div className="flex items-center gap-1">
                <span className="text-[9px] uppercase font-mono font-bold text-zinc-500 mr-1.5">SIZE</span>
                {(['sm', 'base', 'lg', 'xl'] as const).map((sz) => (
                  <button
                    key={sz}
                    onClick={() => setFontSize(sz)}
                    className={`px-2 py-1 rounded text-[10px] font-bold border transition-colors cursor-pointer ${
                      fontSize === sz
                        ? 'bg-indigo-600 text-white border-indigo-500'
                        : 'bg-zinc-900 text-zinc-400 border-zinc-800 hover:text-white hover:bg-zinc-800'
                    }`}
                  >
                    {sz === 'sm' ? 'A-' : sz === 'base' ? 'A' : sz === 'lg' ? 'A+' : 'A++'}
                  </button>
                ))}
              </div>

              {/* Contrast Themes */}
              <div className="flex items-center gap-1">
                <span className="text-[9px] uppercase font-mono font-bold text-zinc-500 mr-1.5">THEME</span>
                {[
                  { id: 'slate', label: 'DARK' },
                  { id: 'sepia', label: 'SEPIA' },
                  { id: 'paper', label: 'PAPER' }
                ].map((th) => (
                  <button
                    key={th.id}
                    onClick={() => setReadingTheme(th.id as any)}
                    className={`px-2 py-1 rounded text-[10px] font-bold border transition-colors cursor-pointer ${
                      readingTheme === th.id
                        ? 'bg-indigo-600 text-white border-indigo-500'
                        : 'bg-zinc-900 text-zinc-400 border-zinc-800 hover:text-white hover:bg-zinc-800'
                    }`}
                  >
                    {th.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Scrollable Reading Content Body */}
          <div
            ref={scrollContainerRef}
            onScroll={activeTab === 'full' ? handleScroll : undefined}
            className="flex-1 overflow-y-auto p-5 md:p-6 bg-[#0E0E10]/40 scroll-smooth"
          >
            {activeTab === 'tldr' ? (
              <div className="space-y-6">
                {loading ? (
                  <div className="py-16 flex flex-col items-center justify-center gap-4">
                    <div className="relative animate-spin">
                      <div className="h-9 w-9 rounded-full border-4 border-zinc-800 border-t-indigo-500"></div>
                    </div>
                    <div className="text-center">
                      <p className="font-sans text-xs font-bold text-zinc-300 uppercase tracking-widest">Consulting AI Librarians...</p>
                      <p className="text-[11px] text-zinc-500 mt-1">Generating precise TL;DR indices with Gemini AI</p>
                    </div>
                  </div>
                ) : (
                  <>
                    {error && (
                      <div className="rounded-xl bg-amber-950/25 p-4 border border-amber-900/60 text-amber-300 text-xs flex items-start gap-3">
                        <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
                        <div>
                          <p className="font-semibold mb-1">{error}</p>
                          <p className="text-zinc-400">Displaying robust fallback technical catalog structures below.</p>
                        </div>
                      </div>
                    )}

                    {summary && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="space-y-6"
                      >
                        {/* TL;DR Executive Summary */}
                        <div className="rounded-xl bg-indigo-950/20 p-4 border border-indigo-900/30">
                          <h3 className="font-sans font-bold text-xs text-indigo-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                            <BookOpen className="h-3.5 w-3.5" />
                            Core Objective
                          </h3>
                          <p className="text-sm text-zinc-300 leading-relaxed font-sans">
                            {summary.summary}
                          </p>
                        </div>

                        {/* Key Takeaways */}
                        <div className="space-y-3">
                          <h3 className="font-sans font-bold text-xs text-zinc-500 uppercase tracking-wider flex items-center gap-1.5">
                            <CheckCircle2 className="h-3.5 w-3.5 text-indigo-400" />
                            Technical Takeaways & Highlights
                          </h3>
                          <ul className="space-y-2.5">
                            {summary.takeaways.map((point, index) => (
                              <motion.li
                                key={index}
                                initial={{ opacity: 0, x: -5 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.08 }}
                                className="text-sm text-zinc-300 flex items-start gap-2.5"
                              >
                                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-500" />
                                <span className="font-sans leading-relaxed text-zinc-300">{point}</span>
                              </motion.li>
                            ))}
                          </ul>
                        </div>

                        {/* Difficulty and Prerequisites */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-6 border-t border-zinc-800">
                          {/* Difficulty */}
                          <div className="space-y-2">
                            <h4 className="font-sans font-semibold text-xs text-zinc-500 uppercase tracking-wider">
                              Difficulty Scale
                            </h4>
                            <div className="flex items-center gap-2">
                              <span className={`px-2.5 py-1 rounded text-[10px] font-bold border uppercase tracking-wider ${
                                summary.difficulty === 'Beginner' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' :
                                summary.difficulty === 'Intermediate' ? 'bg-amber-500/10 text-amber-400 border-amber-500/20' :
                                'bg-rose-500/10 text-rose-400 border-rose-500/20'
                              }`}>
                                {summary.difficulty}
                              </span>
                              <div className="flex gap-1">
                                <span className={`h-2 w-4 rounded-sm ${summary.difficulty ? 'bg-emerald-400' : 'bg-zinc-800'}`} />
                                <span className={`h-2 w-4 rounded-sm ${summary.difficulty !== 'Beginner' ? 'bg-amber-400' : 'bg-zinc-800'}`} />
                                <span className={`h-2 w-4 rounded-sm ${summary.difficulty === 'Advanced' ? 'bg-rose-400' : 'bg-zinc-800'}`} />
                              </div>
                            </div>
                          </div>

                          {/* Prerequisites */}
                          <div className="space-y-2">
                            <h4 className="font-sans font-semibold text-xs text-zinc-500 uppercase tracking-wider flex items-center gap-1">
                              <Layers className="h-3 w-3 text-zinc-500" />
                              Required Prerequisites
                            </h4>
                            <div className="flex flex-wrap gap-1.5">
                              {summary.prerequisites.map((prereq, index) => (
                                <span
                                  key={index}
                                  className="px-2 py-0.5 rounded bg-[#111112] border border-zinc-800 text-zinc-400 text-[11px] font-mono"
                                >
                                  {prereq}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </>
                )}
              </div>
            ) : (
              <div className="space-y-6">
                {loadingArticle ? (
                  <div className="py-20 flex flex-col items-center justify-center gap-4">
                    <div className="relative">
                      <div className="h-11 w-11 rounded-full border-4 border-zinc-800 border-t-indigo-500 animate-spin"></div>
                      <Sparkles className="absolute inset-0 m-auto h-4.5 w-4.5 text-indigo-400 animate-pulse" />
                    </div>
                    <div className="text-center max-w-sm">
                      <p className="font-sans text-xs font-bold text-zinc-300 uppercase tracking-widest">Compiling Full Article...</p>
                      <p className="text-[11px] text-zinc-500 mt-2 leading-relaxed">
                        Structuring a masterclass study guide (2,500 - 3,000+ words) loaded with architecture matrices, functional FAQ sections, and complete code walkthroughs.
                      </p>
                    </div>
                  </div>
                ) : (
                  <>
                    {articleError && (
                      <div className="rounded-xl bg-amber-950/20 p-4 border border-amber-900/55 text-amber-300 text-xs flex items-start gap-3">
                        <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
                        <div>
                          <p className="font-semibold mb-1">{articleError}</p>
                          <p className="text-zinc-400">Rendering our offline high-fidelity technical handbook below.</p>
                        </div>
                      </div>
                    )}

                    {articleContent && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`prose max-w-none leading-relaxed transition-all duration-300 select-text ${fontClass} ${sizeClass} ${themeClass}`}
                      >
                        <ReactMarkdown>{articleContent}</ReactMarkdown>
                      </motion.div>
                    )}
                  </>
                )}
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="border-t border-zinc-800 bg-[#111112] px-5 py-4 flex justify-between items-center shrink-0">
            <span className="text-[10px] text-zinc-500 font-mono">LIBRARY INDEX REF: {item.id}</span>
            <a
              id="visit-resource-link"
              href={item.url}
              target="_blank"
              referrerPolicy="no-referrer"
              className="inline-flex items-center gap-1 text-xs font-bold text-indigo-400 hover:text-indigo-300 transition cursor-pointer"
            >
              Visit Curated Publisher URL
              <ChevronRight className="h-4 w-4" />
            </a>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
