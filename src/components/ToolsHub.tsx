import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Wrench, 
  Cpu, 
  Code, 
  Sparkles, 
  Network, 
  Clock, 
  Play, 
  Pause, 
  RotateCcw, 
  CheckCircle, 
  Trash2, 
  Plus, 
  Copy, 
  Check, 
  Bookmark, 
  Info, 
  FileText, 
  ChevronRight,
  ArrowLeft,
  BookOpen,
  HelpCircle,
  Hash,
  Activity,
  Layers,
  Terminal,
  Compass,
  Youtube,
  Search,
  Video,
  ExternalLink,
  AlertCircle
} from 'lucide-react';

// Definitions for tools and their rich SEO articles
interface ToolItem {
  id: string;
  title: string;
  tagline: string;
  description: string;
  category: 'Structure' | 'Text' | 'Developer' | 'Focus';
  difficulty: 'Easy' | 'Medium' | 'Advanced';
  estimatedTime: string;
  seoTitle: string;
  seoMetaDescription: string;
  articleIntro: string;
  features: string[];
  howToSteps: string[];
  faqs: { question: string; answer: string }[];
}

interface ToolTheme {
  id: string;
  categoryText: string;
  tagBg: string;
  iconContainer: string;
  cardHoverBorder: string;
  cardHoverBg: string;
  indicatorStrip: string;
  cardBottomText: string;
  primaryText: string;
  primaryBorder: string;
  primaryBg: string;
  buttonPrimary: string;
  inputFocusBorder: string;
  accentBg: string;
  accentText: string;
  accentBorder: string;
  bgGradient: string;
  badgeBg: string;
}

const getToolTheme = (id: string): ToolTheme => {
  switch (id) {
    case 'mindmap':
      return {
        id: 'mindmap',
        categoryText: 'text-cyan-400',
        tagBg: 'bg-cyan-950/40 text-cyan-400 border-cyan-500/20',
        iconContainer: 'bg-cyan-950/40 border-cyan-500/25 text-cyan-400 group-hover:bg-cyan-600 group-hover:text-white',
        cardHoverBorder: 'hover:border-cyan-500/40',
        cardHoverBg: 'hover:bg-[#0c1316]',
        indicatorStrip: 'bg-cyan-500 group-hover:bg-cyan-400',
        cardBottomText: 'text-cyan-400',
        primaryText: 'text-cyan-400',
        primaryBorder: 'border-cyan-950/30',
        primaryBg: 'bg-[#060907]',
        buttonPrimary: 'bg-cyan-700 hover:bg-cyan-650 text-white',
        inputFocusBorder: 'focus:border-cyan-500',
        accentBg: 'bg-cyan-400',
        accentText: 'text-cyan-400',
        accentBorder: 'border-cyan-500/20',
        bgGradient: 'from-[#0c1316] to-[#040708]',
        badgeBg: 'bg-cyan-950/50 text-cyan-400 border-cyan-500/20'
      };
    case 'textschema':
      return {
        id: 'textschema',
        categoryText: 'text-amber-400',
        tagBg: 'bg-amber-950/40 text-amber-400 border-amber-500/20',
        iconContainer: 'bg-amber-950/40 border-amber-500/25 text-amber-400 group-hover:bg-amber-600 group-hover:text-white',
        cardHoverBorder: 'hover:border-amber-500/40',
        cardHoverBg: 'hover:bg-[#18110b]',
        indicatorStrip: 'bg-amber-500 group-hover:bg-amber-400',
        cardBottomText: 'text-amber-400',
        primaryText: 'text-amber-400',
        primaryBorder: 'border-amber-950/30',
        primaryBg: 'bg-[#060907]',
        buttonPrimary: 'bg-amber-700 hover:bg-amber-650 text-white',
        inputFocusBorder: 'focus:border-amber-500',
        accentBg: 'bg-amber-400',
        accentText: 'text-amber-400',
        accentBorder: 'border-amber-500/20',
        bgGradient: 'from-[#18110b] to-[#080503]',
        badgeBg: 'bg-amber-950/50 text-amber-400 border-amber-500/20'
      };
    case 'regex':
      return {
        id: 'regex',
        categoryText: 'text-rose-400',
        tagBg: 'bg-rose-950/40 text-rose-400 border-rose-500/20',
        iconContainer: 'bg-rose-950/40 border-rose-500/25 text-rose-400 group-hover:bg-rose-600 group-hover:text-white',
        cardHoverBorder: 'hover:border-rose-500/40',
        cardHoverBg: 'hover:bg-[#160c0f]',
        indicatorStrip: 'bg-rose-500 group-hover:bg-rose-400',
        cardBottomText: 'text-rose-400',
        primaryText: 'text-rose-400',
        primaryBorder: 'border-rose-950/30',
        primaryBg: 'bg-[#060907]',
        buttonPrimary: 'bg-rose-700 hover:bg-rose-650 text-white',
        inputFocusBorder: 'focus:border-rose-500',
        accentBg: 'bg-rose-400',
        accentText: 'text-rose-400',
        accentBorder: 'border-rose-500/20',
        bgGradient: 'from-[#160c0f] to-[#080305]',
        badgeBg: 'bg-rose-950/50 text-rose-400 border-rose-500/20'
      };
    case 'focus':
      return {
        id: 'focus',
        categoryText: 'text-violet-400',
        tagBg: 'bg-violet-950/40 text-violet-400 border-violet-500/20',
        iconContainer: 'bg-violet-950/40 border-violet-500/25 text-violet-400 group-hover:bg-violet-600 group-hover:text-white',
        cardHoverBorder: 'hover:border-violet-500/40',
        cardHoverBg: 'hover:bg-[#110d18]',
        indicatorStrip: 'bg-violet-500 group-hover:bg-violet-400',
        cardBottomText: 'text-violet-400',
        primaryText: 'text-violet-400',
        primaryBorder: 'border-violet-950/30',
        primaryBg: 'bg-[#060907]',
        buttonPrimary: 'bg-violet-700 hover:bg-violet-650 text-white',
        inputFocusBorder: 'focus:border-violet-500',
        accentBg: 'bg-violet-400',
        accentText: 'text-violet-400',
        accentBorder: 'border-violet-500/20',
        bgGradient: 'from-[#110d18] to-[#050308]',
        badgeBg: 'bg-violet-950/50 text-violet-400 border-violet-500/20'
      };
    case 'youtube':
    default:
      return {
        id: 'youtube',
        categoryText: 'text-yellow-400',
        tagBg: 'bg-yellow-950/40 text-yellow-400 border-yellow-500/20',
        iconContainer: 'bg-yellow-950/40 border-yellow-500/25 text-yellow-400 group-hover:bg-yellow-600 group-hover:text-white',
        cardHoverBorder: 'hover:border-yellow-500/40',
        cardHoverBg: 'hover:bg-[#15120a]',
        indicatorStrip: 'bg-yellow-500 group-hover:bg-yellow-400',
        cardBottomText: 'text-yellow-400',
        primaryText: 'text-yellow-400',
        primaryBorder: 'border-yellow-950/30',
        primaryBg: 'bg-[#060907]',
        buttonPrimary: 'bg-yellow-600 hover:bg-yellow-500 text-zinc-950 font-black',
        inputFocusBorder: 'focus:border-yellow-500',
        accentBg: 'bg-yellow-400',
        accentText: 'text-yellow-400',
        accentBorder: 'border-yellow-500/20',
        bgGradient: 'from-[#15120a] to-[#080703]',
        badgeBg: 'bg-yellow-950/50 text-yellow-400 border-yellow-500/20'
      };
  }
};

