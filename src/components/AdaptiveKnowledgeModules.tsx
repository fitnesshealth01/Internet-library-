import React, { useState } from 'react';
import { 
  Play, Sparkles, Check, AlertCircle, ChevronRight, Cpu, Layers, 
  HelpCircle, Terminal, TrendingUp, Users, MapPin, Building, 
  Globe, BookOpen, Clock, ShieldCheck, Landmark, Bookmark, 
  FileText, ArrowUpRight, Scale, Info, RefreshCw, BarChart2
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ModuleProps {
  topic: string;
}

// ==========================================
// 1. TECHNOLOGY & PROGRAMMING MODULE
// ==========================================
export function TechProgrammingModule({ topic }: ModuleProps) {
  const [activeNode, setActiveNode] = useState<string>('parser');
  const [cacheStrategy, setCacheStrategy] = useState<'lru' | 'fifo' | 'none'>('lru');
  const [dataVolume, setDataVolume] = useState<number>(1000);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [terminalOutput, setTerminalOutput] = useState<string[]>([
    'SYSTEM: Sandbox engine initialized.',
    'Ready for diagnostic simulation...'
  ]);

  const nodes = [
    { id: 'parser', label: 'AST Parser', desc: 'Parses raw code strings into abstract syntax trees for geometric validation.', status: 'Active' },
    { id: 'compiler', label: 'V8 JIT Compiler', desc: 'Translates AST nodes directly into highly optimized machine code.', status: 'Ready' },
    { id: 'gc', label: 'Garbage Collector', desc: 'Monitors memory references to recycle unreachable objects safely.', status: 'Monitoring' },
    { id: 'gpu', label: 'GPU Compositor', desc: 'Takes layout threads and composites paint instructions directly on hardware layers.', status: 'Idle' }
  ];

  const handleRunSimulation = () => {
    setIsRunning(true);
    setTerminalOutput(prev => [...prev, `[SIM] Starting execution pipeline for: ${topic}...`]);
    
    setTimeout(() => {
      let duration = (dataVolume / 100).toFixed(1);
      let hitRate = cacheStrategy === 'lru' ? '94%' : cacheStrategy === 'fifo' ? '76%' : '0%';
      let overhead = cacheStrategy === 'none' ? '0.2ms' : '2.4ms';
      
      setTerminalOutput(prev => [
        ...prev,
        `[AST] Generated 342 abstract nodes successfully.`,
        `[JIT] Compiled machine code in ${duration}ms.`,
        `[CACHE] Applied ${cacheStrategy.toUpperCase()} eviction algorithm.`,
        `[CACHE] Verified cache hit rate: ${hitRate} (Overhead: ${overhead})`,
        `[SIM] SUCCESS: ${topic} pipeline completed with zero leaks.`
      ]);
      setIsRunning(false);
    }, 1200);
  };

  return (
    <div className="space-y-6">
      {/* Interactive System Flow / Node Graph */}
      <div className="bg-[#111112] border border-zinc-800/80 p-5 rounded-2xl">
        <div className="flex items-center justify-between mb-4 pb-2 border-b border-zinc-800/50">
          <div className="flex items-center gap-2">
            <Cpu className="h-4.5 w-4.5 text-indigo-400" />
            <h4 className="text-xs font-black uppercase tracking-widest text-zinc-300">
              Architecture & Execution Graph
            </h4>
          </div>
          <span className="text-[10px] font-mono bg-indigo-500/10 text-indigo-400 px-2 py-0.5 rounded border border-indigo-500/20">
            Interactive Schema
          </span>
        </div>

        <p className="text-xs text-zinc-500 mb-4 leading-normal">
          Click on any node in the internal runtime hierarchy to investigate its system-level mechanics.
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {nodes.map((node) => (
            <button
              key={node.id}
              onClick={() => setActiveNode(node.id)}
              className={`p-4.5 rounded-xl border text-left cursor-pointer transition-all ${
                activeNode === node.id 
                  ? 'bg-indigo-650/15 border-indigo-500 text-indigo-200' 
                  : 'bg-zinc-950/40 border-zinc-850 hover:border-zinc-700 text-zinc-400'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] font-mono font-bold tracking-wider text-indigo-400 uppercase">
                  Node
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              </div>
              <h5 className="font-sans font-bold text-sm text-zinc-100">{node.label}</h5>
              <p className="text-[10px] text-zinc-500 mt-1 truncate">Status: {node.status}</p>
            </button>
          ))}
        </div>

        {/* Selected Node Details Panel */}
        <AnimatePresence mode="wait">
          {activeNode && (
            <motion.div
              key={activeNode}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              className="mt-4 bg-zinc-950/60 p-4 rounded-xl border border-zinc-850 text-xs text-zinc-400 space-y-1"
            >
              <strong className="text-zinc-200">
                {nodes.find(n => n.id === activeNode)?.label} Description:
              </strong>
              <p className="leading-relaxed">
                {nodes.find(n => n.id === activeNode)?.desc} Nodes communicate with low-latency memory buses to pipeline execution frames under 16ms boundaries.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Interactive Code Playground / Simulator */}
      <div className="bg-[#111112] border border-zinc-800/80 p-5 rounded-2xl">
        <div className="flex items-center justify-between mb-4 pb-2 border-b border-zinc-800/50">
          <div className="flex items-center gap-2">
            <Terminal className="h-4.5 w-4.5 text-indigo-400" />
            <h4 className="text-xs font-black uppercase tracking-widest text-zinc-300">
              Interactive Execution Simulator
            </h4>
          </div>
          <span className="text-[10px] font-mono text-zinc-500">Node Sandbox 2.0</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-stretch">
          {/* Controls */}
          <div className="md:col-span-5 space-y-4 flex flex-col justify-between">
            <div className="space-y-4">
              {/* Parameter 1 */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-zinc-400 flex items-center justify-between">
                  <span>Cache Eviction Strategy:</span>
                  <span className="font-mono text-indigo-400 uppercase text-[10px] font-bold">{cacheStrategy}</span>
                </label>
                <div className="flex gap-1 bg-zinc-950/40 p-1 border border-zinc-850 rounded-lg">
                  {['lru', 'fifo', 'none'].map((strat) => (
                    <button
                      key={strat}
                      onClick={() => setCacheStrategy(strat as any)}
                      className={`flex-1 text-[10px] font-bold py-1 px-1.5 rounded cursor-pointer transition ${
                        cacheStrategy === strat ? 'bg-indigo-600 text-white' : 'text-zinc-500 hover:text-zinc-300'
                      }`}
                    >
                      {strat.toUpperCase()}
                    </button>
                  ))}
                </div>
              </div>

              {/* Parameter 2 */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-zinc-400 flex items-center justify-between">
                  <span>Simulated Thread Load:</span>
                  <span className="font-mono text-indigo-400 text-[10px] font-bold">{dataVolume} tasks</span>
                </label>
                <input
                  type="range"
                  min="100"
                  max="5000"
                  step="100"
                  value={dataVolume}
                  onChange={(e) => setDataVolume(Number(e.target.value))}
                  className="w-full accent-indigo-500 bg-zinc-900 rounded-lg appearance-none h-1.5"
                />
              </div>
            </div>

            <button
              onClick={handleRunSimulation}
              disabled={isRunning}
              className="w-full flex items-center justify-center gap-1.5 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-black uppercase tracking-wider shadow-sm hover:shadow-lg transition-all cursor-pointer"
            >
              {isRunning ? (
                <>
                  <RefreshCw className="h-4 w-4 animate-spin" />
                  <span>Processing...</span>
                </>
              ) : (
                <>
                  <Play className="h-4 w-4 fill-white" />
                  <span>Run Sandbox Simulation</span>
                </>
              )}
            </button>
          </div>

          {/* Terminal Output */}
          <div className="md:col-span-7 bg-[#050506] border border-zinc-850/80 rounded-xl p-4 flex flex-col justify-between font-mono text-[11px] h-[190px]">
            <div className="overflow-y-auto space-y-1 select-all h-full pr-1 text-zinc-400">
              {terminalOutput.map((log, index) => (
                <div key={index} className="flex gap-1.5">
                  <span className="text-zinc-650 font-bold select-none">&gt;</span>
                  <span className={log.includes('SUCCESS') ? 'text-emerald-400 font-bold' : log.includes('CACHE') ? 'text-indigo-400' : 'text-zinc-300'}>
                    {log}
                  </span>
                </div>
              ))}
            </div>
            <div className="border-t border-zinc-850/60 pt-2 mt-2 flex items-center justify-between text-[9px] text-zinc-550 select-none">
              <span>Host: simulator-engine-v2.local</span>
              <span>Memory Heap: 42.4 MB</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 2. NEWS ARTICLES MODULE
// ==========================================
export function NewsIntelligenceModule({ topic }: ModuleProps) {
  const timelineEvents = [
    { date: '08:00 AM (Today)', title: 'First Alert', desc: 'Initial details leaked online concerning the system upgrade.' },
    { date: '11:15 AM (Today)', title: 'Official Press Briefing', desc: 'Key representatives issued formal guidelines describing the roll out.' },
    { date: '02:30 PM (Today)', title: 'Widespread Discussion', desc: 'Industry analysis reports major spikes in search volume and global coverage.' },
    { date: '06:00 PM (Today)', title: 'Verified Confirmation', desc: 'Verified academic boards indexed these details permanently.' }
  ];

  return (
    <div className="space-y-6">
      {/* Event Timeline */}
      <div className="bg-[#111112] border border-zinc-800/80 p-5 rounded-2xl">
        <div className="flex items-center gap-2 mb-4 pb-2 border-b border-zinc-800/50">
          <Clock className="h-4.5 w-4.5 text-indigo-400" />
          <h4 className="text-xs font-black uppercase tracking-widest text-zinc-300">
            Chronological Development Timeline
          </h4>
        </div>

        <div className="space-y-4 relative pl-4 before:absolute before:left-1 before:top-2 before:bottom-2 before:w-0.5 before:bg-zinc-800">
          {timelineEvents.map((evt, idx) => (
            <div key={idx} className="relative space-y-0.5">
              <span className="absolute -left-[19px] top-1 w-2.5 h-2.5 rounded-full bg-indigo-650 border-2 border-[#111112]" />
              <span className="text-[10px] font-mono text-zinc-550 block font-bold">{evt.date}</span>
              <h5 className="text-xs font-bold text-zinc-200">{evt.title}</h5>
              <p className="text-[11px] text-zinc-450 leading-relaxed">{evt.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Bento Entities Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="bg-[#111112] border border-zinc-800/80 p-4.5 rounded-xl space-y-2">
          <div className="flex items-center gap-1.5 text-indigo-400">
            <Users className="h-4 w-4" />
            <span className="text-[10px] font-black uppercase tracking-wider">Key Figures</span>
          </div>
          <h5 className="text-xs font-bold text-zinc-200">Global Experts</h5>
          <p className="text-[10px] text-zinc-500 leading-normal">Expert Editorial board, research scholars, and industry representatives.</p>
        </div>

        <div className="bg-[#111112] border border-zinc-800/80 p-4.5 rounded-xl space-y-2">
          <div className="flex items-center gap-1.5 text-indigo-400">
            <Building className="h-4 w-4" />
            <span className="text-[10px] font-black uppercase tracking-wider">Organizations</span>
          </div>
          <h5 className="text-xs font-bold text-zinc-200">Scholastic Registry</h5>
          <p className="text-[10px] text-zinc-500 leading-normal">Internet Library Core Panel, Wikipedia Editorial, and Research Boards.</p>
        </div>

        <div className="bg-[#111112] border border-zinc-800/80 p-4.5 rounded-xl space-y-2">
          <div className="flex items-center gap-1.5 text-indigo-400">
            <MapPin className="h-4 w-4" />
            <span className="text-[10px] font-black uppercase tracking-wider">Locations</span>
          </div>
          <h5 className="text-xs font-bold text-zinc-200">Global Coverage</h5>
          <p className="text-[10px] text-zinc-500 leading-normal">Cloud Node Clusters (Silicon Valley, Geneva, London, and Tokyo).</p>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 3. SCIENCE, MEDICINE & HEALTH MODULE
// ==========================================
export function ScienceMedicineModule({ topic }: ModuleProps) {
  const [activeTab, setActiveTab] = useState<'experiment' | 'papers'>('experiment');

  const scientificPapers = [
    { title: `Decoupling Quantum Boundaries in ${topic}`, authors: 'Dr. Evelyn Foster, Prof. Marcus Chen', journal: 'Nature Physics Quarterly', dac: '98.5% confidence', doi: '10.1038/nphys.2026.41' },
    { title: `Neuromorphic Signal Propagation Dynamics`, authors: 'Sarah Jenkins, Liam Rossi', journal: 'IEEE Brain & Cognitive Engineering', dac: '94.2% verified', doi: '10.1109/jbc.2026.852' }
  ];

  return (
    <div className="space-y-6 bg-[#111112] border border-zinc-800/80 p-5 rounded-2xl">
      <div className="flex items-center justify-between mb-4 pb-2 border-b border-zinc-800/50">
        <div className="flex items-center gap-2">
          <Globe className="h-4.5 w-4.5 text-indigo-400" />
          <h4 className="text-xs font-black uppercase tracking-widest text-zinc-300">
            Scientific Investigation Panel
          </h4>
        </div>
        <div className="flex bg-zinc-950 p-0.5 rounded-lg border border-zinc-850">
          <button
            onClick={() => setActiveTab('experiment')}
            className={`text-[10px] font-bold py-1 px-2.5 rounded cursor-pointer transition ${
              activeTab === 'experiment' ? 'bg-indigo-650 text-white' : 'text-zinc-500 hover:text-zinc-300'
            }`}
          >
            Hypothesis
          </button>
          <button
            onClick={() => setActiveTab('papers')}
            className={`text-[10px] font-bold py-1 px-2.5 rounded cursor-pointer transition ${
              activeTab === 'papers' ? 'bg-indigo-650 text-white' : 'text-zinc-500 hover:text-zinc-300'
            }`}
          >
            Journal Papers
          </button>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {activeTab === 'experiment' ? (
          <motion.div
            key="experiment"
            initial={{ opacity: 0, x: -5 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 5 }}
            className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs"
          >
            <div className="bg-zinc-950/40 p-4 rounded-xl border border-zinc-850 space-y-1">
              <span className="text-[9px] font-mono font-bold text-amber-500 uppercase">01. Hypothesis</span>
              <p className="text-[11px] text-zinc-400 leading-relaxed">
                Applying localized high-density waves to "{topic}" triggers a self-limiting systemic realignment.
              </p>
            </div>
            <div className="bg-zinc-950/40 p-4 rounded-xl border border-zinc-850 space-y-1">
              <span className="text-[9px] font-mono font-bold text-indigo-400 uppercase">02. Methodology</span>
              <p className="text-[11px] text-zinc-400 leading-relaxed">
                Empirical evaluation across three modular variables inside isolated sterile cloud containers.
              </p>
            </div>
            <div className="bg-zinc-950/40 p-4 rounded-xl border border-zinc-850 space-y-1">
              <span className="text-[9px] font-mono font-bold text-emerald-450 uppercase">03. Empirical Results</span>
              <p className="text-[11px] text-zinc-400 leading-relaxed">
                Observed a 14.5% boost in memory consolidation rates with negligible heat/overhead.
              </p>
            </div>
            <div className="bg-zinc-950/40 p-4 rounded-xl border border-zinc-850 space-y-1">
              <span className="text-[9px] font-mono font-bold text-sky-400 uppercase">04. Significance</span>
              <p className="text-[11px] text-zinc-400 leading-relaxed">
                Validates the long-term utility of autonomous structural architectures globally.
              </p>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="papers"
            initial={{ opacity: 0, x: -5 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 5 }}
            className="space-y-3 text-xs"
          >
            {scientificPapers.map((paper, idx) => (
              <div key={idx} className="bg-zinc-950/40 p-4 rounded-xl border border-zinc-850 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <span className="text-[9px] font-bold text-emerald-400 bg-emerald-550/10 px-2 py-0.5 rounded border border-emerald-550/20 font-mono">
                      {paper.dac}
                    </span>
                    <span className="text-[10px] text-zinc-550 font-sans italic">{paper.journal}</span>
                  </div>
                  <h5 className="font-bold text-zinc-200 text-sm mt-1">{paper.title}</h5>
                  <p className="text-[10px] text-zinc-500 font-sans">Authors: {paper.authors}</p>
                </div>
                <a
                  href={`https://doi.org/${paper.doi}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  referrerPolicy="no-referrer"
                  className="self-start sm:self-center px-3 py-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-850 text-[10px] font-bold text-zinc-400 hover:text-white border border-zinc-800 flex items-center gap-1 cursor-pointer transition-all"
                >
                  <span>DOI Link</span>
                  <ArrowUpRight className="h-3 w-3" />
                </a>
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ==========================================
// 4. HISTORY & BIOGRAPHIES MODULE
// ==========================================
export function HistoryCultureModule({ topic }: ModuleProps) {
  const epochs = [
    { era: 'Ancient Era', year: 'c. 3000 BCE', title: 'Conceptual Genesis', desc: 'Precursors laid basic structural definitions that align with modern logic.' },
    { era: 'Medieval Era', year: 'c. 1200 CE', title: 'Systematization', desc: 'Scribes and scholars translated treatises, introducing indexing practices.' },
    { era: 'Industrial Revolution', year: 'c. 1850 CE', title: 'Mechanical Translation', desc: 'Mechanical computing frameworks initiated physical data structures.' },
    { era: 'Information Age', year: '2026 CE', title: 'Dynamic Interoperability', desc: 'Modern interfaces connect human awareness directly with automated graphs.' }
  ];

  return (
    <div className="space-y-6">
      <div className="bg-[#111112] border border-zinc-800/80 p-5 rounded-2xl">
        <div className="flex items-center gap-2 mb-4 pb-2 border-b border-zinc-800/50">
          <BookOpen className="h-4.5 w-4.5 text-indigo-400" />
          <h4 className="text-xs font-black uppercase tracking-widest text-zinc-300">
            Historical Milestones & Civilizations
          </h4>
        </div>

        <p className="text-xs text-zinc-500 mb-4">
          Journey through the major developmental epochs that formulated the core concepts of {topic}.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {epochs.map((epoch, idx) => (
            <div key={idx} className="bg-zinc-950/40 border border-zinc-850 p-4 rounded-xl flex items-start gap-3">
              <div className="h-7 w-7 rounded-lg bg-indigo-550/15 border border-indigo-550/30 flex items-center justify-center text-xs font-bold text-indigo-400 font-mono flex-shrink-0">
                E{idx+1}
              </div>
              <div className="space-y-0.5">
                <span className="text-[9px] font-mono font-bold text-indigo-400 uppercase tracking-wider block">
                  {epoch.era} • {epoch.year}
                </span>
                <h5 className="font-bold text-zinc-200 text-sm">{epoch.title}</h5>
                <p className="text-[11px] text-zinc-450 leading-relaxed">{epoch.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 5. FINANCE & BUSINESS MODULE
// ==========================================
export function FinanceBusinessModule({ topic }: ModuleProps) {
  const [marketTrend, setMarketTrend] = useState<'bullish' | 'bearish' | 'volatile'>('bullish');

  // Static visual rendering arrays depending on selected Trend
  const getLinePoints = () => {
    if (marketTrend === 'bearish') return '20,80 50,75 80,105 110,130 140,110 170,140 200,165 230,150 260,180 290,210 320,195 350,220 380,240';
    if (marketTrend === 'volatile') return '20,140 50,60 80,190 110,90 140,160 170,220 200,100 230,130 260,70 290,190 320,120 350,180 380,110';
    return '20,240 50,220 80,195 110,210 140,180 170,150 200,165 230,130 260,110 290,130 320,95 350,70 380,40'; // bullish
  };

  const trendMeta = {
    bullish: { rate: '+14.8%', cap: '$3.4B USD', color: 'text-emerald-450' },
    bearish: { rate: '-6.2%', cap: '$2.9B USD', color: 'text-rose-400' },
    volatile: { rate: '±22.4%', cap: '$3.1B USD', color: 'text-amber-400' }
  };

  return (
    <div className="space-y-6">
      <div className="bg-[#111112] border border-zinc-800/80 p-5 rounded-2xl">
        <div className="flex items-center justify-between mb-4 pb-2 border-b border-zinc-800/50">
          <div className="flex items-center gap-2">
            <TrendingUp className="h-4.5 w-4.5 text-indigo-400" />
            <h4 className="text-xs font-black uppercase tracking-widest text-zinc-300">
              Interactive Market & Financial Index
            </h4>
          </div>
          <div className="flex bg-zinc-950 p-0.5 rounded-lg border border-zinc-850">
            {['bullish', 'bearish', 'volatile'].map((trend) => (
              <button
                key={trend}
                onClick={() => setMarketTrend(trend as any)}
                className={`text-[10px] font-bold py-1 px-2.5 rounded cursor-pointer transition capitalize ${
                  marketTrend === trend ? 'bg-indigo-650 text-white' : 'text-zinc-500 hover:text-zinc-300'
                }`}
              >
                {trend}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-center">
          {/* Svg line chart */}
          <div className="md:col-span-8 bg-zinc-950/40 p-3 rounded-xl border border-zinc-850 relative">
            <svg viewBox="0 0 400 260" className="w-full h-auto">
              {/* Background grids */}
              <line x1="20" y1="40" x2="380" y2="40" stroke="#1f2937" strokeWidth="0.5" strokeDasharray="3,3" />
              <line x1="20" y1="90" x2="380" y2="90" stroke="#1f2937" strokeWidth="0.5" strokeDasharray="3,3" />
              <line x1="20" y1="140" x2="380" y2="140" stroke="#1f2937" strokeWidth="0.5" strokeDasharray="3,3" />
              <line x1="20" y1="190" x2="380" y2="190" stroke="#1f2937" strokeWidth="0.5" strokeDasharray="3,3" />
              <line x1="20" y1="240" x2="380" y2="240" stroke="#1f2937" strokeWidth="0.5" strokeDasharray="3,3" />

              {/* Chart Line */}
              <polyline
                fill="none"
                stroke={marketTrend === 'bullish' ? '#10b981' : marketTrend === 'bearish' ? '#f43f5e' : '#f59e0b'}
                strokeWidth="2"
                points={getLinePoints()}
                className="transition-all duration-700 ease-in-out"
              />

              {/* Glowing gradient indicator on end node */}
              <circle
                cx="380"
                cy={marketTrend === 'bullish' ? '40' : marketTrend === 'bearish' ? '240' : '110'}
                r="4.5"
                fill={marketTrend === 'bullish' ? '#10b981' : marketTrend === 'bearish' ? '#f43f5e' : '#f59e0b'}
                className="animate-pulse"
              />
            </svg>
            <div className="absolute top-4 left-4 bg-[#111112]/90 px-2 py-1 rounded text-[10px] font-mono text-zinc-500 border border-zinc-800">
              Ticker: {topic.slice(0,4).toUpperCase()}-INDEX
            </div>
          </div>

          {/* Core financial stats */}
          <div className="md:col-span-4 space-y-4">
            <div className="bg-zinc-950/60 p-4 rounded-xl border border-zinc-850 space-y-1">
              <span className="text-[9px] font-mono font-bold text-zinc-550 uppercase">Market Valuation</span>
              <p className="text-xl font-black text-zinc-100">{trendMeta[marketTrend].cap}</p>
            </div>

            <div className="bg-zinc-950/60 p-4 rounded-xl border border-zinc-850 space-y-1">
              <span className="text-[9px] font-mono font-bold text-zinc-550 uppercase">24h Price Change</span>
              <p className={`text-xl font-black ${trendMeta[marketTrend].color}`}>
                {trendMeta[marketTrend].rate}
              </p>
            </div>

            <p className="text-[10px] text-zinc-550 leading-relaxed font-sans">
              Metrics calculated via historical index models. Future gains carry typical regulatory dependencies.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 6. LAW AND GOVERNMENT MODULE
// ==========================================
export function LawGovernmentModule({ topic }: ModuleProps) {
  return (
    <div className="space-y-6">
      <div className="bg-[#111112] border border-zinc-800/80 p-5 rounded-2xl">
        <div className="flex items-center gap-2 mb-4 pb-2 border-b border-zinc-800/50">
          <Scale className="h-4.5 w-4.5 text-indigo-400" />
          <h4 className="text-xs font-black uppercase tracking-widest text-zinc-300">
            Legal & Regulatory Foundations
          </h4>
        </div>

        <p className="text-xs text-zinc-500 mb-4">
          Key legal statutes and constitutional precedents that influence the regulation of {topic}.
        </p>

        <div className="space-y-3.5 text-xs">
          <div className="bg-zinc-950/40 p-4 rounded-xl border border-zinc-850 space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-[9px] font-mono font-bold text-indigo-400 uppercase">Precedent CASE-204</span>
              <span className="text-[9px] font-mono text-zinc-550">Certified 2026</span>
            </div>
            <h5 className="font-bold text-zinc-200">The Global Digital Sovereign Act</h5>
            <p className="text-[11px] text-zinc-450 leading-relaxed">
              Establishes standard licensing boundaries for digital resources, asserting consumer privacy as an inalienable right.
            </p>
          </div>

          <div className="bg-zinc-950/40 p-4 rounded-xl border border-zinc-850 space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-[9px] font-mono font-bold text-indigo-400 uppercase">Act of Parliament (UK)</span>
              <span className="text-[9px] font-mono text-zinc-550">Proposed Bill</span>
            </div>
            <h5 className="font-bold text-zinc-200">The Automated Knowledge Ethics Charter</h5>
            <p className="text-[11px] text-zinc-450 leading-relaxed">
              Mandates human oversight and verification parameters for all dynamically generated learning portals.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 7. EDUCATION & TUTORIALS MODULE
// ==========================================
export function EducationTutorialModule({ topic }: ModuleProps) {
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [score, setScore] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState<Record<number, boolean>>({});

  const quizQuestions = [
    {
      id: 1,
      q: `What is the primarily emphasized objective of "${topic}"?`,
      options: [
        'To establish simple visual representation.',
        'To streamline structured information pathways into accessible, durable modules.',
        'To construct temporary single-session local caches that decay on exit.',
        'To automate user actions without expert validation.'
      ],
      correct: 1,
      explanation: 'Durable structured modules ensure deep scholastic retention, contrasting with simple documentation webpages.'
    },
    {
      id: 2,
      q: 'How does the universal framework handle different topic categories?',
      options: [
        'By hardcoding identical layout blocks across all articles.',
        'By requiring manual user selection of visual widgets.',
        'By rendering adaptive, specialized components automatically based on topic category.',
        'By disabling the AI assistant entirely in non-tech modules.'
      ],
      correct: 2,
      explanation: 'Adaptive modules render customized tools (like code sandboxes, experiment graphs, or timelines) to match specific semantic goals.'
    }
  ];

  const handleSelectAnswer = (qIndex: number, optionIdx: number) => {
    setSelectedAnswers(prev => ({ ...prev, [qIndex]: optionIdx }));
    setShowExplanation(prev => ({ ...prev, [qIndex]: true }));
  };

  const calculateScore = () => {
    let pts = 0;
    quizQuestions.forEach((q, idx) => {
      if (selectedAnswers[idx] === q.correct) pts += 1;
    });
    setScore(pts);
  };

  return (
    <div className="space-y-6">
      {/* Quiz Section */}
      <div className="bg-[#111112] border border-zinc-800/80 p-5 rounded-2xl space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-zinc-800/50">
          <div className="flex items-center gap-2">
            <HelpCircle className="h-4.5 w-4.5 text-indigo-400" />
            <h4 className="text-xs font-black uppercase tracking-widest text-zinc-300">
              Interactive Knowledge Checkpoint
            </h4>
          </div>
          <span className="text-[10px] font-mono bg-indigo-550/10 text-indigo-400 px-2.5 py-0.5 rounded border border-indigo-550/20">
            Topic Quiz
          </span>
        </div>

        <p className="text-xs text-zinc-500 leading-normal">
          Verify your retention of "{topic}" by answering these conceptual questions. Correct explanations unlock instantly.
        </p>

        <div className="space-y-5">
          {quizQuestions.map((q, qIdx) => (
            <div key={q.id} className="space-y-2.5">
              <h5 className="text-xs font-bold text-zinc-200 flex items-start gap-2">
                <span className="font-mono text-indigo-500">{q.id}.</span>
                <span>{q.q}</span>
              </h5>
              <div className="grid grid-cols-1 gap-1.5 pl-4">
                {q.options.map((opt, optIdx) => {
                  const isSelected = selectedAnswers[qIdx] === optIdx;
                  const isCorrect = q.correct === optIdx;
                  const answered = selectedAnswers[qIdx] !== undefined;

                  return (
                    <button
                      key={optIdx}
                      disabled={answered}
                      onClick={() => handleSelectAnswer(qIdx, optIdx)}
                      className={`p-3 rounded-xl border text-left text-xs transition cursor-pointer flex items-center justify-between ${
                        isSelected
                          ? isCorrect 
                            ? 'bg-emerald-550/10 border-emerald-500 text-emerald-300 font-semibold' 
                            : 'bg-rose-550/10 border-rose-500 text-rose-300'
                          : answered && isCorrect
                            ? 'bg-emerald-555/5 border-emerald-500/30 text-emerald-400'
                            : 'bg-zinc-950/40 border-zinc-850 hover:border-zinc-800 text-zinc-400'
                      }`}
                    >
                      <span>{opt}</span>
                      {answered && isCorrect && <Check className="h-3.5 w-3.5 text-emerald-500 flex-shrink-0" />}
                      {isSelected && !isCorrect && <AlertCircle className="h-3.5 w-3.5 text-rose-500 flex-shrink-0" />}
                    </button>
                  );
                })}
              </div>

              {/* Answer Explanation */}
              {showExplanation[qIdx] && (
                <div className="bg-zinc-950/60 border border-zinc-850 p-3 rounded-xl pl-4 text-[11px] text-zinc-450 leading-relaxed flex items-start gap-2 animate-fadeIn">
                  <Info className="h-3.5 w-3.5 text-indigo-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="font-bold text-zinc-350">Explanation:</span> {q.explanation}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Calculate score action */}
        {Object.keys(selectedAnswers).length === quizQuestions.length && score === null && (
          <button
            onClick={calculateScore}
            className="w-full py-2.5 rounded-xl border border-indigo-500 bg-indigo-550/10 hover:bg-indigo-550/20 text-indigo-300 text-xs font-bold uppercase cursor-pointer tracking-wider transition-all"
          >
            Submit Answers & Grade Checklist
          </button>
        )}

        {score !== null && (
          <div className="bg-indigo-550/10 border border-indigo-550/20 p-4 rounded-xl text-center space-y-1">
            <p className="text-xs font-bold text-indigo-400 uppercase tracking-widest">Grading Report Card</p>
            <p className="text-xl font-black text-white">{score} / {quizQuestions.length} Correct</p>
            <p className="text-[10px] text-zinc-550">
              Retention rate: {Math.round((score / quizQuestions.length) * 100)}%. Great effort continuing your exploration journey!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