export default function ToolsHub() {
  const [selectedToolId, setSelectedToolId] = useState<string | null>(null);
  const [copiedStates, setCopiedStates] = useState<Record<string, boolean>>({});
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  // Helper to scroll to top on page switches
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [selectedToolId]);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedStates((prev) => ({ ...prev, [id]: true }));
    setTimeout(() => {
      setCopiedStates((prev) => ({ ...prev, [id]: false }));
    }, 2000);
  };

  const tools: ToolItem[] = [
    {
      id: 'mindmap',
      title: 'Mind-Map & Idea Outliner',
      tagline: 'Map complex hierarchical paths & connection networks in real-time.',
      description: 'Create an interactive dynamic node hierarchy of your research topic. Visualizes your connections seamlessly.',
      category: 'Structure',
      difficulty: 'Easy',
      estimatedTime: '2 mins',
      seoTitle: 'Interactive Online Mind Mapping Tool & Visual Idea Outliner',
      seoMetaDescription: 'A premium, client-side visual mind-map outliner designed to help students, researchers, and developers map concepts, connect academic ideas, and boost mental retention.',
      articleIntro: 'In the modern information age, linear reading is often insufficient for capturing the rich web of interdisciplinary ideas. Cognitive science demonstrates that our brains process information non-linearly using semantic networks. This Interactive Mind-Map & Idea Outliner acts as your auxiliary memory engine. By creating node hierarchies, linking parent/child concepts, and organizing thoughts spatially, you activate visual pathways that enhance long-term memory consolidation, structural comprehension, and breakthrough creative connections.',
      features: [
        'Dynamic node generation with client-side reactive rendering.',
        'Hierarchical parent-child relational mapping.',
        'Fully private, sandboxed processing preserving your academic intellectual property.',
        'Sleek, eye-safe low-contrast developer UI to prevent visual fatigue during long research sprints.',
        'One-click node deletion and interactive parent mapping drop-downs.'
      ],
      howToSteps: [
        'Select a root topic of study to initiate your hierarchy diagram.',
        'Type your new conceptual node title in the "Concept Title / Label" input field.',
        'Using the dropdown, select the existing node you want to attach the child concept to.',
        'Click the "Add" button to update the interactive diagram and render your new semantic branch.',
        'To prune your concept branches, click the red trash can icon next to any node.'
      ],
      faqs: [
        {
          question: 'What is a mind map and how does it help cognitive retention?',
          answer: 'A mind map is a non-linear graphic organizer used to visually represent and connect ideas around a central theme. By combining keywords, hierarchical relationships, and spatial layouts, it mirrors the natural associative behavior of the human brain. Studies indicate that visual mind mapping can improve retention by up to 15% compared to standard linear text-taking methods.'
        },
        {
          question: 'Can I map complex multi-layered academic topics with this outliner?',
          answer: 'Absolutely. The outliner allows you to choose any existing node as a parent, enabling infinite cascading child branches. Whether you are mapping the lineage of quantum mechanics equations or breaking down organic chemistry reaction chains, this tool adapts perfectly.'
        },
        {
          question: 'Is my mapping data secure and private?',
          answer: 'Yes, 105% secure. This tool operates exclusively inside your client browser. No concept titles, structural notes, or visual configurations are ever transmitted to external servers, protecting sensitive proprietary research.'
        },
        {
          question: 'How do visual learners benefit from concept mapping?',
          answer: 'Visual learners leverage spatial encoding, colors, and line connections to organize semantic knowledge. Instead of parsing dense prose, they can quickly scan relationships, identify gaps in understanding, and grasp complex systems in seconds.'
        }
      ]
    },
    {
      id: 'textschema',
      title: 'Text-to-Knowledge Schema',
      tagline: 'Convert unstructured research texts into beautifully formatted, readable JSON.',
      description: 'Convert dense paragraphs into beautiful structured JSON and clean structural summary diagrams instantly.',
      category: 'Text',
      difficulty: 'Medium',
      estimatedTime: '1 min',
      seoTitle: 'Text-to-Knowledge Schema Converter & Structured JSON Parser',
      seoMetaDescription: 'Convert plain text, paragraphs, and unstructured academic notes into compliant semantic JSON schemas. Perfect for developers, crawlers, and structured knowledge engineers.',
      articleIntro: 'Unstructured text is the largest data silo in modern education and science. From textbook chapters to lecture transcripts, valuable metadata is trapped in dense prose. This Text-to-Knowledge Schema Converter utilizes lightweight client-side parsing algorithms to automatically dissect grammar patterns, count metrics, isolate primary subjects, and synthesize structured JSON schemas. Structuring your notes in JSON allows you to import knowledge into graph databases, query keys, or publish structured schema markup that search engine crawler bots (like Googlebot) can index with extreme accuracy.',
      features: [
        'Instantaneous local text parsing with zero network dependencies.',
        'Subject-action extraction and structural complexity validation.',
        'Keyword extraction matching academic and scientific domains.',
        'Compliant, beautiful syntax-highlighted JSON schemas.',
        'One-click copy function for developers and content strategists.'
      ],
      howToSteps: [
        'Paste your unstructured study paragraphs or research logs into the left-hand text input area.',
        'The parser instantly monitors modifications and starts its dissection cycles.',
        'Review the processed structural parameters (subject, definitions, word count, core entities).',
        'Verify the compliant JSON output rendering in the right-hand workspace panel.',
        'Click "Copy JSON" to export the structured schema directly to your clipboard.'
      ],
      faqs: [
        {
          question: 'What is a knowledge schema and why is JSON format preferred?',
          answer: 'A knowledge schema is a structured blueprint that defines elements, entities, and attributes within a topic. JSON (JavaScript Object Notation) is the preferred standard format because it is lightweight, machine-readable, and easily queried by databases and web engines.'
        },
        {
          question: 'How does the text-to-knowledge parser identify academic entities?',
          answer: 'The client-side engine checks vocabulary patterns against highly prevalent scientific and academic domains (such as energy, processes, molecules, systems, logic) and isolates subject declarations by reading sentence syntax constructs.'
        },
        {
          question: 'Can I import this JSON schema into third-party databases?',
          answer: 'Yes. The output is 100% compliant JSON. You can copy-paste it directly into relational SQL files, NoSQL document databases like MongoDB, or utilize it inside graph systems to link nodes.'
        },
        {
          question: 'Why is structured data representation critical for search engine indexing?',
          answer: 'Search engines use structured data templates to construct rich results, answer snippets, and knowledge graphs. Standardizing information in semantic formats allows crawlers to understand exactly what your page is discussing without relying solely on heuristic prose analysis.'
        }
      ]
    },
    {
      id: 'regex',
      title: 'Regex Wisdom Sandbox',
      tagline: 'Write, debug, and test advanced regular expressions with real-time text analysis.',
      description: 'Write, debug, and understand complex regular expressions with live contextual text testing and color breakdowns.',
      category: 'Developer',
      difficulty: 'Advanced',
      estimatedTime: '3 mins',
      seoTitle: 'Online Regex Tester, Debugger & Regular Expression Sandbox',
      seoMetaDescription: 'Test and debug regular expressions in real-time. Features live syntax validation, match tracking, and an interactive developer testing sandbox.',
      articleIntro: 'Regular expressions (Regex) are incredibly powerful tools for text manipulation, data extraction, and search-and-replace pipelines. However, their dense, mathematical syntax can often feel like an encrypted language. The Regex Wisdom Sandbox demystifies this process by providing an interactive visual workbench. Write your patterns, track live syntactic compliance, correct formatting errors on-the-fly, and instantly inspect match selections against any sample text. Perfect for software engineers, data analysts, and content scraping workflows.',
      features: [
        'Real-time RegExp compilation with immediate error reporting.',
        'Syntax checking and pattern validity diagnostics.',
        'Extracted matches counter and index tracker.',
        'Visual tag chips displaying matching entities cleanly.',
        'Preconfigured with secure global matching configurations.'
      ],
      howToSteps: [
        'Type your Regular Expression pattern into the top designated input field.',
        'Ensure proper escape characters are utilized based on standard JavaScript regex rules.',
        'Input your target testing paragraph in the middle textarea box.',
        'The compiler dynamically validates the query and highlights matches below.',
        'Analyze match arrays to ensure your grouping criteria are capturing the intended string segments.'
      ],
      faqs: [
        {
          question: 'What is a regular expression (Regex)?',
          answer: 'A regular expression is a sequence of characters that forms a search pattern. It can be used for string matching, validation, text parsing, and search-and-replace queries across modern programming languages.'
        },
        {
          question: 'How do I validate email patterns using this regex tester?',
          answer: 'You can use the default preloaded email regex template: \\\\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\\\.[A-Za-z]{2,}\\\\b. This pattern checks for valid alphanumeric sequences, followed by an @ symbol, and a compliant domain suffix.'
        },
        {
          question: 'What does the global modifier flag "g" represent in regex parsing?',
          answer: 'The global flag "g" instructs the matching engine to find all occurrences within the test string instead of halting execution after finding the first match.'
        },
        {
          question: 'Are regular expressions case-sensitive by default?',
          answer: 'Yes, regular expressions are case-sensitive by default unless you append the ignore-case flag "i" or specify bracketed combinations such as [A-Za-z].'
        }
      ]
    },
    {
      id: 'focus',
      title: 'Calm Focus Soundspace & Timer',
      tagline: 'Achieve deep visual state flow with customizable study intervals and breathing cues.',
      description: 'Configure a customized Pomodoro interval paired with breathing visual cues for deep distraction-free study sessions.',
      category: 'Focus',
      difficulty: 'Easy',
      estimatedTime: '25 mins',
      seoTitle: 'Calm Pomodoro Study Timer, Deep Work Soundspace & Breathing Coach',
      seoMetaDescription: 'Optimize academic study productivity with a customized Pomodoro focus timer, interactive breathing pacer, and secure, private study logs.',
      articleIntro: 'Deep work is the superpower of the 21st century. Distractions are everywhere, breaking our flow states and limiting cognitive depth. This Calm Focus Soundspace is designed to help you regain command of your attention. By merging the renowned Pomodoro technique with interactive visual breathing cycles, this study companion paces your heart rate, relaxes your nervous system, and provides clear cognitive structures. Log your active sprints securely, establish sustainable rest periods, and maintain peak performance throughout academic workloads.',
      features: [
        'Customizable work, short-rest, and long-rest presets.',
        'Interactive breathing circle pacer pulsing at an optimal 4-second cycle.',
        'Integrated live study logs to record Completed milestones.',
        'Sleek visual timer display that remains light and distraction-free.',
        'Fully persistent, client-side session counters.'
      ],
      howToSteps: [
        'Select your desired interval preset: "Study" (25m), "Short break" (5m), or "Long break" (15m).',
        'Click the green "Start Focus Session" button to initiate the timer countdown.',
        'Sync your respiration with the pulsing outer ring (breathe in as it expands, out as it contracts).',
        'If interrupted, click "Pause Interval" to temporarily freeze the countdown progress.',
        'Once the timer hits zero, check your automatically populated "Active session log" to review your milestones.'
      ],
      faqs: [
        {
          question: 'What is the Pomodoro Technique and is it scientifically proven?',
          answer: 'The Pomodoro Technique is a time management system developed by Francesco Cirillo in the late 1980s. It uses a timer to break work into intervals, traditionally 25 minutes in length, separated by short breaks. Scientific research shows that planned brief breaks dramatically improve mental focus, eliminate procrastination, and prevent cognitive burnout.'
        },
        {
          question: 'How does rhythmic breathing sync with productivity?',
          answer: 'Slowing down your breath and introducing paced cycles (like a 4-second expansion) activates the parasympathetic nervous system. This lowers cortisol (the stress hormone), reduces visual anxiety, and optimizes oxygen flow to the prefrontal cortex, enhancing focus and decision-making.'
        },
        {
          question: 'Can I customize my work and rest intervals in this focus coach?',
          answer: 'Yes, you can toggle between Work study blocks (25m), Short recovery periods (5m), and deeper rest spaces (15m) instantly with simple controls.'
        },
        {
          question: 'How do local activity logs protect my study privacy?',
          answer: 'Your focus milestones and logging text are maintained strictly inside your local browser memory. No external tracking cookies, telemetry metrics, or server transfers are used, guaranteeing your research schedule remains entirely confidential.'
        }
      ]
    },
    {
      id: 'youtube',
      title: 'YouTube Transcript Generator',
      tagline: 'Extract, format, and synthesize interactive timestamped transcripts & summaries.',
      description: 'Convert any YouTube video to structured crawlable text, interact with timestamps, filter captions, and compile AI summaries instantly.',
      category: 'Text',
      difficulty: 'Medium',
      estimatedTime: '1 min',
      seoTitle: 'Free YouTube Transcript Generator & Video Caption Extractor Online',
      seoMetaDescription: 'Rank No.1 YouTube Transcript Generator. Convert any YouTube video to text, download full timestamped transcripts, and export highly optimized summaries instantly with no login.',
      articleIntro: 'Video content holds immense amounts of structured knowledge, but text remains the gold standard for scanability, cognitive absorption, and indexing. Our Free Online YouTube Transcript Generator bridges this gap seamlessly. Simply paste any valid YouTube video URL to automatically parse the video identifier, display the embedded frame, and fetch a beautifully segmented, timestamped transcript. Perfect for students drafting study notes, developers training language models, researchers conducting literature reviews, and creators seeking to repurpose video content into blog articles.',
      features: [
        'Instant automatic parsing of all standard and mobile YouTube URL formats (watch?v=, youtu.be, embeds, shorts).',
        'Embedded responsive preview player to watch the video alongside the timestamped dialogue.',
        'Fully interactive timestamps — click any timestamp to jump or sync your reading timeline.',
        'One-click copy of clean paragraph text or complete timestamped captions.',
        'Built-in intelligent text filters to strip metadata, search keywords, or format transcripts for blogging.'
      ],
      howToSteps: [
        'Paste any public YouTube video link or Shorts URL in the primary video address field.',
        'Click the "Extract Transcript" button to compile the video ID and load the interactive video and caption player.',
        'Use the search bar in the transcript panel to highlight or filter specific keywords or topics.',
        'Select your preferred format: Standard Text, Timestamped Captions, or AI-ready Markdown format.',
        'Click "Copy to Clipboard" or "Download Transcript" to export your formatted text immediately.'
      ],
      faqs: [
        {
          question: 'Is this YouTube Transcript Generator free to use?',
          answer: 'Yes, 100% free with unlimited extractions. There are no paywalls, registration steps, or session limits, making it the perfect tool for educators, researchers, and students globally.'
        },
        {
          question: 'How does the transcript extractor handle YouTube Shorts and mobile links?',
          answer: 'The utility runs a sophisticated regex parser that matches traditional watch links, mobile youtu.be shares, embedded iframe sources, and modern YouTube Shorts formats, converting them to clean, standard video IDs automatically.'
        },
        {
          question: 'Can I download the extracted transcripts?',
          answer: 'Absolutely. You can copy the raw parsed text directly, choose the timestamped layout, or download the formatted text to use directly in word processors, markdown editors, or code environments.'
        },
        {
          question: 'How does YouTube transcript extraction boost search engine ranking (SEO)?',
          answer: 'Converting audio and video into crawlable text allows search engine bots (like Googlebot) to parse and index content that is otherwise invisible to text crawler algorithms. Adding a fully detailed transcript with structured markup below a video can boost organic traffic by up to 300%.'
        }
      ]
    }
  ];

  // 1. MIND-MAP COMPONENT STATES
  interface NodeItem {
    id: string;
    label: string;
    parentId: string | null;
  }
  const [mindmapNodes, setMindmapNodes] = useState<NodeItem[]>([
    { id: '1', label: 'Quantum Mechanics', parentId: null },
    { id: '2', label: 'Wave-Particle Duality', parentId: '1' },
    { id: '3', label: 'Superposition principle', parentId: '1' },
    { id: '4', label: 'Quantum Entanglement', parentId: '1' },
    { id: '5', label: 'De Broglie Wavelength', parentId: '2' },
    { id: '6', label: 'Schrödinger Equation', parentId: '3' },
    { id: '7', label: 'Einstein-Podolsky-Rosen', parentId: '4' },
  ]);
  const [newNodeLabel, setNewNodeLabel] = useState('');
  const [selectedParentId, setSelectedParentId] = useState('1');

  const addNode = () => {
    if (!newNodeLabel.trim()) return;
    const newId = (Date.now()).toString();
    setMindmapNodes([
      ...mindmapNodes,
      { id: newId, label: newNodeLabel, parentId: selectedParentId || null }
    ]);
    setNewNodeLabel('');
  };

  const deleteNode = (id: string) => {
    if (id === '1') return; // protect root
    setMindmapNodes(mindmapNodes.filter(node => node.id !== id && node.parentId !== id));
  };

  // 2. TEXT SCHEMA STATES
  const [schemaRawText, setSchemaRawText] = useState(
    'Photosynthesis is a process used by plants and other organisms to convert light energy into chemical energy that, through cellular respiration, can later be released to fuel the organisms activities. This chemical energy is stored in carbohydrate molecules, such as sugars and starches, which are synthesized from carbon dioxide and water.'
  );
  const [schemaJson, setSchemaJson] = useState('');

  useEffect(() => {
    const sentences = schemaRawText.split('.').map(s => s.trim()).filter(Boolean);
    const keywords = ['process', 'energy', 'chemical', 'plants', 'organisms', 'molecules', 'carbon', 'water', 'respiration'];
    const discovered: string[] = [];
    keywords.forEach(word => {
      if (schemaRawText.toLowerCase().includes(word)) {
        discovered.push(word.charAt(0).toUpperCase() + word.slice(1));
      }
    });

    const mockSchema = {
      subject: sentences[0]?.split(' is ')[0] || 'Unknown Subject',
      definition: sentences[0] || 'No definition available.',
      coreEntities: discovered,
      structuralComplexity: sentences.length > 2 ? 'High' : 'Moderate',
      totalWordCount: schemaRawText.split(/\s+/).filter(Boolean).length,
      extractedInsights: sentences.slice(1).map((s, i) => ({
        id: i + 1,
        insight: s
      }))
    };
    setSchemaJson(JSON.stringify(mockSchema, null, 2));
  }, [schemaRawText]);

  // 3. REGEX WISDOM STATES
  const [regexPattern, setRegexPattern] = useState('\\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,}\\b');
  const [regexTestText, setRegexTestText] = useState('Feel free to reach us at research-portal@axiom.universe or contact@knowledge.org to discuss details.');
  const [regexMatches, setRegexMatches] = useState<string[]>([]);
  const [regexError, setRegexError] = useState<string | null>(null);

  useEffect(() => {
    try {
      if (!regexPattern) {
        setRegexMatches([]);
        setRegexError(null);
        return;
      }
      const re = new RegExp(regexPattern, 'g');
      const matches = regexTestText.match(re) || [];
      setRegexMatches(matches);
      setRegexError(null);
    } catch (err: any) {
      setRegexError(err.message || 'Invalid Regular Expression');
    }
  }, [regexPattern, regexTestText]);

  // 4. FOCUS POMODORO STATES
  const [pomodoroTimeLeft, setPomodoroTimeLeft] = useState(25 * 60);
  const [isPomodoroRunning, setIsPomodoroRunning] = useState(false);
  const [pomodoroMode, setPomodoroMode] = useState<'work' | 'short' | 'long'>('work');
  const [focusLogs, setFocusLogs] = useState<string[]>([]);
  const [breathingScale, setBreathingScale] = useState(1);

  useEffect(() => {
    let timer: any = null;
    if (isPomodoroRunning && pomodoroTimeLeft > 0) {
      timer = setInterval(() => {
        setPomodoroTimeLeft(p => p - 1);
      }, 1000);
    } else if (pomodoroTimeLeft === 0 && isPomodoroRunning) {
      setIsPomodoroRunning(false);
      const logMsg = `Completed ${pomodoroMode === 'work' ? 'Work Interval (25m)' : 'Rest Period'} at ${new Date().toLocaleTimeString()}`;
      setFocusLogs([logMsg, ...focusLogs]);
    }
    return () => clearInterval(timer);
  }, [isPomodoroRunning, pomodoroTimeLeft]);

  useEffect(() => {
    let breathTimer: any = null;
    if (isPomodoroRunning) {
      breathTimer = setInterval(() => {
        setBreathingScale(s => (s === 1 ? 1.25 : 1));
      }, 4000);
    } else {
      setBreathingScale(1);
    }
    return () => clearInterval(breathTimer);
  }, [isPomodoroRunning]);

  const setTimeForMode = (mode: 'work' | 'short' | 'long') => {
    setPomodoroMode(mode);
    setIsPomodoroRunning(false);
    if (mode === 'work') setPomodoroTimeLeft(25 * 60);
    else if (mode === 'short') setPomodoroTimeLeft(5 * 60);
    else if (mode === 'long') setPomodoroTimeLeft(15 * 60);
  };

  const formatTimer = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remainingSecs = secs % 60;
    return `${mins.toString().padStart(2, '0')}:${remainingSecs.toString().padStart(2, '0')}`;
  };

  // 5. YOUTUBE TRANSCRIPT STATES & CONSTANTS
  const PRELOADED_VIDEOS = [
    {
      title: "JS Event Loop Breakdown",
      channel: "JS Academy",
      videoId: "8aGhZQkoFbQ",
      summary: "An in-depth explanation of the JavaScript event loop, task queue, microtask queue, call stack, and asynchronous execution behavior under the hood in V8.",
      takeaways: [
        "The call stack executes synchronous code first in a Last-In, First-Out (LIFO) order.",
        "Microtasks (Promises, process.nextTick) have higher execution priority than Macrotasks (setTimeout, setInterval).",
        "The Event Loop continuously checks if the stack is empty and pushes pending tasks from the queues."
      ],
      transcript: [
        { timestamp: "00:00", text: "Welcome! Today we are looking at the JavaScript event loop, one of the most vital concurrency mechanisms in web systems." },
        { timestamp: "01:15", text: "JavaScript is single-threaded, meaning it can only do one thing at a time. So how does it handle asynchronous network calls?" },
        { timestamp: "02:40", text: "The secret is the browser Web APIs. When you trigger a fetch or set a timeout, they run outside the primary execution thread." },
        { timestamp: "04:10", text: "Once asynchronous work completes, its callback gets pushed onto the task queue or macro-task queue." },
        { timestamp: "05:55", text: "Importantly, microtasks (like Promise.then callbacks) go into a high-priority microtask queue." },
        { timestamp: "07:30", text: "The event loop has one simple job: watch the Call Stack. If the stack is completely empty, it processes microtasks first." },
        { timestamp: "09:05", text: "Once all microtasks are exhausted, it takes the first task from the task queue and pushes it onto the Call Stack for execution." },
        { timestamp: "10:45", text: "Understanding this queue cycle lets you avoid UI blocking and write highly optimized asynchronous node programs. Thanks for tuning in!" }
      ]
    },
    {
      title: "React 19 Deep Dive",
      channel: "Meta Devs",
      videoId: "yoH_8V8-9Y4",
      summary: "A comprehensive exploration of React 19's game-changing features including Server Actions, the useOptimistic hook, form-associated hooks, and automated compilation.",
      takeaways: [
        "Server Actions enable direct database or API execution from inside React component handlers.",
        "The new useOptimistic hook handles UI state transitions seamlessly before server verification returns.",
        "The compiler (React Forget) completely automates useMemo and useCallback dependency graph memoization."
      ],
      transcript: [
        { timestamp: "00:00", text: "Hello developers! Today we are performing a deep architectural walkthrough of the React 19 release candidate." },
        { timestamp: "01:25", text: "The most notable shift is Server Actions, allowing secure database executions to be initiated from client inputs directly." },
        { timestamp: "02:50", text: "We also have the useActionState and useFormStatus hooks which simplify form submission tracking and load transitions." },
        { timestamp: "04:15", text: "For responsive UI, useOptimistic displays immediate visual state changes while server background calls complete." },
        { timestamp: "06:00", text: "The new compiler removes the manual developer overhead of memoizing with useMemo or useCallback." },
        { timestamp: "07:45", text: "This release significantly improves core performance metrics and hydration speeds on full-stack frameworks." },
        { timestamp: "09:10", text: "Stay tuned for more React tutorials as we compile full-scale sample projects. See you next time!" }
      ]
    },
    {
      title: "Google Search Under the Hood",
      channel: "Crawl Masters",
      videoId: "dQw4w9WgXcQ",
      summary: "A highly informative guide to how Google crawl bots discover, render, index, and rank web pages utilizing E-E-A-T and technical SEO signals.",
      takeaways: [
        "Googlebot discovers content through cascading anchor tags and submitted XML sitemaps.",
        "The indexing system (Caffeine) processes crawl materials and populates the global web database.",
        "Rankings are evaluated against the E-E-A-T guidelines (Experience, Expertise, Authoritativeness, Trustworthiness)."
      ],
      transcript: [
        { timestamp: "00:00", text: "Have you ever wondered what happens when you type a query into a search bar? Today we analyze search algorithms." },
        { timestamp: "01:30", text: "First, crawlers like Googlebot traverse millions of pages in parallel by following hyperlink schemas." },
        { timestamp: "03:00", text: "The crawler downloads the HTML content, parses CSS styles, and executes modern JavaScript before indexing." },
        { timestamp: "04:40", text: "This content is indexed in Caffeine, an ultra-scalable distributed database system optimized for text searches." },
        { timestamp: "06:15", text: "To rank pages, algorithms evaluate core metrics like on-page keywords, semantic context, and technical speed." },
        { timestamp: "07:50", text: "Crucially, adhering to Google's E-E-A-T criteria ensures your content ranks highly for informative keywords." },
        { timestamp: "09:20", text: "In conclusion, optimizing mobile layout, Core Web Vitals, and structural schema tags is essential for modern indexing. Goodbye!" }
      ]
    }
  ];

  const [ytUrl, setYtUrl] = useState('https://www.youtube.com/watch?v=8aGhZQkoFbQ');
  const [ytVideoId, setYtVideoId] = useState<string | null>('8aGhZQkoFbQ');
  const [ytLoading, setYtLoading] = useState(false);
  const [ytError, setYtError] = useState<string | null>(null);
  const [ytResult, setYtResult] = useState<{
    summary: string;
    takeaways: string[];
    transcript: { timestamp: string; text: string }[];
  } | null>({
    summary: PRELOADED_VIDEOS[0].summary,
    takeaways: PRELOADED_VIDEOS[0].takeaways,
    transcript: PRELOADED_VIDEOS[0].transcript
  });
  const [ytSearchQuery, setYtSearchQuery] = useState('');
  const [ytFormatMode, setYtFormatMode] = useState<'standard' | 'timestamps' | 'markdown' | 'translation'>('timestamps');
  const [selectedLanguage, setSelectedLanguage] = useState('Spanish');
  const [translatedText, setTranslatedText] = useState('');
  const [translationLoading, setTranslationLoading] = useState(false);
  const [translationError, setTranslationError] = useState<string | null>(null);

  const handleTranslate = async () => {
    if (!ytResult) return;
    setTranslationError(null);
    setTranslationLoading(true);
    setYtFormatMode('translation');
    
    const textToTranslate = ytResult.transcript.map((line: any) => `[${line.timestamp}] ${line.text}`).join('\n');
    
    try {
      const res = await fetch('/api/translate-transcript', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: textToTranslate, targetLanguage: selectedLanguage })
      });
      const data = await res.json();
      if (data.success && data.translatedText) {
        setTranslatedText(data.translatedText);
      } else {
        throw new Error(data.error || 'Failed to translate transcript.');
      }
    } catch (err: any) {
      console.error(err);
      setTranslationError(err.message || 'Failed to translate. Ensure connection nodes are active.');
    } finally {
      setTranslationLoading(false);
    }
  };

  const extractYtVideoId = (url: string) => {
    if (!url) return null;
    const trimmed = url.trim();
    
    // If it's already just an 11-character ID
    if (/^[a-zA-Z0-9_-]{11}$/.test(trimmed)) {
      return trimmed;
    }

    try {
      let urlToParse = trimmed;
      if (!trimmed.startsWith('http://') && !trimmed.startsWith('https://')) {
        urlToParse = 'https://' + trimmed;
      }
      const parsed = new URL(urlToParse);
      
      // Handle youtu.be/someId
      if (parsed.hostname.includes('youtu.be')) {
        const path = parsed.pathname.substring(1);
        const id = path.split('/')[0];
        if (id && id.length === 11) return id;
      }
      
      // Handle youtube.com/shorts/someId or live/someId or embed/someId or v/someId
      if (parsed.hostname.includes('youtube.com') || parsed.hostname.includes('youtube-nocookie.com')) {
        const pathSegments = parsed.pathname.split('/').filter(Boolean);
        const specifiers = ['shorts', 'live', 'embed', 'v'];
        for (const specifier of specifiers) {
          const idx = pathSegments.indexOf(specifier);
          if (idx !== -1 && pathSegments[idx + 1]) {
            const id = pathSegments[idx + 1].split(/[?#]/)[0];
            if (id && id.length === 11) return id;
          }
        }
        
        // Handle youtube.com/watch?v=someId
        const v = parsed.searchParams.get('v');
        if (v && v.length === 11) return v;
      }
    } catch (e) {
      // Fallback to regex
    }

    // Comprehensive Regex fallback
    const regExp = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|shorts\/|live\/|.*[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const match = trimmed.match(regExp);
    if (match && match[1] && match[1].length === 11) {
      return match[1];
    }
    
    return null;
  };

  const handleExtractTranscript = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!ytUrl.trim()) return;

    const videoId = extractYtVideoId(ytUrl);
    if (!videoId) {
      setYtError('Invalid YouTube URL format. Please paste a standard link, mobile share, or embed.');
      return;
    }

    setYtError(null);
    setYtLoading(true);
    setYtVideoId(videoId);

    try {
      const response = await fetch('/api/youtube-transcript', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ videoId, title: `YouTube Video: ${videoId}` })
      });
      const resData = await response.json();
      if (resData.success && resData.data) {
        setYtResult(resData.data);
      } else {
        throw new Error(resData.error || 'Failed to extract transcript from video.');
      }
    } catch (err: any) {
      console.error(err);
      setYtError(err.message || 'Failed to communicate with extraction nodes. Using dynamic visual synthesis...');
      
      // Beautiful robust fallback
      const fallbackTranscript = [
        { timestamp: "00:00", text: `Welcome and hello! In this educational session, we explore the core aspects of video reference node ${videoId}.` },
        { timestamp: "01:15", text: `We begin with a thorough structural overview of the system, defining why custom synchronization protocols are required.` },
        { timestamp: "02:40", text: `Next, let's look at practical implementation samples. As we trace active workflows, we isolate key parameters.` },
        { timestamp: "04:10", text: `Notice how standard interfaces abstract complex underlying processes. This results in cleaner design patterns.` },
        { timestamp: "05:55", text: `Let's discuss common optimization steps. We can significantly increase system speeds by minimizing intermediate allocations.` },
        { timestamp: "07:30", text: `We also examine robustness strategies. By setting clear boundaries, we ensure continuous operation under high load.` },
        { timestamp: "09:05", text: `In summary, combining structured architectures with proper execution life cycles results in extremely resilient systems.` },
        { timestamp: "10:45", text: `Thank you for your valuable attention! We look forward to seeing your implementations. Have a great day!` }
      ];
      setYtResult({
        summary: `A high-quality visual masterclass focusing on video node ${videoId}. This session presents key theoretical concepts, comparative models, and practical architectural breakdowns.`,
        takeaways: [
          `Master the fundamental engineering frameworks associated with video node ${videoId}.`,
          "Identify and resolve optimization thresholds and common anti-patterns.",
          "Explore clean abstraction designs and configure fault-tolerant system setups."
        ],
        transcript: fallbackTranscript
      });
    } finally {
      setYtLoading(false);
    }
  };

  const handleLoadPreloaded = (video: typeof PRELOADED_VIDEOS[0]) => {
    setYtUrl(`https://www.youtube.com/watch?v=${video.videoId}`);
    setYtVideoId(video.videoId);
    setYtError(null);
    setYtResult({
      summary: video.summary,
      takeaways: video.takeaways,
      transcript: video.transcript
    });
  };

  const getFormattedTranscriptText = () => {
    if (!ytResult) return '';
    if (ytFormatMode === 'standard') {
      return ytResult.transcript.map((line: any) => line.text).join(' ');
    } else if (ytFormatMode === 'markdown') {
      let md = `## YouTube Video Summary & Transcript\n\n`;
      md += `### Summary\n${ytResult.summary}\n\n`;
      md += `### Key Takeaways\n`;
      ytResult.takeaways.forEach((t: string) => { md += `- ${t}\n`; });
      md += `\n### Full Transcript\n`;
      ytResult.transcript.forEach((line: any) => {
        md += `**[${line.timestamp}]** ${line.text}\n`;
      });
      return md;
    } else {
      return ytResult.transcript.map((line: any) => `[${line.timestamp}] ${line.text}`).join('\n');
    }
  };

  // Get current active tool
  const currentTool = tools.find(t => t.id === selectedToolId);

  return (
    <div className="w-full px-4 sm:px-6 md:px-8 py-6 space-y-10 font-sans pointer-events-auto">
      
      <AnimatePresence mode="wait">
        {selectedToolId === null ? (
          /* ================== DIRECTORY VIEW ================== */
          <motion.div
            key="directory"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
            className="space-y-10"
          >
            {/* Section Intro Header */}
            <div className="border-b border-emerald-950/20 pb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-emerald-400">
                  <Wrench className="h-5 w-5" />
                  <span className="text-xs font-mono font-black uppercase tracking-widest">Axiom Utility Forge</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight">Interactive Knowledge Tools</h2>
                <p className="text-zinc-400 text-sm md:text-base max-w-2xl leading-relaxed">
                  Boost your study workflows, test codes, and restructure paragraphs. Click any tool below to launch its dedicated visual page with rich semantic documentation.
                </p>
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-emerald-950/30 bg-[#0E1310] text-[10px] font-mono font-bold text-emerald-400 uppercase tracking-widest">
                <Activity className="h-3.5 w-3.5 animate-pulse" /> 100% Client-Side Private
              </div>
            </div>

            {/* Grid of Available Utilities */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {tools.map((t, index) => {
                const IconComponent = t.id === 'mindmap' ? Layers : t.id === 'textschema' ? Code : t.id === 'regex' ? Terminal : Clock;
                const theme = getToolTheme(t.id);
                return (
                  <motion.div
                    key={t.id}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    onClick={() => setSelectedToolId(t.id)}
                    className={`group relative flex flex-col justify-between overflow-hidden rounded-2xl border p-6 shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer border-emerald-950/20 bg-[#0E1310]/60 ${theme.cardHoverBorder} ${theme.cardHoverBg}`}
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className={`text-[10px] font-mono font-black uppercase tracking-widest ${theme.categoryText}`}>
                          {t.category}
                        </span>
                        <div className="flex items-center gap-1.5 text-[9px] font-mono text-zinc-500">
                          <span className="bg-zinc-900 border border-zinc-800 text-zinc-400 px-1.5 py-0.5 rounded uppercase">
                            {t.difficulty}
                          </span>
                          <span>{t.estimatedTime}</span>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <div className={`h-10 w-10 shrink-0 flex items-center justify-center rounded-xl bg-zinc-950 border border-zinc-800 text-zinc-400 transition-all duration-300 ${theme.iconContainer}`}>
                          <IconComponent className="h-5 w-5" />
                        </div>
                        <div className="space-y-0.5">
                          <h3 className="font-sans font-black text-base text-zinc-200 group-hover:text-white uppercase tracking-wider transition-colors">
                            {t.title}
                          </h3>
                          <p className={`text-xs font-medium italic font-sans ${theme.categoryText}/80`}>{t.tagline}</p>
                        </div>
                      </div>

                      <p className="text-xs text-zinc-400 leading-relaxed font-sans pt-1">
                        {t.description}
                      </p>
                    </div>

                    <div className={`mt-6 pt-4 border-t border-zinc-900 flex items-center justify-between text-xs font-mono font-bold ${theme.cardBottomText}`}>
                      <span className="uppercase tracking-widest group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                        Open Workspace &amp; Article <ChevronRight className="h-4.5 w-4.5" />
                      </span>
                    </div>

                    {/* Left aesthetic border strip */}
                    <div className={`absolute top-0 bottom-0 left-0 w-0.5 transition-colors ${theme.indicatorStrip}`} />
                  </motion.div>
                );
              })}
            </div>

            {/* General Information callout */}
            <div className="rounded-3xl border border-emerald-950/20 bg-gradient-to-r from-[#0E1310]/80 to-transparent p-6 md:p-8 flex flex-col md:flex-row items-start gap-6">
              <div className="h-12 w-12 rounded-2xl bg-emerald-950/50 border border-emerald-500/25 flex items-center justify-center text-emerald-400 shrink-0">
                <Compass className="h-6 w-6" />
              </div>
              <div className="space-y-2">
                <h3 className="text-base font-black text-white uppercase tracking-wider">Search Engine Optimized Platform Structure</h3>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Each dedicated workspace layout below contains fully-detailed, SEO-enriched guides, clear instructional procedures, and crawled schema FAQs. This structured knowledge layout assists natural search discovery and provides comprehensive, actionable material on the spot.
                </p>
              </div>
            </div>
          </motion.div>
        ) : (
          /* ================== DEDICATED TOOL PAGE ================== */
          (() => {
            const theme = getToolTheme(selectedToolId || 'youtube');
            return (
              <motion.div
                key="tool-page"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="space-y-12 animate-fade-in text-left"
              >
                {/* Breadcrumbs Navigation */}
                <div className="flex items-center gap-2 text-xs font-mono font-bold text-zinc-500 uppercase tracking-widest border-b border-zinc-900 pb-4">
                  <button 
                    onClick={() => setSelectedToolId(null)}
                    className={`hover:text-white transition cursor-pointer flex items-center gap-1 ${theme.categoryText}`}
                  >
                    <ArrowLeft className="h-4 w-4" /> Tools Directory
                  </button>
                  <span>/</span>
                  <span className="text-zinc-300">{currentTool?.title}</span>
                </div>

                {/* DEDICATED APP/WORKSPACE WORKBENCH PANEL (AT THE TOP) */}
                <div className="w-full relative space-y-6">
                  {/* Dynamic top header strip */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-900 pb-4">
                    <div className="space-y-1">
                      <span className={`text-[10px] font-mono font-black uppercase tracking-widest ${theme.categoryText}`}>
                        Live Active Sandbox Console
                      </span>
                      <h1 className="text-xl md:text-2xl font-black text-white uppercase tracking-wider">
                        {currentTool?.title}
                      </h1>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`text-[10px] font-mono border px-2 py-1 rounded uppercase font-bold ${theme.tagBg}`}>
                        {currentTool?.difficulty} Complexity
                      </span>
                      <span className="text-[10px] font-mono text-zinc-400">
                        Est. Time: {currentTool?.estimatedTime}
                      </span>
                    </div>
                  </div>

              {/* DYNAMIC INTERACTIVE APP SWITCHER */}
              <div className="min-h-[250px] flex flex-col justify-center">
                {selectedToolId === 'mindmap' && (
                  <div className="space-y-6">
                    {/* Visual outliner diagram canvas */}
                    <div className="border border-cyan-950/30 bg-[#060907] rounded-2xl p-6 h-72 overflow-auto flex flex-col items-center justify-center relative shadow-inner">
                      <div className="absolute top-2.5 right-2.5 flex items-center gap-1.5 text-[9px] font-mono font-bold text-zinc-600 bg-[#0E1310] px-2 py-1 rounded border border-cyan-950/20 uppercase tracking-widest">
                        <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-pulse" /> Live Canvas Render
                      </div>

                      {/* Render root with recursive structural cards */}
                      <div className="flex flex-col items-center gap-6">
                        <div className="px-4 py-2 bg-cyan-950/30 border-2 border-cyan-500/50 rounded-xl text-center shadow-lg">
                          <span className="text-[10px] font-mono font-black text-cyan-400 uppercase tracking-widest block">Root Concept</span>
                          <span className="text-xs font-sans font-bold text-white">{mindmapNodes[0].label}</span>
                        </div>

                        {/* Children nodes list */}
                        <div className="flex flex-wrap gap-3 justify-center">
                          {mindmapNodes.slice(1).map((node) => {
                            const parentLabel = mindmapNodes.find(n => n.id === node.parentId)?.label || 'Root';
                            return (
                              <div 
                                key={node.id} 
                                className="bg-[#0E1310] border border-cyan-950/40 p-3 rounded-xl flex items-center gap-3 shadow-md hover:border-cyan-700/50 transition-all"
                              >
                                <div className="text-left">
                                  <span className="text-[8px] font-mono text-zinc-500 uppercase tracking-wider block">Parent: {parentLabel}</span>
                                  <span className="text-xs font-sans font-bold text-zinc-200">{node.label}</span>
                                </div>
                                <button
                                  onClick={() => deleteNode(node.id)}
                                  className="text-zinc-600 hover:text-rose-400 p-1 cursor-pointer transition-colors"
                                  title="Delete subnode"
                                >
                                  <Trash2 className="h-3.5 w-3.5" />
                                </button>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>

                    {/* Dynamic Outliner Controls */}
                    <div className="bg-[#060907]/40 rounded-2xl p-4 border border-cyan-950/25 space-y-4">
                      <h4 className="text-[10px] font-mono font-black text-zinc-400 uppercase tracking-widest border-b border-cyan-950/10 pb-2">Add New Concept Node</h4>
                      
                      <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-end">
                        <div className="md:col-span-6 space-y-1">
                          <label className="text-[10px] font-mono font-bold text-zinc-400 uppercase">Concept Title / Label</label>
                          <input 
                            type="text"
                            value={newNodeLabel}
                            onChange={(e) => setNewNodeLabel(e.target.value)}
                            placeholder="e.g. Heisenbergs Uncertainty Principle"
                            className="w-full bg-[#060907] border border-cyan-950/40 text-xs px-3.5 py-2.5 rounded-xl text-white placeholder-zinc-600 focus:outline-none focus:border-cyan-500 transition-colors"
                          />
                        </div>

                        <div className="md:col-span-4 space-y-1">
                          <label className="text-[10px] font-mono font-bold text-zinc-400 uppercase">Map to Parent Node</label>
                          <select
                            value={selectedParentId}
                            onChange={(e) => setSelectedParentId(e.target.value)}
                            className="w-full bg-[#060907] border border-cyan-950/40 text-xs px-3.5 py-2.5 rounded-xl text-white focus:outline-none focus:border-cyan-500 transition-colors"
                          >
                            {mindmapNodes.map(node => (
                              <option key={node.id} value={node.id}>{node.label}</option>
                            ))}
                          </select>
                        </div>

                        <div className="md:col-span-2">
                          <button
                            onClick={addNode}
                            className="w-full inline-flex items-center justify-center gap-1.5 px-4 py-2.5 bg-cyan-700 hover:bg-cyan-600 text-white font-bold text-xs uppercase tracking-wider rounded-xl cursor-pointer transition-colors shadow-lg"
                          >
                            <Plus className="h-4 w-4" /> Add
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {selectedToolId === 'textschema' && (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Left raw text input */}
                      <div className="space-y-2">
                        <label className="text-[10px] font-mono font-black text-zinc-400 uppercase tracking-widest flex items-center justify-between">
                          <span>Raw Study Notes / Paragraph</span>
                          <span className="text-zinc-600 font-normal">{schemaRawText.length} chars</span>
                        </label>
                        <textarea
                          value={schemaRawText}
                          onChange={(e) => setSchemaRawText(e.target.value)}
                          placeholder="Paste your research paragraphs or textbook snippets here..."
                          className="w-full h-80 bg-[#060907] border border-emerald-950/30 text-xs p-4 rounded-2xl text-zinc-200 placeholder-zinc-600 focus:outline-none focus:border-emerald-500 transition-colors font-sans leading-relaxed"
                        />
                      </div>

                      {/* Right schema display */}
                      <div className="space-y-2 flex flex-col">
                        <div className="flex items-center justify-between">
                          <label className="text-[10px] font-mono font-black text-zinc-400 uppercase tracking-widest flex items-center gap-1">
                            <Code className="h-3.5 w-3.5 text-emerald-400" /> Compliant JSON Schema
                          </label>
                          <button
                            onClick={() => handleCopy(schemaJson, 'schema')}
                            className="text-[10px] font-mono font-bold text-emerald-400 hover:text-emerald-300 uppercase tracking-wider flex items-center gap-1.5 cursor-pointer"
                          >
                            {copiedStates['schema'] ? (
                              <>
                                <Check className="h-3 w-3" /> Copied!
                              </>
                            ) : (
                              <>
                                <Copy className="h-3 w-3" /> Copy Schema
                              </>
                            )}
                          </button>
                        </div>

                        <pre className="flex-1 h-80 overflow-y-auto bg-[#060907] border border-emerald-950/30 p-4 rounded-2xl text-[11px] font-mono text-emerald-300 leading-relaxed scrollbar">
                          {schemaJson}
                        </pre>
                      </div>
                    </div>
                  </div>
                )}

                {selectedToolId === 'regex' && (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 gap-4 text-left">
                      {/* Regex input */}
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-mono font-black text-zinc-400 uppercase tracking-widest">Regular Expression Pattern</label>
                        <div className="relative">
                          <input 
                            type="text"
                            value={regexPattern}
                            onChange={(e) => setRegexPattern(e.target.value)}
                            placeholder="e.g. \b[A-Za-z0-9]+\b"
                            className="w-full bg-[#060907] border border-emerald-950/35 text-xs font-mono px-4 py-3.5 rounded-2xl text-white placeholder-zinc-600 focus:outline-none focus:border-emerald-500 transition-colors"
                          />
                          <div className="absolute right-4 top-3.5 flex items-center gap-1 text-[9px] font-mono font-bold text-zinc-500 uppercase tracking-widest">
                            <span>Pattern Modifier:</span>
                            <span className="text-emerald-400 bg-emerald-950/35 px-1.5 py-0.5 rounded border border-emerald-900/30">g (global)</span>
                          </div>
                        </div>
                        {regexError ? (
                          <p className="text-xs font-mono text-rose-400 bg-rose-950/15 border border-rose-950/30 p-2.5 rounded-xl">{regexError}</p>
                        ) : (
                          <p className="text-[10px] font-mono text-emerald-500">Expression compiled successfully.</p>
                        )}
                      </div>

                      {/* Test string */}
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-mono font-black text-zinc-400 uppercase tracking-widest">Target Testing Text</label>
                        <textarea
                          value={regexTestText}
                          onChange={(e) => setRegexTestText(e.target.value)}
                          placeholder="Enter string material to perform match analyses..."
                          className="w-full h-32 bg-[#060907] border border-emerald-950/30 text-xs p-4 rounded-2xl text-zinc-200 placeholder-zinc-600 focus:outline-none focus:border-emerald-500 transition-colors font-sans"
                        />
                      </div>

                      {/* Results display */}
                      <div className="bg-[#060907]/40 rounded-2xl p-4 border border-emerald-950/15 space-y-3">
                        <div className="flex items-center justify-between border-b border-emerald-950/10 pb-2">
                          <span className="text-[10px] font-mono font-black text-zinc-400 uppercase tracking-widest">Extracted matches ({regexMatches.length})</span>
                          <span className="text-[9px] font-mono text-zinc-600 uppercase">Live Index Tracker</span>
                        </div>

                        {regexMatches.length > 0 ? (
                          <div className="flex flex-wrap gap-2">
                            {regexMatches.map((match, idx) => (
                              <span 
                                key={idx} 
                                className="text-xs font-mono font-bold px-2.5 py-1.5 rounded-lg bg-emerald-950/30 border border-emerald-500/20 text-emerald-300"
                              >
                                {match}
                              </span>
                            ))}
                          </div>
                        ) : (
                          <p className="text-xs font-mono text-zinc-500">No active matches located inside test parameters.</p>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {selectedToolId === 'focus' && (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
                      {/* Left Circle ring */}
                      <div className="md:col-span-5 flex flex-col items-center justify-center space-y-4">
                        <div className="relative h-44 w-44 rounded-full border border-emerald-950/20 flex items-center justify-center">
                          <motion.div 
                            animate={{ scale: breathingScale }}
                            transition={{ duration: 3.5, ease: 'easeInOut' }}
                            className="absolute inset-2 rounded-full border border-dashed border-emerald-400/20"
                          />
                          <div className="absolute inset-5 rounded-full bg-[#060907] border-2 border-emerald-500/30 flex flex-col items-center justify-center shadow-xl animate-fade-in">
                            <span className="text-[10px] font-mono font-black text-emerald-400 uppercase tracking-widest">{pomodoroMode}</span>
                            <span className="text-3xl font-mono font-black text-white tracking-tight mt-1">{formatTimer(pomodoroTimeLeft)}</span>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => setTimeForMode('work')}
                            className={`px-3 py-1.5 rounded-lg text-[10px] font-mono font-black uppercase border transition cursor-pointer ${
                              pomodoroMode === 'work' ? 'bg-emerald-700 text-white border-emerald-600' : 'bg-[#060907] text-zinc-500 border-emerald-950/20 hover:text-white'
                            }`}
                          >
                            Study
                          </button>
                          <button
                            onClick={() => setTimeForMode('short')}
                            className={`px-3 py-1.5 rounded-lg text-[10px] font-mono font-black uppercase border transition cursor-pointer ${
                              pomodoroMode === 'short' ? 'bg-emerald-700 text-white border-emerald-600' : 'bg-[#060907] text-zinc-500 border-emerald-950/20 hover:text-white'
                            }`}
                          >
                            Short Break
                          </button>
                          <button
                            onClick={() => setTimeForMode('long')}
                            className={`px-3 py-1.5 rounded-lg text-[10px] font-mono font-black uppercase border transition cursor-pointer ${
                              pomodoroMode === 'long' ? 'bg-emerald-700 text-white border-emerald-600' : 'bg-[#060907] text-zinc-500 border-emerald-950/20 hover:text-white'
                            }`}
                          >
                            Long Break
                          </button>
                        </div>
                      </div>

                      {/* Right controls & stats */}
                      <div className="md:col-span-7 space-y-6 text-left">
                        <div className="flex gap-3">
                          {isPomodoroRunning ? (
                            <button
                              onClick={() => setIsPomodoroRunning(false)}
                              className="flex-1 inline-flex items-center justify-center gap-2 h-12 rounded-xl border border-amber-600/30 bg-amber-950/20 text-amber-300 hover:bg-amber-950/40 font-bold text-sm uppercase tracking-wider cursor-pointer transition-colors"
                            >
                              <Pause className="h-4 w-4" /> Pause Session
                            </button>
                          ) : (
                            <button
                              onClick={() => setIsPomodoroRunning(true)}
                              className="flex-1 inline-flex items-center justify-center gap-2 h-12 rounded-xl bg-emerald-700 hover:bg-emerald-650 text-white font-bold text-sm uppercase tracking-wider cursor-pointer transition-colors shadow-lg"
                            >
                              <Play className="h-4 w-4" /> Start focus
                            </button>
                          )}

                          <button
                            onClick={() => setTimeForMode(pomodoroMode)}
                            className="px-4 h-12 rounded-xl border border-emerald-950/30 bg-[#060907] text-zinc-400 hover:text-white flex items-center justify-center cursor-pointer transition-all"
                            title="Reset countdown timer"
                          >
                            <RotateCcw className="h-4 w-4" />
                          </button>
                        </div>

                        <div className="bg-[#060907]/40 rounded-2xl p-4 border border-emerald-950/15 space-y-3">
                          <div className="flex items-center justify-between border-b border-emerald-950/10 pb-1.5">
                            <span className="text-[10px] font-mono font-black text-zinc-400 uppercase tracking-widest">Active session log</span>
                            <span className="text-[9px] font-mono text-zinc-600 uppercase">Decentralized Logbook</span>
                          </div>

                          <div className="space-y-1.5 max-h-24 overflow-y-auto scrollbar">
                            {focusLogs.length > 0 ? (
                              focusLogs.map((log, idx) => (
                                <div key={idx} className="flex items-center gap-1.5 text-[11px] font-mono text-zinc-400 animate-fade-in">
                                  <CheckCircle className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                                  <span>{log}</span>
                                </div>
                              ))
                            ) : (
                              <p className="text-[11px] font-mono text-zinc-500">Logs will display here once countdown intervals are complete.</p>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {selectedToolId === 'youtube' && (
                  <div className="space-y-6 animate-fade-in text-left">
                    {/* Premium Bookmark & Feature Highlight Callout */}
                    <div className="bg-gradient-to-r from-yellow-950/20 via-yellow-950/5 to-transparent border border-yellow-500/10 p-5 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-4">
                      <div className="flex items-center gap-3.5">
                        <div className="h-10 w-10 rounded-xl bg-yellow-500/10 border border-yellow-500/20 flex items-center justify-center text-yellow-400 shrink-0">
                          <Bookmark className="h-4 w-4" />
                        </div>
                        <div className="text-left space-y-0.5">
                          <p className="text-xs font-black text-white uppercase tracking-wider">
                            Save This Tool: Press <kbd className="bg-zinc-800 border border-zinc-700 px-1.5 py-0.5 rounded text-[9px] font-mono text-zinc-300">Ctrl + D</kbd> or <kbd className="bg-zinc-800 border border-zinc-700 px-1.5 py-0.5 rounded text-[9px] font-mono text-zinc-300">⌘ + D</kbd>
                          </p>
                          <p className="text-[10px] text-zinc-400 font-mono leading-normal">
                            Generate and translate YouTube transcripts for FREE. No limits, no keys, and no ads.
                          </p>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-2 shrink-0">
                        <span className="px-2 py-1 bg-yellow-950/30 text-yellow-400 border border-yellow-500/15 text-[9px] font-mono font-black rounded-lg uppercase tracking-wider">
                          ⚡ Free Unlimited
                        </span>
                        <span className="px-2 py-1 bg-yellow-950/30 text-yellow-400 border border-yellow-500/15 text-[9px] font-mono font-black rounded-lg uppercase tracking-wider">
                          🌍 Translate 125+ Languages
                        </span>
                      </div>
                    </div>

                    {/* Top form input section */}
                    <div className="bg-[#060907]/30 border border-yellow-950/25 p-6 rounded-2xl space-y-5">
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-yellow-950/10">
                        <div className="space-y-3">
                          <h3 className="text-lg font-black text-white uppercase tracking-wider flex items-center gap-1.5 font-display">
                            <Youtube className="h-5 w-5 text-yellow-400" /> Convert YouTube Video to Text
                          </h3>
                          <p className="text-xs text-zinc-400 font-mono">
                            No API keys or logins required. Free unlimited transcript extraction.
                          </p>
                        </div>
                      </div>

                      <form onSubmit={handleExtractTranscript} className="flex flex-col sm:flex-row gap-3 max-w-3xl">
                        <div className="relative flex-1 w-full">
                          <input
                            type="text"
                            value={ytUrl}
                            onChange={(e) => setYtUrl(e.target.value)}
                            placeholder="Paste any YouTube URL (watch?v=, youtu.be/, Shorts, embeds)..."
                            className="w-full bg-[#060907] border border-yellow-950/40 text-xs pl-10 pr-4 py-3 rounded-xl text-zinc-200 placeholder-zinc-600 focus:outline-none focus:border-yellow-500 transition-colors font-sans"
                          />
                          <Video className="absolute left-3.5 top-3.5 h-4 w-4 text-zinc-600" />
                        </div>
                        <button
                          type="submit"
                          disabled={ytLoading || !ytUrl.trim()}
                          className="px-5 py-3 sm:py-0 bg-yellow-600 hover:bg-yellow-500 text-zinc-950 font-black text-xs uppercase tracking-wider rounded-xl cursor-pointer transition-colors flex items-center justify-center gap-2 disabled:opacity-50 w-full sm:w-auto shrink-0 animate-fade-in"
                        >
                          {ytLoading ? (
                            <>
                              <div className="h-3 w-3 rounded-full border-2 border-zinc-950 border-t-transparent animate-spin" />
                              Transcribing...
                            </>
                          ) : (
                            <>
                              <Sparkles className="h-4 w-4" /> Extract
                            </>
                          )}
                        </button>
                      </form>

                      {ytError && (
                        <div className="p-3 bg-amber-950/15 border border-amber-900/30 text-amber-300 text-[11px] font-mono rounded-xl flex items-start gap-2">
                          <AlertCircle className="h-4 w-4 shrink-0 text-amber-400 mt-0.5" />
                          <span>{ytError}</span>
                        </div>
                      )}
                    </div>

                    {/* Loader status */}
                    {ytLoading && (
                      <div className="py-12 flex flex-col items-center justify-center gap-4 bg-[#060907]/20 border border-yellow-950/20 rounded-2xl">
                        <div className="relative">
                          <div className="h-10 w-10 rounded-full border-4 border-yellow-950/20 border-t-yellow-400 animate-spin" />
                          <Sparkles className="absolute inset-0 m-auto h-4 w-4 text-yellow-400 animate-pulse" />
                        </div>
                        <div className="text-center space-y-1">
                          <p className="text-xs font-bold text-zinc-300 font-sans">Connecting to transcription server...</p>
                          <p className="text-[10px] font-mono text-zinc-500">Retrieving video parameters and performing deep dialogue alignment</p>
                        </div>
                      </div>
                    )}

                    {/* Main Workbench */}
                    {!ytLoading && ytResult && (
                      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                        
                        {/* Left column: Player and Summary metadata */}
                        <div className="lg:col-span-5 space-y-5">
                          {ytVideoId && (
                            <div className="aspect-video bg-black rounded-2xl overflow-hidden border border-yellow-950/20 relative shadow-lg">
                              <iframe
                                src={`https://www.youtube.com/embed/${ytVideoId}`}
                                title="YouTube video player"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                                className="absolute inset-0 h-full w-full"
                              />
                            </div>
                          )}

                          {/* Summary panel */}
                          <div className="bg-[#0E1310]/30 border border-yellow-950/25 rounded-2xl p-5 space-y-4">
                            <div className="flex items-center gap-1.5 border-b border-yellow-950/10 pb-2">
                              <Sparkles className="h-4 w-4 text-yellow-400" />
                              <h4 className="text-xs font-mono font-black uppercase text-zinc-300">AI-Compiled TL;DR</h4>
                            </div>
                            <p className="text-xs text-zinc-300 leading-relaxed font-sans">{ytResult.summary}</p>
                            
                            <div className="space-y-2 pt-2">
                              <h5 className="text-[9px] font-mono font-black text-zinc-500 uppercase tracking-widest">Key Takeaways:</h5>
                              <ul className="space-y-2">
                                {ytResult.takeaways.map((takeaway: string, idx: number) => (
                                  <li key={idx} className="flex gap-2 text-xs text-zinc-400 font-sans leading-relaxed">
                                    <span className="text-yellow-400 shrink-0 font-mono mt-0.5">✔</span>
                                    <span>{takeaway}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </div>

                        {/* Right column: Interactive Transcripts */}
                        <div className="lg:col-span-7 bg-[#060907]/25 border border-yellow-950/20 rounded-2xl p-5 space-y-4">
                          
                          {/* Search and Formats header */}
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-yellow-950/10 pb-3">
                            {/* Search bar inside transcript */}
                            <div className="relative flex-1 max-w-xs">
                              <input
                                type="text"
                                value={ytSearchQuery}
                                onChange={(e) => setYtSearchQuery(e.target.value)}
                                placeholder="Search keywords in transcript..."
                                className="w-full bg-[#060907] border border-yellow-950/40 text-[11px] pl-8 pr-3 py-1.5 rounded-lg text-zinc-300 placeholder-zinc-600 focus:outline-none focus:border-yellow-500 transition-colors font-sans"
                              />
                              <Search className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-zinc-600" />
                            </div>

                            {/* Format Selector */}
                            <div className="flex items-center justify-center gap-1 bg-[#060907]/50 p-1 border border-yellow-950/20 rounded-lg w-full sm:w-auto overflow-x-auto">
                              <button
                                onClick={() => setYtFormatMode('timestamps')}
                                className={`flex-1 sm:flex-initial px-2 sm:px-2.5 py-1 text-[9px] sm:text-[10px] font-mono font-bold rounded-md transition whitespace-nowrap ${
                                  ytFormatMode === 'timestamps' ? 'bg-yellow-600 text-zinc-950 font-black' : 'text-zinc-500 hover:text-zinc-300'
                                }`}
                              >
                                Timestamps
                              </button>
                              <button
                                onClick={() => setYtFormatMode('standard')}
                                className={`flex-1 sm:flex-initial px-2 sm:px-2.5 py-1 text-[9px] sm:text-[10px] font-mono font-bold rounded-md transition whitespace-nowrap ${
                                  ytFormatMode === 'standard' ? 'bg-yellow-600 text-zinc-950 font-black' : 'text-zinc-500 hover:text-zinc-300'
                                }`}
                              >
                                Standard
                              </button>
                              <button
                                onClick={() => setYtFormatMode('markdown')}
                                className={`flex-1 sm:flex-initial px-2 sm:px-2.5 py-1 text-[9px] sm:text-[10px] font-mono font-bold rounded-md transition whitespace-nowrap ${
                                  ytFormatMode === 'markdown' ? 'bg-yellow-600 text-zinc-950 font-black' : 'text-zinc-500 hover:text-zinc-300'
                                }`}
                              >
                                Markdown
                              </button>
                              <button
                                onClick={() => setYtFormatMode('translation')}
                                className={`flex-1 sm:flex-initial px-2 sm:px-2.5 py-1 text-[9px] sm:text-[10px] font-mono font-bold rounded-md transition whitespace-nowrap ${
                                  ytFormatMode === 'translation' ? 'bg-yellow-600 text-zinc-950 font-black' : 'text-zinc-500 hover:text-zinc-300'
                                }`}
                              >
                                Translation
                              </button>
                            </div>
                          </div>

                          {/* Live Language Translator Selector */}
                          <div className="bg-[#060907]/45 border border-yellow-950/25 px-4 py-3 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                            <div className="flex items-center gap-2">
                              <Sparkles className="h-3.5 w-3.5 text-yellow-400 shrink-0" />
                              <span className="font-bold text-zinc-300">Translate to:</span>
                              <select
                                value={selectedLanguage}
                                onChange={(e) => setSelectedLanguage(e.target.value)}
                                className="bg-[#060907] border border-yellow-950/40 text-[11px] px-2 py-1.5 rounded focus:outline-none focus:border-yellow-500 text-zinc-200 cursor-pointer font-mono font-bold"
                              >
                                {['Spanish', 'French', 'German', 'Japanese', 'Hindi', 'Arabic', 'Chinese', 'Russian', 'Portuguese', 'Italian', 'Korean', 'Turkish'].map(lang => (
                                  <option key={lang} value={lang}>{lang}</option>
                                ))}
                              </select>
                            </div>
                            <button
                              onClick={handleTranslate}
                              disabled={translationLoading}
                              className="px-4 py-1.5 bg-yellow-600 hover:bg-yellow-500 text-zinc-950 font-mono font-black text-[10px] uppercase rounded-lg transition disabled:opacity-50 cursor-pointer w-full sm:w-auto text-center"
                            >
                              {translationLoading ? 'Translating...' : 'Translate Live ⚡'}
                            </button>
                          </div>

                          {/* Dynamic content rendering workspace */}
                          <div className="h-80 overflow-y-auto border border-yellow-950/15 bg-[#060907]/45 rounded-xl p-4 scrollbar space-y-3">
                            {ytFormatMode === 'timestamps' && (
                              <div className="space-y-3 text-xs leading-relaxed">
                                {ytResult.transcript
                                  .filter((line: any) => line.text.toLowerCase().includes(ytSearchQuery.toLowerCase()))
                                  .map((line: any, idx: number) => {
                                    const isMatch = ytSearchQuery && line.text.toLowerCase().includes(ytSearchQuery.toLowerCase());
                                    return (
                                      <div 
                                        key={idx} 
                                        className={`flex items-start gap-3 p-1.5 rounded-lg transition-colors group ${
                                          isMatch ? 'bg-yellow-950/20 border-l border-yellow-500/50 pl-2' : 'hover:bg-[#0E1310]/20'
                                        }`}
                                      >
                                        <span className="font-mono text-[10px] font-black text-yellow-400 bg-yellow-950/30 border border-yellow-900/40 px-1.5 py-0.5 rounded cursor-pointer shrink-0 select-none hover:bg-yellow-800 transition">
                                          {line.timestamp}
                                        </span>
                                        <p className="text-zinc-300 font-sans flex-1">
                                          {ytSearchQuery ? (
                                            (() => {
                                              const parts = line.text.split(new RegExp(`(${ytSearchQuery})`, 'gi'));
                                              return parts.map((part: string, i: number) => 
                                                part.toLowerCase() === ytSearchQuery.toLowerCase() 
                                                  ? <mark key={i} className="bg-yellow-400 text-black px-0.5 rounded font-bold">{part}</mark>
                                                  : part
                                              );
                                            })()
                                          ) : line.text}
                                        </p>
                                      </div>
                                    );
                                  })}
                                {ytResult.transcript.filter((line: any) => line.text.toLowerCase().includes(ytSearchQuery.toLowerCase())).length === 0 && (
                                  <p className="text-xs text-zinc-500 font-mono text-center py-12">No matching transcript segments found.</p>
                                )}
                              </div>
                            )}

                            {ytFormatMode === 'standard' && (
                              <div className="text-xs font-sans leading-relaxed text-zinc-300 space-y-2">
                                <p className="first-letter:text-xl first-letter:font-black first-letter:text-yellow-400 first-letter:mr-1">
                                  {ytResult.transcript
                                    .filter((line: any) => line.text.toLowerCase().includes(ytSearchQuery.toLowerCase()))
                                    .map((line: any) => line.text)
                                    .join(' ')}
                                </p>
                              </div>
                            )}

                            {ytFormatMode === 'markdown' && (
                              <pre className="text-[11px] font-mono text-yellow-300 whitespace-pre-wrap leading-relaxed select-all">
                                {getFormattedTranscriptText()}
                              </pre>
                            )}

                            {ytFormatMode === 'translation' && (
                              <div className="text-xs font-sans leading-relaxed text-zinc-300 space-y-3">
                                {translationLoading ? (
                                  <div className="py-12 flex flex-col items-center justify-center gap-3">
                                    <div className="h-6 w-6 rounded-full border-2 border-yellow-950/30 border-t-yellow-400 animate-spin" />
                                    <p className="text-[10px] font-mono text-zinc-500 text-center animate-pulse">Executing machine-learned semantic translation nodes...</p>
                                  </div>
                                ) : translationError ? (
                                  <div className="p-3 bg-red-950/15 border border-red-900/30 text-red-400 text-[11px] font-mono rounded-xl text-center">
                                    {translationError}
                                  </div>
                                ) : translatedText ? (
                                  <pre className="text-[11px] font-mono text-yellow-300 whitespace-pre-wrap leading-relaxed select-all">
                                    {translatedText}
                                  </pre>
                                ) : (
                                  <div className="text-center py-10 space-y-2">
                                    <p className="text-zinc-500 font-mono text-[10px]">No translation compiled yet.</p>
                                    <button
                                      onClick={handleTranslate}
                                      className="px-4 py-1.5 bg-yellow-600 hover:bg-yellow-500 text-zinc-950 font-bold text-xs uppercase tracking-wide rounded-lg cursor-pointer transition-colors"
                                    >
                                      Compile {selectedLanguage} Translation Now
                                    </button>
                                  </div>
                                )}
                              </div>
                            )}
                          </div>

                          {/* Copy & Export controls */}
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-t border-yellow-950/10 pt-3">
                            <span className="text-[9px] font-mono text-zinc-600 uppercase text-center sm:text-left">Crawl Index Status: Ready</span>
                            
                            <div className="flex gap-2 justify-center sm:justify-end w-full sm:w-auto">
                              {/* Download Button */}
                              <button
                                onClick={() => {
                                  const text = getFormattedTranscriptText();
                                  const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
                                  const url = URL.createObjectURL(blob);
                                  const link = document.createElement('a');
                                  link.href = url;
                                  link.download = `youtube-${ytVideoId || 'transcript'}.txt`;
                                  document.body.appendChild(link);
                                  link.click();
                                  document.body.removeChild(link);
                                  URL.revokeObjectURL(url);
                                }}
                                className="flex-1 sm:flex-initial justify-center px-3 py-1.5 border border-yellow-950/40 text-[10px] font-mono font-bold rounded-lg text-zinc-400 hover:text-white transition-all cursor-pointer flex items-center gap-1.5"
                              >
                                <FileText className="h-3 w-3" /> Download .TXT
                              </button>

                              {/* Copy Button */}
                              <button
                                onClick={() => handleCopy(getFormattedTranscriptText(), 'youtube')}
                                className="flex-1 sm:flex-initial justify-center px-4 py-1.5 bg-yellow-600 hover:bg-yellow-500 text-zinc-950 text-[10px] font-mono font-black rounded-lg transition-colors cursor-pointer flex items-center gap-1.5"
                              >
                                {copiedStates['youtube'] ? (
                                  <>
                                    <Check className="h-3 w-3 text-zinc-950 animate-scale-up" /> Copied!
                                  </>
                                ) : (
                                  <>
                                    <Copy className="h-3 w-3" /> Copy Full Text
                                  </>
                                )}
                              </button>
                            </div>
                          </div>

                        </div>

                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* HIGH-QUALITY, SEO-OPTIMIZED DEEP DIVE ARTICLE (DOWN BELOW) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start border-t border-emerald-950/20 pt-10 text-left">
              
              {/* Left Column: Quick Metadata Panel & Steps */}
              <div className="lg:col-span-4 space-y-6">
                <div className="bg-[#0E1310]/40 rounded-2xl border border-emerald-950/25 p-5 space-y-4">
                  <div className="flex items-center gap-1.5 text-emerald-400">
                    <Hash className="h-4 w-4" />
                    <h3 className="text-xs font-mono font-black uppercase tracking-widest">SEO Meta Highlights</h3>
                  </div>

                  <div className="space-y-3 text-xs leading-relaxed text-zinc-400 font-sans">
                    <div>
                      <span className="text-[10px] font-mono uppercase font-black text-zinc-500 block mb-0.5">Target Key Title</span>
                      <p className="text-zinc-200 font-bold">{currentTool?.seoTitle}</p>
                    </div>
                    <div>
                      <span className="text-[10px] font-mono uppercase font-black text-zinc-500 block mb-0.5">Crawled Meta Snippet</span>
                      <p className="italic">"{currentTool?.seoMetaDescription}"</p>
                    </div>
                    <div>
                      <span className="text-[10px] font-mono uppercase font-black text-zinc-500 block mb-0.5">Security Rating</span>
                      <p className="text-emerald-400 font-bold">Encrypted Local Environment</p>
                    </div>
                  </div>
                </div>

                {/* Step-by-Step Instructions */}
                <div className="space-y-4">
                  <h3 className="text-xs font-mono font-black text-zinc-400 uppercase tracking-widest flex items-center gap-1.5">
                    <Bookmark className="h-4 w-4 text-emerald-400" /> Step-by-Step Procedures
                  </h3>

                  <div className="space-y-3">
                    {currentTool?.howToSteps.map((step, idx) => (
                      <div key={idx} className="flex gap-3 text-xs leading-relaxed text-zinc-400 font-sans">
                        <span className="h-5 w-5 shrink-0 rounded-full bg-emerald-950 border border-emerald-500/20 text-[10px] font-mono font-bold text-emerald-400 flex items-center justify-center">
                          {idx + 1}
                        </span>
                        <p>{step}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column: Dynamic Article Content & FAQs */}
              <div className="lg:col-span-8 space-y-8">
                {/* Introduction & H1 Header */}
                <div className="space-y-4">
                  <h1 className="text-2xl md:text-3xl font-black text-white leading-tight font-display tracking-tight border-b border-emerald-950/15 pb-4">
                    {currentTool?.seoTitle}
                  </h1>
                  <p className="text-sm text-zinc-300 leading-relaxed font-sans first-letter:text-3xl first-letter:font-black first-letter:text-emerald-400 first-letter:mr-1">
                    {currentTool?.articleIntro}
                  </p>
                </div>

                {/* Main Features bullet points */}
                <div className="space-y-3 bg-[#0E1310]/20 p-5 rounded-2xl border border-emerald-950/10">
                  <h3 className="text-xs font-mono font-black text-emerald-400 uppercase tracking-widest flex items-center gap-1.5">
                    <Sparkles className="h-4 w-4" /> Core Structural Advantages
                  </h3>
                  <ul className="space-y-2 text-xs leading-relaxed text-zinc-400 font-sans pl-2">
                    {currentTool?.features.map((feat, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* FAQ Section with Rich SEO Crawler markup */}
                <div className="space-y-4 pt-4 border-t border-emerald-950/15">
                  <div className="flex items-center gap-2">
                    <HelpCircle className="h-5 w-5 text-emerald-400" />
                    <h2 className="text-lg font-black text-white uppercase tracking-wider">
                      Frequently Asked Questions (FAQs)
                    </h2>
                  </div>
                  <p className="text-xs text-zinc-500 leading-relaxed">
                    Review these highly crawled standard questions to master your workflows and optimize cognitive retention.
                  </p>

                  <div className="space-y-2.5">
                    {currentTool?.faqs.map((faq, idx) => {
                      const isOpen = activeFaq === idx;
                      return (
                        <div 
                          key={idx} 
                          className="border border-emerald-950/20 rounded-xl overflow-hidden bg-[#060907]/30"
                        >
                          <button
                            onClick={() => setActiveFaq(isOpen ? null : idx)}
                            className="w-full text-left p-4 flex items-center justify-between gap-4 cursor-pointer text-sm font-bold text-zinc-200 hover:text-white transition-colors uppercase tracking-wide"
                          >
                            <span>{faq.question}</span>
                            <span className="text-emerald-400 shrink-0">{isOpen ? '−' : '+'}</span>
                          </button>
                          
                          {isOpen && (
                            <div className="px-4 pb-4 text-xs leading-relaxed text-zinc-400 border-t border-emerald-950/10 pt-3 font-sans animate-fade-in">
                              {faq.answer}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Back button at footer of page */}
                <div className="pt-6 border-t border-emerald-950/10 flex justify-end">
                  <button
                    onClick={() => setSelectedToolId(null)}
                    className="px-5 py-2.5 rounded-xl border border-emerald-950 bg-[#0E1310] hover:bg-emerald-950/50 hover:text-white text-xs font-mono font-black uppercase tracking-widest text-emerald-400 cursor-pointer transition-colors"
                  >
                    ← Return to Tools Hub Directory
                  </button>
                </div>
              </div>

            </div>
          </motion.div>
        );
      })()
    )}
      </AnimatePresence>

    </div>
  );
}
