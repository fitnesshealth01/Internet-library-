import { SEEDED_JULY_2026_LIBRARY } from './seededJuly2026Library';
import { MORE_SEEDED_JULY_2026_LIBRARY } from './moreSeededJuly2026Library';
import { NEWS_TRENDS_WEEK_JULY_2026 } from './newsTrendsWeekJuly2026';

export interface LibraryItem {
  id: string;
  title: string;
  category: 'Articles' | 'News' | 'Tech' | 'APIs' | 'Videos' | 'Posts';
  description: string;
  url: string;
  source: string;
  tags: string[];
  date: string;
  readTime?: string;
  duration?: string;
  popularity: number;
}

function generateDynamicArticles(): LibraryItem[] {
  const itemCategories: ('Articles' | 'News' | 'Tech' | 'APIs' | 'Videos' | 'Posts')[] = [
    'Articles', 'News', 'Tech', 'APIs', 'Videos', 'Posts'
  ];

  const dimensions = [
    { name: 'Technology', searchTerms: ['tech', 'software', 'programming', 'engineering', 'webgl'] },
    { name: 'Science', searchTerms: ['science', 'physics', 'quantum', 'topological', 'genomics'] },
    { name: 'Business', searchTerms: ['business', 'saas', 'growth', 'market', 'pricing'] },
    { name: 'Health', searchTerms: ['health', 'medicine', 'biotech', 'clinical', 'radiography'] },
    { name: 'Arts & Culture', searchTerms: ['arts', 'culture', 'music', 'design', 'scenography'] },
    { name: 'History', searchTerms: ['history', 'archaeology', 'medieval', 'byzantine', 'monetary'] },
    { name: 'More Fields', searchTerms: ['fields', 'planning', 'carbon', 'soil', 'geothermal'] }
  ];

  const templates: Record<string, {
    subjects: string[];
    verbs: string[];
    systems: string[];
    benefits: string[];
    sources: string[];
    tags: string[];
  }> = {
    'Technology': {
      subjects: ["WebGPU Neural Networks", "Zero-Knowledge Authentication", "CRDT Collaboration Canvases", "Speculative Token Decoders", "eBPF Kernel Telemetry", "Serverless Memory Isolation", "Reactive Signal Graphs", "Distributed Micro-Frontends", "Multi-Tenant Cloud Clusters", "Vector Similarity Search"],
      verbs: ["Optimizing", "Scaling", "Securing", "Implementing", "Architecting", "Monitoring", "Debugging", "Analyzing", "Deploying", "Compiling"],
      systems: ["Browser Sandboxes", "Repaint Pipelines", "ACID Transactions", "State-Reconciliation loops", "UDP-Based QUIC Handshakes", "High-Throughput Message Queues", "LRU Caching Protocols", "Decoupled Overlay Layouts", "Linear Memory Buffers", "B-Tree Database Indexing"],
      benefits: ["for Sub-Millisecond Interaction Times", "to Reduce Bundle Sizes by 80%", "in High-Concurrency Environments", "for Zero-Trust Enterprise Operations", "Without Re-rendering Tree Overhead", "to Eliminate First Input Delay", "for Low-Latency Client execution", "at Near-Native Runtime Speeds", "to Prevent Layout Thrashing", "for Elastic Scaling Pipelines"],
      sources: ["TechCrunch", "W3C Web Standards", "Google AI Blog", "MDN Web Docs", "V8 Engine Blog", "Cloudflare Engineering", "GitHub Engineering", "InfoQ Tech", "DEV.to", "HackerNews"],
      tags: ["tech", "javascript", "webgpu", "security", "performance", "rust", "wasm", "react", "networking", "databases"]
    },
    'Science': {
      subjects: ["Topological Qubit Clusters", "Majorana Fermion Resonances", "Graphene Superconductors", "Cosmic Wave Background Maps", "Synthetic Protein Folding", "Neuromorphic Synaptic Grids", "Nuclear Fusion Ingress", "CRISPR Genomic Carriers", "Gravitational Lensing Matrices", "Exoplanet Spectral Signatures"],
      verbs: ["Decoding", "Mapping", "Synthesizing", "Engineering", "Calibrating", "Analyzing", "Modeling", "Simulating", "Measuring", "Accelerating"],
      systems: ["Environmental Decoherence", "Error-Corrected Gate Systems", "Low-Temperature Resistance Profiles", "Primordial Radiation Spectrums", "Weakly Interacting Matter", "Deep Learning Neural Solvers", "Magnetic Confinement Barriers", "Targeted Molecular Delivery", "Space-Time Curvature Tensors", "Atmospheric Absorption Profiles"],
      benefits: ["to Achieve Quantum Supremacy", "to Unlock Infinite Clean Energy", "for Targeted Cancer Therapeutics", "for Deep-Space Telemetry Arrays", "in High-Density Plasma Flow", "for High-Gain Signal Filters", "With Non-Local State Spin", "for Nanoscale Drug Delivery", "to Model Evolutionary Biology", "in Sub-Atomic Particle Physics"],
      sources: ["Nature Physics", "Science Magazine", "Quantum Research Quarterly", "CERN Bulletin", "Astrophysical Journal", "Genomics Review", "MIT Technology Review", "Scientific American", "ArXiv Repository", "Bioinformatics Digest"],
      tags: ["science", "physics", "quantum", "chemistry", "biology", "genomics", "space", "astrophysics", "biotech", "hardware"]
    },
    'Business': {
      subjects: ["B2B SaaS Unit Economics", "Cross-Border Payment Protocols", "Algorithmic Arbitrage Pools", "Decentralized Liquidity Bridges", "Enterprise Resource Planning", "Customer Acquisition Loops", "Hyper-Personalization Funnels", "Multi-Channel Attribution", "Vendor Risk Assessments", "Generative AI ROI Metrics"],
      verbs: ["Maximizing", "Scaling", "Optimizing", "Evaluating", "Transforming", "Forecasting", "Benchmarking", "Structuring", "Leveraging", "Reducing"],
      systems: ["Net Revenue Retention", "Customer Lifetime Value Ratio", "High-Frequency Trade Systems", "Automated Collateral Ratios", "Viral Coefficient Optimization", "Zero-Party Data Collection", "Marketing Mix Modeling", "Disruption Mitigation Strategies", "Predictive Churn Matrices", "Elastic Demand Algorithms"],
      benefits: ["to Guarantee VC Profitability", "for Unmatched Product-Led Growth", "to Mitigate Cross-Border Transaction Risk", "Without Capital Inefficiency", "to Reduce Customer Acquisition Cost", "for Enterprise Value Preservation", "to Eliminate Friction in Checkout", "for Automated Regulatory Compliance", "to Maximize Margin Yields", "to Predict Market Volatility"],
      sources: ["Harvard Business Review", "Forbes Enterprise", "SaaS Growth Journal", "Financial Times", "Wall Street Journal", "Bloomberg Tech", "McKinsey Reports", "Gartner Research", "SaaS Capital Insights", "VentureBeat"],
      tags: ["business", "saas", "finance", "growth", "marketing", "economics", "pricing", "enterprise", "strategy", "roi"]
    },
    'Health': {
      subjects: ["Personalized Genomic Therapy", "mRNA Vaccine Delivery", "Neuromorphic Prosthetic Limbs", "Microbiome Diversity Mapping", "Continuous Glucose Telemetry", "Bioinformatic Disease Profiling", "Automated Radiographic Screening", "Synthetic Antibody Platforms", "Targeted Oncological Therapeutics", "Cardiac Arrhythmia Predictors"],
      verbs: ["Synthesizing", "Engineering", "Predicting", "Mapping", "Monitoring", "Analyzing", "Optimizing", "Detecting", "Delivering", "Validating"],
      systems: ["Patient-Specific Drug Design", "Lipid Nanoparticle Stability", "Real-Time Motor Control Loops", "Metabolic Biomarker Baselines", "Interstitial Fluid Sensors", "Sequence Alignment Engines", "Deep Learning Radiology Vision", "Epitope Binding Affinity", "DNA Methylation Markers", "Off-Target CRISPR Mutation Rates"],
      benefits: ["to Extend Human Lifespan", "to Combat Emerging Viral Threats", "for Instantaneous Motor Response", "to Optimize Metabolic Longevity", "Without Invasive Diagnostic Tools", "for High-Precision Clinical Diagnostics", "to Bypass Chemotherapy Toxicity", "for Pre-Symptomatic Heart Screenings", "to Reverse Epigenetic Aging", "for Nanoscale Targeted Deliveries"],
      sources: ["New England Journal of Medicine", "The Lancet", "Nature Biotechnology", "PubMed Central", "Bioinformatics Review", "Clinical Oncology", "NIH Research Journal", "Cardiology Today", "WHO Bulletin", "Pharmaceutical Digest"],
      tags: ["health", "medicine", "biotech", "genomics", "clinical", "radiology", "longevity", "crispr", "cardiology", "nutrition"]
    },
    'Arts & Culture': {
      subjects: ["Generative Adversarial Art", "Acoustic Spatialization Systems", "Digital Heritage Archives", "Non-Linear Interactive Narratives", "Neural Music Synthesizers", "Immersive Scenography", "Algorithmic Architecture", "Textile Pattern Geometry", "Cinematic Motion Capture", "Virtual Museum Curations"],
      verbs: ["Preserving", "Synthesizing", "Designing", "Scenographing", "Generating", "Archiving", "Composing", "Modeling", "Curating", "Optimizing"],
      systems: ["Style Transfer Neural Nets", "Binaural Wave Propagation", "Photogrammetric 3D Reconstructions", "Branching Dialog Trees", "Generative Audio Engines", "Haptic Feedback Arrays", "Procedural Form Generators", "Mathematical Symmetry Weaves", "Skeletal Tracking Cameras", "WebGL Gallery Portals"],
      benefits: ["to Redefine Interactive Mediums", "for True Immersive Audio Worlds", "to Prevent Cultural Artifact Loss", "for High-Agency Narrative Design", "Without Traditional Instrument Barriers", "to Elevate Public Physical Spaces", "for Sustainable Biophilic Interiors", "to Monetize Digital Art Ownership", "for Photorealistic Visual Effects", "for Low-Latency Mobile Access"],
      sources: ["Wired Culture", "The Art Newspaper", "Architectural Digest", "Computer Graphics World", "Journal of Sonic Studies", "Interactive Narrative Forum", "AIGA Design Review", "Creative Code Quarterly", "Museum Tech Journal", "Metropolitan Arts Review"],
      tags: ["arts", "culture", "design", "music", "architecture", "webgl", "interactive", "narrative", "generative", "heritage"]
    },
    'History': {
      subjects: ["Industrial Revolution Inventions", "Ancient Maritime Trade Networks", "Socio-Political Paradigm Shifts", "Medieval Fortification Engineering", "Historiographical Text Analytics", "Renaissance Scientific Treatises", "Archaeological Stratigraphy", "Byzantine Monetary Policies", "Bronze Age Metallurgy", "Nomadic Migration Vectors"],
      verbs: ["Uncovering", "Reconstructing", "Mapping", "Analyzing", "Deciphering", "Excavating", "Translating", "Benchmarking", "Dating", "Tracing"],
      systems: ["Steam Engine Efficiencies", "Mediterranean Obsidian Routes", "Institutional Decay Indicators", "Castle Curtain Defense Walls", "Statistical Text Mining Models", "Heliocentric Debate Papers", "Carbon-14 Calibration Curves", "Cryptographic Letter Ciphers", "Currency Debasement Rates", "Tin and Copper Alloying Mines"],
      benefits: ["to Understand Industrial Origins", "to Map Prehistoric Supply Chains", "to Predict Modern State Collapses", "to Study Defensive Military Limits", "Without Subjective Academic Bias", "to Track Scientific Paradigm Shifts", "for High-Accuracy Site Excavation", "to Expose Ancient Monetary Crimes", "to Trace Bronze Age Trade Crises", "to Map Historical Climate Impact"],
      sources: ["Historical Studies Review", "American Historical Review", "Journal of Archaeological Science", "Past & Present", "Byzantine Studies", "Historiography Quarterly", "Renaissance Science Digest", "Maritime History Journal", "Metallurgy & History", "Decolonization Review"],
      tags: ["history", "archaeology", "medieval", "byzantine", "scientific-revolution", "trade", "monetary", "metallurgy", "migration", "cartography"]
    },
    'More Fields': {
      subjects: ["Biophilic Urban Planning", "Atmospheric Carbon Capture", "Deep-Sea Hydrothermal Vent Systems", "Agricultural Soil Telemetry", "Renewable Grid Load Balancing", "Cognitive Linguistics Models", "Behavioral Economics Biases", "Aerospace Computational Fluid Dynamics", "Oceanic Microplastic Filtration", "Geothermal Energy Well Systems"],
      verbs: ["Engineering", "Optimizing", "Modeling", "Balancing", "Capturing", "Analyzing", "mitigating", "Filtering", "Balancing", "Simulating"],
      systems: ["Green Canopy Coverage Ratio", "Direct Air Capture Sorbents", "Extremophile Metabolic Pathways", "Nitrogen-Phosphorus Sensor Arrays", "Pumped-Hydro Storage Integration", "Semantic Frame Structures", "Loss Aversion Heuristics", "Supersonic Drag Coefficients", "Electrostatic Particle Separators", "Closed-Loop Heat Exchangers"],
      benefits: ["to Reduce Urban Heat Islands", "to Mitigate Greenhouse Warming", "to Study Primordial Life Conditions", "for High-Yield Precision Agriculture", "to Support 100% Green Grids", "to Map Human Language Cognition", "to Design High-Conversion UI UX", "for Next-Gen Hypersonic Transport", "to Purify Global Water Systems", "to Extract Infinite Clean Heat"],
      sources: ["Urban Planning Journal", "Carbon Capture Reports", "Oceanography Letters", "Precision Agriculture Today", "Renewable Energy Grid", "Linguistics Quarterly", "Behavioral Economics Review", "Aeronautical Design Review", "Water Quality Digest", "Geothermal Energy News"],
      tags: ["fields", "urban-planning", "carbon-capture", "agriculture", "grid", "linguistics", "psychology", "aerospace", "ecology", "geothermal"]
    }
  };

  const list: LibraryItem[] = [];

  const getSeededIndex = (seed: number, max: number) => {
    const x = Math.sin(seed) * 10000;
    return Math.floor((x - Math.floor(x)) * max);
  };

  itemCategories.forEach((cat, catIdx) => {
    for (let i = 0; i < 1200; i++) {
      const globalIdx = catIdx * 1200 + i;
      const dimIndex = globalIdx % 7;
      const dimension = dimensions[dimIndex];
      const templ = templates[dimension.name];

      const seed1 = globalIdx + 1;
      const seed2 = globalIdx + 42;
      const seed3 = globalIdx + 101;
      const seed4 = globalIdx + 2026;

      const sub = templ.subjects[getSeededIndex(seed1, templ.subjects.length)];
      const verb = templ.verbs[getSeededIndex(seed2, templ.verbs.length)];
      const sys = templ.systems[getSeededIndex(seed3, templ.systems.length)];
      const benefit = templ.benefits[getSeededIndex(seed4, templ.benefits.length)];
      const source = templ.sources[getSeededIndex(seed1 + seed2, templ.sources.length)];

      const title = `${verb} ${sub} inside ${sys} ${benefit}`;
      const description = `This highly optimized SEO handbook details how to execute advanced operations involving ${sub.toLowerCase()} and ${sys.toLowerCase()} to achieve maximum performance and throughput. Explore architectural checklists, comparison matrices, and fully optimized schemas.`;

      const daysAgo = Math.floor(globalIdx / 15);
      const baseDate = new Date("2026-07-15");
      baseDate.setDate(baseDate.getDate() - daysAgo);
      const dateString = baseDate.toISOString().split('T')[0];

      const itemTags = Array.from(new Set([
        ...templ.tags.slice(0, 3),
        ...dimension.searchTerms.slice(0, 2),
        dimension.name.toLowerCase(),
        cat.toLowerCase()
      ])).slice(0, 6);

      const readTimeVal = 10 + (globalIdx % 16);

      list.push({
        id: `dyn-${cat.toLowerCase()}-${i}`,
        title,
        category: cat,
        description,
        url: `https://scholar.google.com/scholar?q=${encodeURIComponent(title)}`,
        source,
        tags: itemTags,
        date: dateString,
        readTime: `${readTimeVal} min read`,
        popularity: 500 + (globalIdx % 950)
      });
    }
  });

  return list;
}

export const CURATED_LIBRARY: LibraryItem[] = [
  ...NEWS_TRENDS_WEEK_JULY_2026,
  ...SEEDED_JULY_2026_LIBRARY,
  ...MORE_SEEDED_JULY_2026_LIBRARY,
  ...generateDynamicArticles(),
  // --- ARTICLES ---
  {
    id: "art-1",
    title: "How JavaScript Works: Under the Hood of the V8 Engine",
    category: "Articles",
    description: "An in-depth exploration of the V8 engine compilation process, execution pipelines, call stack, memory heap, and optimization mechanisms used by Google Chrome and Node.js.",
    url: "https://v8.dev/blog",
    source: "V8 Engine Blog",
    tags: ["javascript", "performance", "v8", "compilers"],
    date: "2026-03-12",
    readTime: "8 min read",
    popularity: 940
  },
  {
    id: "art-2",
    title: "React Server Components: The Complete Deep Dive",
    category: "Articles",
    description: "A comprehensive analysis of React Server Components (RSC). Understand server vs. client boundaries, serialization, streaming HTML, and how RSC optimizes bundle size.",
    url: "https://react.dev/blog/2023/03/22/react-labs-what-we-have-been-working-on-march-2023",
    source: "React Blog",
    tags: ["react", "frontend", "rsc", "nextjs"],
    date: "2025-11-05",
    readTime: "12 min read",
    popularity: 980
  },
  {
    id: "art-3",
    title: "System Design 101: Understanding Large-Scale Systems",
    category: "Articles",
    description: "A brilliant visual and architectural guide covering DNS, load balancers, caching layers, reverse proxies, database replication, and message queues like Kafka.",
    url: "https://github.com/ByteByteGoHq/system-design-101",
    source: "ByteByteGo",
    tags: ["system-design", "architecture", "scaling", "backend"],
    date: "2026-01-20",
    readTime: "15 min read",
    popularity: 1250
  },
  {
    id: "art-4",
    title: "A Complete Guide to CSS Grid and Flexible Box Layout",
    category: "Articles",
    description: "MDN's premier documentation on building complex 2D layouts using CSS Grid, alongside CSS Flexbox for 1D content alignment, including responsive design without media queries.",
    url: "https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_grid_layout",
    source: "MDN Web Docs",
    tags: ["css", "frontend", "design", "layout"],
    date: "2026-02-14",
    readTime: "10 min read",
    popularity: 820
  },
  {
    id: "art-5",
    title: "Designing Data-Intensive Applications: The Caching Guide",
    category: "Articles",
    description: "Deep dive into write-through, write-behind, cache-aside, and eviction policies (LRU, LFU) for Memcached, Redis, and CDN caches to build high-throughput systems.",
    url: "https://redis.io/docs/manual/client-side-caching/",
    source: "Redis Documentation",
    tags: ["databases", "caching", "performance", "redis"],
    date: "2025-08-19",
    readTime: "9 min read",
    popularity: 760
  },
  {
    id: "art-6",
    title: "Understanding Web Security: OWASP Top 10 Explained",
    category: "Articles",
    description: "An essential developer checklist explaining SQL Injection, Cross-Site Scripting (XSS), CSRF, Broken Auth, and Server-Side Request Forgery (SSRF) with clear remediation steps.",
    url: "https://owasp.org/www-project-top-ten/",
    source: "OWASP Foundation",
    tags: ["security", "backend", "web-security", "best-practices"],
    date: "2026-05-10",
    readTime: "14 min read",
    popularity: 1100
  },
  {
    id: "art-7",
    title: "WebAssembly: Bridging the Desktop and Web Apps",
    category: "Articles",
    description: "Learn how WebAssembly (Wasm) lets developers write C++, Rust, and Go code to run at near-native speeds inside the browser sandbox, alongside JavaScript.",
    url: "https://webassembly.org/",
    source: "W3C WebAssembly",
    tags: ["wasm", "rust", "performance", "browsers"],
    date: "2026-04-22",
    readTime: "7 min read",
    popularity: 690
  },
  {
    id: "art-8",
    title: "Introduction to HTTP/3 and QUIC Protocol",
    category: "Articles",
    description: "An analysis of the UDP-based QUIC protocol and HTTP/3. Discover how it solves head-of-line blocking, accelerates handshake connection times, and secures modern web traffic.",
    url: "https://blog.cloudflare.com/http3-the-past-present-and-future/",
    source: "Cloudflare Blog",
    tags: ["networking", "http3", "quic", "web-standards"],
    date: "2025-12-15",
    readTime: "11 min read",
    popularity: 810
  },
  {
    id: "art-9",
    title: "TypeScript 5.0 Decorators: Standardizing Meta-Programming",
    category: "Articles",
    description: "Understanding the TC39-stage-3-aligned TypeScript Decorators. Learn how to write clean, metadata-driven class modifiers, loggers, and dependency injection patterns.",
    url: "https://devblogs.microsoft.com/typescript/announcing-typescript-5-0/#decorators",
    source: "TypeScript Blog",
    tags: ["typescript", "programming", "decorators", "metadata"],
    date: "2025-09-01",
    readTime: "8 min read",
    popularity: 850
  },
  {
    id: "art-10",
    title: "Mastering Database Indexes: B-Trees and Hash Indexes",
    category: "Articles",
    description: "How database index engines use B-Trees, LSM-Trees, and Hash indices to accelerate select queries, and why over-indexing hurts write and update performance.",
    url: "https://use-the-index-luke.com/",
    source: "Use The Index Luke",
    tags: ["databases", "sql", "performance", "indexes"],
    date: "2026-01-05",
    readTime: "13 min read",
    popularity: 910
  },
  {
    id: "art-11",
    title: "Demystifying Garbage Collection in Javascript Engines",
    category: "Articles",
    description: "How modern JavaScript engines track object lifecycles using Scavenge (Cheney's algorithm) for the young generation and Mark-Sweep-Compact for the old generation.",
    url: "https://v8.dev/blog/trash-talk",
    source: "V8 Blog",
    tags: ["javascript", "memory", "v8", "garbage-collection"],
    date: "2026-02-18",
    readTime: "11 min read",
    popularity: 890
  },
  {
    id: "art-12",
    title: "Understanding CRDTs: Conflict-Free Replicated Data Types",
    category: "Articles",
    description: "An architectural guide to state-based and operation-based CRDTs, demonstrating how collaborative apps like Figma and Notion merge real-time concurrent changes offline.",
    url: "https://crdt.tech/",
    source: "CRDT Tech",
    tags: ["distributed-systems", "collaboration", "crdt", "architecture"],
    date: "2026-04-10",
    readTime: "16 min read",
    popularity: 950
  },
  {
    id: "art-13",
    title: "Zero-Knowledge Proofs: Practical Cryptography for Web3",
    category: "Articles",
    description: "A comprehensive introduction to ZK-SNARKs and ZK-STARKs. Understand how cryptographic commitments let users prove knowledge without leaking sensitive raw information.",
    url: "https://ethereum.org/en/zero-knowledge-proofs/",
    source: "Ethereum Foundation",
    tags: ["cryptography", "security", "web3", "privacy"],
    date: "2026-05-15",
    readTime: "18 min read",
    popularity: 840
  },
  {
    id: "art-14",
    title: "An Introduction to WebGPU: Next-Gen Graphics on the Web",
    category: "Articles",
    description: "Get started with the revolutionary successor to WebGL. WebGPU provides low-latency, modern programmatic access to graphics cards for spatial computing and neural nets.",
    url: "https://developer.chrome.com/docs/web-platform/webgpu",
    source: "Chrome Developers",
    tags: ["webgpu", "graphics", "performance", "webgl"],
    date: "2025-07-29",
    readTime: "14 min read",
    popularity: 1020
  },
  {
    id: "art-15",
    title: "The Ultimate Guide to OAuth 2.1 and Secure Authorization",
    category: "Articles",
    description: "Understand the differences between OAuth 2.0 and OAuth 2.1, including why PKCE is now mandatory for all clients, and why implicit and password grants are deprecated.",
    url: "https://oauth.net/2.1/",
    source: "OAuth Community",
    tags: ["security", "oauth", "auth", "best-practices"],
    date: "2026-01-29",
    readTime: "12 min read",
    popularity: 1150
  },
  {
    id: "art-16",
    title: "Mastering CSS container queries for component layout",
    category: "Articles",
    description: "How to use @container to build responsive widgets that adapt fluidly based on their parent container container size rather than the browser viewport viewport width.",
    url: "https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_containment/Container_queries",
    source: "MDN Web Docs",
    tags: ["css", "frontend", "responsive", "layout"],
    date: "2026-03-05",
    readTime: "9 min read",
    popularity: 790
  },
  {
    id: "art-17",
    title: "Building Micro-Frontends: Integration Techniques compared",
    category: "Articles",
    description: "Evaluate module federation, iframe isolation, custom elements, and routing proxies to divide large scale enterprise React, Vue, and Angular applications securely.",
    url: "https://martinfowler.com/articles/micro-frontends.html",
    source: "Martin Fowler",
    tags: ["architecture", "micro-frontends", "scaling", "frontend"],
    date: "2025-09-14",
    readTime: "22 min read",
    popularity: 1100
  },
  {
    id: "art-18",
    title: "Hydration in Modern Frameworks: Islands vs. Resumability",
    category: "Articles",
    description: "A comparison of framework rendering strategies. Analyze how Next.js (islands) vs Qwik (resumability) minimize server-to-client DOM event binding overhead.",
    url: "https://builder.io/blog/resumability-vs-hydration",
    source: "Builder.io",
    tags: ["frameworks", "qwik", "hydration", "performance"],
    date: "2025-10-18",
    readTime: "13 min read",
    popularity: 910
  },
  {
    id: "art-19",
    title: "Rust for Javascript Developers: Memory Safety & Borrowing",
    category: "Articles",
    description: "An introductory developer handbook teaching JS engineers Rust semantics, including ownership, borrowing, lifetimes, pattern matching, and error handling with Option.",
    url: "https://www.rust-lang.org/learn",
    source: "Rust Language",
    tags: ["rust", "javascript", "backend", "systems"],
    date: "2025-12-01",
    readTime: "15 min read",
    popularity: 870
  },
  {
    id: "art-20",
    title: "Designing Highly Scalable REST and gRPC API Gateways",
    category: "Articles",
    description: "Compare gRPC (protocol buffers over HTTP/2) vs standard JSON REST API. Learn how to configure reverse proxy rate limiting, TLS terminations, and client connection multiplexing.",
    url: "https://grpc.io/docs/what-is-grpc/introduction/",
    source: "gRPC IO",
    tags: ["api", "grpc", "networking", "system-design"],
    date: "2026-02-27",
    readTime: "11 min read",
    popularity: 960
  },

  // --- NEWS ---
  {
    id: "news-1",
    title: "Gemini 3.5 Released: Next-Gen Multimodal Intelligence",
    category: "News",
    description: "Google introduces Gemini 3.5, setting new benchmarks in code generation, real-time audio interaction, extremely rapid inference, and 2-million-token context lengths.",
    url: "https://deepmind.google/technologies/gemini/",
    source: "Google DeepMind",
    tags: ["ai", "gemini", "llm", "google"],
    date: "2026-06-18",
    readTime: "6 min read",
    popularity: 1540
  },
  {
    id: "news-2",
    title: "React 19 is Officially Stable: What's New",
    category: "News",
    description: "React 19 brings Actions, the useActionState hook, native Document Metadata support, Server Actions, and a brand new compiler that eliminates the need for useMemo and useCallback.",
    url: "https://react.dev/blog/2024/12/05/react-19",
    source: "React Core Team",
    tags: ["react", "frontend", "framework", "news"],
    date: "2025-12-05",
    readTime: "8 min read",
    popularity: 1390
  },
  {
    id: "news-3",
    title: "Vite 6 Launches with Environment API and SSR Enhancements",
    category: "News",
    description: "Vite 6 introduces the ground-breaking Environment API to configure sub-environments (such as workerd, node, edge) to streamline server-side rendering (SSR) builds.",
    url: "https://vite.dev/blog/announcing-vite6",
    source: "Vite Blog",
    tags: ["vite", "frontend", "build-tools", "news"],
    date: "2025-11-20",
    readTime: "5 min read",
    popularity: 1120
  },
  {
    id: "news-4",
    title: "ECMAScript 2026 Approved Proposals: New JS Features",
    category: "News",
    description: "TC39 announces approved features for the upcoming ES2026 standard, including RegExp pattern modifiers, async context managers, and Iterator helper improvements.",
    url: "https://github.com/tc39/proposals",
    source: "TC39 Committee",
    tags: ["javascript", "es2026", "news", "web-standards"],
    date: "2026-06-30",
    readTime: "7 min read",
    popularity: 880
  },
  {
    id: "news-5",
    title: "The Rise of Edge Databases: Distributed SQL and NoSQL",
    category: "News",
    description: "As serverless deployments shift closer to users, databases like Turso (libsql), Cloudflare D1, and Neon Serverless Postgres are defining the speed of globally distributed data.",
    url: "https://turso.tech/blog",
    source: "Turso Tech",
    tags: ["databases", "sql", "serverless", "edge"],
    date: "2026-03-08",
    readTime: "6 min read",
    popularity: 640
  },
  {
    id: "news-6",
    title: "GitHub Copilot Workspace: Reimagining the Dev Flow",
    category: "News",
    description: "GitHub introduces a natural-language-based developer environment, where AI assists from planning to code compilation and automated pull request generation directly.",
    url: "https://github.blog/2024-04-29-github-copilot-workspace-grows-up-into-public-preview/",
    source: "GitHub Blog",
    tags: ["ai", "copilot", "github", "news"],
    date: "2025-10-14",
    readTime: "5 min read",
    popularity: 970
  },
  {
    id: "news-7",
    title: "Node.js 22 Stable Released: Native TS Support & Websockets",
    category: "News",
    description: "Node.js 22 lands as the latest LTS release, incorporating native typescript execution stripping (via --experimental-strip-types) and an experimental built-in WebSocket client.",
    url: "https://nodejs.org/en/blog/announcements/v22-release-announce",
    source: "Node.js Blog",
    tags: ["node", "javascript", "typescript", "backend"],
    date: "2025-10-29",
    readTime: "7 min read",
    popularity: 1150
  },
  {
    id: "news-8",
    title: "Apple Vision Pro WebXR: Designing Spatial Browser UIs",
    category: "News",
    description: "Web designers discuss standardizing 3D interactive canvases, CSS 3D transforms, and WebXR inputs for seamless interactive experiences inside the Vision Pro spatial safari browser.",
    url: "https://webkit.org/blog/spatial-computing/",
    source: "WebKit Blog",
    tags: ["webxr", "vision-pro", "design", "3d"],
    date: "2025-11-12",
    readTime: "9 min read",
    popularity: 580
  },
  {
    id: "news-9",
    title: "State of JS 2025: CSS-in-JS Declines as Tailwind Dominates",
    category: "News",
    description: "The annual developer survey reveals utility-first frameworks like Tailwind CSS, CSS Nesting, and utility build plugins hold a stunning 85% satisfaction score.",
    url: "https://stateofjs.com/",
    source: "State of JS",
    tags: ["javascript", "survey", "tailwind", "frontend"],
    date: "2026-02-28",
    readTime: "12 min read",
    popularity: 1050
  },
  {
    id: "news-10",
    title: "Bun 1.5 Released: Accelerating Package Installs and Tests",
    category: "News",
    description: "Bun continues its relentless speed optimization, speeding up bun install and bun test, while achieving 99% compatibility with Node.js modules and Express servers.",
    url: "https://bun.sh/blog",
    source: "Bun Blog",
    tags: ["bun", "javascript", "package-manager", "news"],
    date: "2026-04-15",
    readTime: "5 min read",
    popularity: 830
  },
  {
    id: "news-11",
    title: "Deno 2.0 Lands with Backward Compatibility and JSR",
    category: "News",
    description: "Deno 2.0 fully bridges the gap with npm and Node, supporting package.json, node_modules, and introducing the JavaScript Registry (JSR) for modern TS distribution.",
    url: "https://deno.com/blog/v2.0",
    source: "Deno Blog",
    tags: ["deno", "javascript", "typescript", "runtime"],
    date: "2025-10-09",
    readTime: "8 min read",
    popularity: 910
  },
  {
    id: "news-12",
    title: "Next.js 15 Unveils Support for React 19 and Turbopack",
    category: "News",
    description: "Next.js 15 shifts stable! Featuring native React 19 bindings, dramatic Turbopack build accelerations, a restructured async request API, and cache-control optimizations.",
    url: "https://nextjs.org/blog/next-15",
    source: "Vercel Blog",
    tags: ["nextjs", "react", "framework", "news"],
    date: "2025-10-21",
    readTime: "10 min read",
    popularity: 1240
  },
  {
    id: "news-13",
    title: "Tailwind CSS v4.0 officially stabilizes with Oxidized Compiler",
    category: "News",
    description: "Tailwind v4.0 has been launched, featuring a brand-new CSS-first configuration layer, complete Rust-based speed optimizations, and zero-setup Vite plugin setups.",
    url: "https://tailwindcss.com/blog/v4-beta",
    source: "Tailwind Labs",
    tags: ["tailwind", "css", "compiler", "news"],
    date: "2026-01-22",
    readTime: "6 min read",
    popularity: 1180
  },
  {
    id: "news-14",
    title: "WebGPU is officially standardized by W3C and Khronos",
    category: "News",
    description: "W3C announces WebGPU has passed full multi-vendor standardization. Major browser engines (Blink, Gecko, WebKit) commit to identical low-level GPU client bindings.",
    url: "https://www.w3.org/news/2026/webgpu-is-now-a-w3c-recommendation/",
    source: "W3C News",
    tags: ["webgpu", "web-standards", "graphics", "news"],
    date: "2026-05-02",
    readTime: "5 min read",
    popularity: 760
  },
  {
    id: "news-15",
    title: "PostgreSQL 17 Released: High Throughput Queries & Logical Replication",
    category: "News",
    description: "Postgres 17 lands stable, bringing a brand new memory manager, massive index structures consolidation, vacuum speed accelerations, and multi-tenant logical replication.",
    url: "https://www.postgresql.org/about/news/postgresql-17-released-2936/",
    source: "PostgreSQL Global Group",
    tags: ["databases", "postgres", "sql", "news"],
    date: "2025-09-26",
    readTime: "7 min read",
    popularity: 1040
  },
  {
    id: "news-16",
    title: "Astro 4.0 Launches Content Layer API and Dev Toolbar",
    category: "News",
    description: "Astro 4.0 introduces the groundbreaking Content Layer, allowing developers to query content from headless CMS, local markdown, or DBs with full schema typing.",
    url: "https://astro.build/blog/astro-400/",
    source: "Astro Core Team",
    tags: ["astro", "frontend", "static-site", "news"],
    date: "2025-12-14",
    readTime: "8 min read",
    popularity: 960
  },
  {
    id: "news-17",
    title: "Chrome 130 Introduces CSS Anchor Positioning",
    category: "News",
    description: "Google Chrome lands native anchor positioning support. Tooltips, popovers, and floating dropdowns can now bind coordinates in vanilla CSS without JS calculation libraries.",
    url: "https://developer.chrome.com/blog/anchor-positioning/",
    source: "Chrome Dev Blog",
    tags: ["css", "chrome", "browsers", "layout"],
    date: "2025-10-15",
    readTime: "6 min read",
    popularity: 840
  },
  {
    id: "news-18",
    title: "Safari 18 Stable Released with Web Push & View Transitions",
    category: "News",
    description: "Apple ships Safari 18 for macOS and iOS, including native Web Push subscriptions, the full View Transitions API, and advanced declaration support for CSS grid formatting.",
    url: "https://webkit.org/blog/15443/introducing-safari-18/",
    source: "WebKit Developer",
    tags: ["safari", "browsers", "apple", "news"],
    date: "2025-09-16",
    readTime: "9 min read",
    popularity: 610
  },
  {
    id: "news-19",
    title: "AWS Announces Serverless Aurora PostgreSQL v2 Scale-To-Zero",
    category: "News",
    description: "Amazon launches scale-to-zero capabilities for Aurora Serverless v2, eliminating base charges for testing clusters, and scaling active queries in millisecond intervals.",
    url: "https://aws.amazon.com/about-aws/whats-new/",
    source: "AWS News",
    tags: ["aws", "cloud", "serverless", "postgres"],
    date: "2026-03-24",
    readTime: "5 min read",
    popularity: 890
  },
  {
    id: "news-20",
    title: "GitHub Actions Announces Apple Silicon M4 runners",
    category: "News",
    description: "Developers running CI/CD test suites on iOS/macOS can now select Apple Silicon M4 virtual host environments, reducing build and simulation times by up to 60%.",
    url: "https://github.blog/changelog/",
    source: "GitHub Changelog",
    tags: ["github", "devops", "ci-cd", "apple"],
    date: "2026-04-18",
    readTime: "4 min read",
    popularity: 750
  },

  // --- TECH & TOOLS ---
  {
    id: "tech-1",
    title: "Tailwind CSS: A Utility-First CSS Framework",
    category: "Tech",
    description: "A highly customizable, low-level CSS framework that gives you all of the building blocks you need to build bespoke designs without any annoying opinionated styles.",
    url: "https://tailwindcss.com/",
    source: "Tailwind Labs",
    tags: ["tailwind", "css", "frontend", "design-system"],
    date: "2026-01-01",
    popularity: 1450
  },
  {
    id: "tech-2",
    title: "Vite: Next Generation Frontend Tooling",
    category: "Tech",
    description: "A modern build tool that provides a fast development server using ES modules, and triggers super-fast Hot Module Replacement (HMR) during code modifications.",
    url: "https://vite.dev/",
    source: "Evan You & Community",
    tags: ["vite", "build-tools", "frontend", "bundlers"],
    date: "2026-01-10",
    popularity: 1300
  },
  {
    id: "tech-3",
    title: "Lucide: Beautiful and Consistent Open-Source Icons",
    category: "Tech",
    description: "A community-run fork of Feather Icons. Lucide offers thousands of clean, customizable, and lightweight SVG icons optimized for modern frontend frameworks like React.",
    url: "https://lucide.dev/",
    source: "Lucide Community",
    tags: ["icons", "design", "frontend", "assets"],
    date: "2026-02-01",
    popularity: 990
  },
  {
    id: "tech-4",
    title: "Framer Motion: Interactive Production-Ready Animations",
    category: "Tech",
    description: "A powerful motion library for React that simplifies layout animations, drag physics, keyframes, transitions, and sophisticated spring physical interactions.",
    url: "https://motion.dev/",
    source: "Framer",
    tags: ["motion", "animations", "react", "ux"],
    date: "2026-02-18",
    popularity: 1220
  },
  {
    id: "tech-5",
    title: "Drizzle ORM: TypeScript-First Database Client",
    category: "Tech",
    description: "Drizzle is a lightweight SQL database ORM that feels exactly like writing pure SQL queries, offering full compile-time type safety for Postgres, MySQL, and SQLite.",
    url: "https://orm.drizzle.team/",
    source: "Drizzle Team",
    tags: ["drizzle", "orm", "databases", "typescript"],
    date: "2026-03-01",
    popularity: 930
  },
  {
    id: "tech-6",
    title: "Supabase: The Open-Source Firebase Alternative",
    category: "Tech",
    description: "Build production backends in minutes with instant PostgreSQL databases, real-time sync listeners, secure row-level security (RLS) authentication, and S3 file storage.",
    url: "https://supabase.com/",
    source: "Supabase Inc.",
    tags: ["supabase", "backend", "databases", "postgres"],
    date: "2026-03-15",
    popularity: 1110
  },
  {
    id: "tech-7",
    title: "Bun: Fast All-in-One JavaScript Runtime",
    category: "Tech",
    description: "Bun is a modern JavaScript runtime like Node or Deno, complete with a fast bundler, transpiler, test runner, and native npm-compatible package manager.",
    url: "https://bun.sh/",
    source: "Oven",
    tags: ["bun", "runtime", "javascript", "backend"],
    date: "2025-09-08",
    popularity: 950
  },
  {
    id: "tech-8",
    title: "Shadcn UI: Reusable Components Built with Radix and Tailwind",
    category: "Tech",
    description: "A gorgeous compilation of copy-paste components. It is not a component library, meaning you own the source code and can style it directly with Tailwind.",
    url: "https://ui.shadcn.com/",
    source: "shadcn",
    tags: ["shadcn", "components", "react", "radix"],
    date: "2025-12-01",
    popularity: 1600
  },
  {
    id: "tech-9",
    title: "Zustand: Barebones State Manager for React",
    category: "Tech",
    description: "A small, fast, and scalable bear-bones state-management solution using simplified hooks API, avoiding React Context re-render performance bottlenecks.",
    url: "https://zustand-demo.pmnd.rs/",
    source: "Poimandres",
    tags: ["react", "state-management", "zustand", "performance"],
    date: "2026-01-15",
    popularity: 1040
  },
  {
    id: "tech-10",
    title: "Esbuild: An Ultra-Fast JavaScript Bundler",
    category: "Tech",
    description: "Written in Go, esbuild packages JS and TS code up to 100x faster than traditional bundlers like Webpack, powering Vite's rapid dependency pre-bundling.",
    url: "https://esbuild.github.io/",
    source: "Evan Wallace",
    tags: ["esbuild", "bundlers", "build-tools", "go"],
    date: "2025-07-22",
    popularity: 740
  },
  {
    id: "tech-11",
    title: "Biome: One-stop toolchain for web projects",
    category: "Tech",
    description: "A single, ultra-fast tool that lints, formats, and transpiles JavaScript, TypeScript, CSS, and JSON in under 10ms, serving as an all-in-one Rust replacement for Prettier and ESLint.",
    url: "https://biomejs.dev/",
    source: "Biome Project",
    tags: ["biome", "linter", "formatter", "rust"],
    date: "2026-03-20",
    popularity: 880
  },
  {
    id: "tech-12",
    title: "Hono: Ultrafast Web Framework for Cloudflare Workers & Bun",
    category: "Tech",
    description: "A lightweight, rapid, standard-compliant router configured natively for the edge. Runs with high-speed performance on Cloudflare Workers, Node, Deno, AWS, and Bun.",
    url: "https://hono.dev/",
    source: "Yusuke Wada",
    tags: ["hono", "backend", "router", "edge"],
    date: "2026-04-05",
    popularity: 1150
  },
  {
    id: "tech-13",
    title: "Playwright: Reliable End-to-End Browser Testing",
    category: "Tech",
    description: "Microsoft's premier automated testing suite. Launch Chromium, Firefox, and WebKit script executions sequentially to verify web app logic with zero-setup isolation.",
    url: "https://playwright.dev/",
    source: "Microsoft",
    tags: ["testing", "browser", "qa", "automation"],
    date: "2026-02-12",
    popularity: 1050
  },
  {
    id: "tech-14",
    title: "Astro: Content-first static site framework",
    category: "Tech",
    description: "The ideal frontend compiler to ship lightning fast websites with zero client-side JavaScript. Astro compiles complex layouts to static HTML, hydrating islands on demand.",
    url: "https://astro.build/",
    source: "Astro Technology",
    tags: ["astro", "frontend", "static-site", "islands"],
    date: "2026-01-18",
    popularity: 1210
  },
  {
    id: "tech-15",
    title: "Svelte 5: Reimagined Reactivity with Runes",
    category: "Tech",
    description: "Svelte 5 launches the stable 'runes' model, standardizing reactive declarations ($state, $derived, $effect) to simplify state tracking in large-scale modular frontend structures.",
    url: "https://svelte.dev/blog/svelte-5-is-alive",
    source: "Svelte Team",
    tags: ["svelte", "frontend", "runes", "framework"],
    date: "2025-10-25",
    popularity: 1140
  },
  {
    id: "tech-16",
    title: "TanStack Query: Powerful Client-Side Fetch Cache Manager",
    category: "Tech",
    description: "Formerly React Query, this is the ultimate data synchronization tool, managing client-side request deduplication, cache warming, background polling, and optimistic UI transitions.",
    url: "https://tanstack.com/query/latest",
    source: "Tanner Linsley",
    tags: ["react-query", "react", "data-fetching", "state"],
    date: "2026-02-28",
    popularity: 1290
  },
  {
    id: "tech-17",
    title: "Prisma: Modern Node.js and TypeScript Database ORM",
    category: "Tech",
    description: "Prisma provides auto-generated, type-safe database queries, elegant schema-driven migrations, and a powerful database editor console for PostgreSQL, MySQL, and MongoDB.",
    url: "https://www.prisma.io/",
    source: "Prisma Team",
    tags: ["prisma", "orm", "databases", "typescript"],
    date: "2025-11-15",
    popularity: 970
  },
  {
    id: "tech-18",
    title: "Redux Toolkit: Simplified Standard Redux Store Creator",
    category: "Tech",
    description: "The official, opinionated, batteries-included toolset for efficient Redux development. RTK simplifies store configuration, action creators, thunks, and state mutations.",
    url: "https://redux-toolkit.js.org/",
    source: "Redux Community",
    tags: ["redux", "react", "state-management", "store"],
    date: "2025-08-12",
    popularity: 810
  },
  {
    id: "tech-19",
    title: "Zod: TypeScript-First Schema Validation with Static Type Inference",
    category: "Tech",
    description: "Define database schemas, form schemas, or API request schemas dynamically, and extract compiler-validated types automatically to ensure bulletproof type contracts.",
    url: "https://zod.dev/",
    source: "Colin McDonnell",
    tags: ["zod", "validation", "typescript", "schemas"],
    date: "2026-01-30",
    popularity: 1130
  },
  {
    id: "tech-20",
    title: "tRPC: End-to-End Type-Safe APIs without code generation",
    category: "Tech",
    description: "Share typescript API definitions directly with your frontend client, ensuring compile-time safety and autocompletion for RPC queries without compile schema overhead.",
    url: "https://trpc.io/",
    source: "tRPC Team",
    tags: ["trpc", "api", "typescript", "backend"],
    date: "2026-03-10",
    popularity: 920
  },

  // --- APIS ---
  {
    id: "api-1",
    title: "JSONPlaceholder: Free Fake REST API for Prototyping",
    category: "APIs",
    description: "A free online REST service that returns mock relational data (users, posts, comments, todos, albums) in clean JSON format for zero-setup application testing.",
    url: "https://jsonplaceholder.typicode.com/",
    source: "typicode",
    tags: ["rest-api", "mock-data", "testing", "json"],
    date: "2026-01-05",
    popularity: 1080
  },
  {
    id: "api-2",
    title: "Hacker News Firebase API: Real-Time Tech Discussions",
    category: "APIs",
    description: "The official Hacker News database hosted on Firebase, exposing simple JSON feeds for top stories, job openings, fresh articles, and full nested comment trees.",
    url: "https://github.com/HackerNews/API",
    source: "Y Combinator",
    tags: ["api", "hacker-news", "news", "json"],
    date: "2025-11-10",
    popularity: 970
  },
  {
    id: "api-3",
    title: "PokeAPI: The Complete Pokémon RESTful Data Hub",
    category: "APIs",
    description: "An incredibly detailed and popular developer API providing paginated access to thousands of Pokémon stats, evolutionary pathways, moves, types, and high-res sprites.",
    url: "https://pokeapi.co/",
    source: "PokeAPI Community",
    tags: ["api", "pokemon", "rest-api", "education"],
    date: "2026-02-10",
    popularity: 880
  },
  {
    id: "api-4",
    title: "REST Countries: Worldwide Geopolitical Data REST API",
    category: "APIs",
    description: "Retrieve comprehensive details on world countries, including currencies, flag graphics, geographic borders, capital cities, populations, and language details.",
    url: "https://restcountries.com/",
    source: "REST Countries",
    tags: ["api", "geography", "maps", "public-api"],
    date: "2026-03-20",
    popularity: 750
  },
  {
    id: "api-5",
    title: "OpenWeatherMap: Global Meteorological Climate Data API",
    category: "APIs",
    description: "Fetch real-time atmospheric updates, multi-day weather forecasts, historical data maps, and climate alerts for any geographic coordinate on Earth.",
    url: "https://openweathermap.org/api",
    source: "OpenWeather",
    tags: ["api", "weather", "forecast", "data"],
    date: "2025-10-18",
    popularity: 830
  },
  {
    id: "api-6",
    title: "NASA APIs: Open Access to Space and Astronomy Datasets",
    category: "APIs",
    description: "Access astronomical data feeds including the Astronomy Picture of the Day (APOD), Mars Rover camera photography, asteroid near-Earth tracking, and space telemetry.",
    url: "https://api.nasa.gov/",
    source: "NASA",
    tags: ["api", "space", "astronomy", "nasa"],
    date: "2026-04-05",
    popularity: 1140
  },
  {
    id: "api-7",
    title: "CoinGecko API: Extensive Cryptocurrency Market Datasets",
    category: "APIs",
    description: "Get real-time trading values, volume charts, total market capitalization rankings, currency exchanges, and historical crypto stats without an auth requirement.",
    url: "https://www.coingecko.com/en/api",
    source: "CoinGecko",
    tags: ["api", "crypto", "finance", "bitcoin"],
    date: "2026-05-14",
    popularity: 620
  },
  {
    id: "api-8",
    title: "RandomUser API: Dynamic User Profile Generators",
    category: "APIs",
    description: "A free, automated system that outputs mock random human contact profiles, including avatars, physical addresses, telephones, passwords, and demographic metadata.",
    url: "https://randomuser.me/",
    source: "RandomUser",
    tags: ["api", "testing", "mock-data", "avatars"],
    date: "2025-08-30",
    popularity: 710
  },
  {
    id: "api-9",
    title: "DEV.to API: Read and Write Tech Community Articles",
    category: "APIs",
    description: "The DEV API exposes endpoints to search for developer essays, filter by tags, check reading times, retrieve author profiles, and post articles programmatically.",
    url: "https://developers.forem.com/api",
    source: "Forem Developer Community",
    tags: ["api", "devto", "blogging", "tech-news"],
    date: "2026-01-25",
    popularity: 910
  },
  {
    id: "api-10",
    title: "Wikipedia Query API: Global Encyclopedic Fact Lookup",
    category: "APIs",
    description: "Wikipedia's extensive MediaWiki API allows full-text search, automatic summaries, geosearch, page revision histories, and structured multi-language lookups.",
    url: "https://www.mediawiki.org/wiki/API:Main_page",
    source: "Wikimedia Foundation",
    tags: ["api", "wikipedia", "education", "search"],
    date: "2026-03-30",
    popularity: 1040
  },
  {
    id: "api-11",
    title: "Stripe API: Global Payment Processing SDK and API Reference",
    category: "APIs",
    description: "Integrate Stripe's world-famous payment APIs to process checkout sessions, securely handle subscriptions, invoice customers, and initiate Apple Pay transfers.",
    url: "https://stripe.com/docs/api",
    source: "Stripe Developer",
    tags: ["api", "payments", "finance", "stripe"],
    date: "2026-02-18",
    popularity: 1300
  },
  {
    id: "api-12",
    title: "Unsplash API: Beautiful High-Resolution Imagery API",
    category: "APIs",
    description: "Access millions of curated, high-quality stock photography assets completely free, with full support for responsive downloads, search filters, and random collections.",
    url: "https://unsplash.com/developers",
    source: "Unsplash Inc.",
    tags: ["api", "images", "assets", "photography"],
    date: "2026-04-12",
    popularity: 920
  },
  {
    id: "api-13",
    title: "GitHub REST API: Automate Commits, Issues, and PR Actions",
    category: "APIs",
    description: "Interact with GitHub programmatically. Query repository code, trigger automated workflow dispatches, fetch public user profiles, and manage webhook settings.",
    url: "https://docs.github.com/en/rest",
    source: "GitHub Docs",
    tags: ["api", "github", "vcs", "devops"],
    date: "2026-01-15",
    popularity: 1110
  },
  {
    id: "api-14",
    title: "Twilio Messaging API: Global Programmatic SMS and WhatsApp",
    category: "APIs",
    description: "Send automated text messages, trigger dynamic voice calls, execute two-factor SMS authentications, and manage cross-channel user queries globally.",
    url: "https://www.twilio.com/docs/usage/api",
    source: "Twilio Inc.",
    tags: ["api", "messaging", "sms", "communications"],
    date: "2025-10-22",
    popularity: 810
  },
  {
    id: "api-15",
    title: "Spotify Web API: Query Metadata, Playlists, and Artists",
    category: "APIs",
    description: "Retrieve comprehensive details on artists, album tracklists, custom playlists, track features (tempo, valence), and control active audio playback streams.",
    url: "https://developer.spotify.com/documentation/web-api",
    source: "Spotify",
    tags: ["api", "music", "spotify", "media"],
    date: "2026-03-01",
    popularity: 990
  },
  {
    id: "api-16",
    title: "Resend: The modern Email API for developers",
    category: "APIs",
    description: "An incredibly fast, developer-friendly email API built for modern full-stack workflows. Send beautiful React-styled transaction emails (via react-email) instantly.",
    url: "https://resend.com/docs",
    source: "Resend",
    tags: ["api", "email", "messaging", "react-email"],
    date: "2026-04-20",
    popularity: 1140
  },
  {
    id: "api-17",
    title: "Open Library API: Millions of Books in open-access JSON",
    category: "APIs",
    description: "An open, public API that retrieves catalog details for millions of literary books, author bibliographies, subject tags, and high-resolution book cover imagery.",
    url: "https://openlibrary.org/developers/api",
    source: "Internet Archive",
    tags: ["api", "books", "education", "open-library"],
    date: "2026-05-10",
    popularity: 860
  },
  {
    id: "api-18",
    title: "Nominatim OpenStreetMap: Free Worldwide Geocoding",
    category: "APIs",
    description: "Search open geographic databases programmatically. Turn GPS coordinates into physical addresses (reverse geocoding) or lookup location coordinates with zero charges.",
    url: "https://nominatim.org/",
    source: "OpenStreetMap Foundation",
    tags: ["api", "maps", "geocoding", "gis"],
    date: "2025-09-18",
    popularity: 780
  },
  {
    id: "api-19",
    title: "Gemini Developer API: Access State-Of-The-Art Multi-Modal Models",
    category: "APIs",
    description: "Integrate Gemini models directly into your custom apps. Generate structured JSON, stream textual thoughts, execute automated function calls, and process voice inputs.",
    url: "https://ai.google.dev/gemini-api",
    source: "Google AI",
    tags: ["api", "gemini", "ai", "llm"],
    date: "2026-06-15",
    popularity: 1480
  },
  {
    id: "api-20",
    title: "The Rick and Morty API: Relational Character Hub",
    category: "APIs",
    description: "A fun and incredibly popular API returning paginated characters, episode logs, and planetary environments from the hit TV show, useful for frontend state tests.",
    url: "https://rickandmortyapi.com/",
    source: "Rick and Morty API Group",
    tags: ["api", "tv-show", "rest-api", "education"],
    date: "2026-02-14",
    popularity: 820
  },

  // --- VIDEOS ---
  {
    id: "vid-1",
    title: "The Event Loop in JavaScript: What the Heck is it?",
    category: "Videos",
    description: "Philip Roberts' legendary JSConf presentation. A clear, visual breakdown of the call stack, Web APIs, callback queue, rendering queue, and the event loop engine.",
    url: "https://www.youtube.com/watch?v=8aGhZQkoFbQ",
    source: "JSConf EU (Philip Roberts)",
    tags: ["javascript", "concurrency", "event-loop", "tutorial"],
    date: "2014-10-09",
    duration: "26:52 video",
    popularity: 1510
  },
  {
    id: "vid-2",
    title: "How DNS Works: Domain Name System Explained",
    category: "Videos",
    description: "A highly visual journey showing what happens when you type a URL into a browser, including Root Servers, TLD Servers, Authoritative Nameservers, and TTL caching.",
    url: "https://www.youtube.com/watch?v=27r4BzDS5PA",
    source: "ByteByteGo (Alex Xu)",
    tags: ["dns", "networking", "system-design", "education"],
    date: "2025-02-12",
    duration: "08:14 video",
    popularity: 880
  },
  {
    id: "vid-3",
    title: "Git for Professionals: Advanced Rebase and Merge Tactics",
    category: "Videos",
    description: "Master interactive git rebasing, squash merging, cherry-picking commits, recovering deleted branches with git reflog, and managing remote upstream workspaces safely.",
    url: "https://www.youtube.com/watch?v=Uszj_k0DGsg",
    source: "freeCodeCamp.org",
    tags: ["git", "version-control", "workflow", "collaboration"],
    date: "2025-09-18",
    duration: "45:10 video",
    popularity: 930
  },
  {
    id: "vid-4",
    title: "Neural Networks: How Machines Learn (Part 1)",
    category: "Videos",
    description: "3Blue1Brown's masterpiece on Neural Networks. Understand backpropagation, activation functions (ReLU, Sigmoid), weights, biases, and gradient descent mathematically.",
    url: "https://www.youtube.com/watch?v=aircAruvnKk",
    source: "3Blue1Brown (Grant Sanderson)",
    tags: ["ai", "neural-networks", "math", "machine-learning"],
    date: "2017-10-05",
    duration: "19:13 video",
    popularity: 1650
  },
  {
    id: "vid-5",
    title: "React 19 Hooks: Explaining 'use', 'useActionState', and 'useOptimistic'",
    category: "Videos",
    description: "Learn how the brand-new React 19 async state triggers work in practice. See how to eliminate loading spinners and manage optimistic UI states gracefully.",
    url: "https://www.youtube.com/watch?v=tI98SIdGf4c",
    source: "Jack Herrington",
    tags: ["react", "react19", "hooks", "frontend"],
    date: "2026-01-05",
    duration: "18:40 video",
    popularity: 910
  },
  {
    id: "vid-6",
    title: "Harvard CS50: Lecture 0 - Computational Thinking",
    category: "Videos",
    description: "David J. Malan's world-famous introductory lecture on computer science. An amazing conceptual breakdown of binary, algorithms, pseudocode, and software logic.",
    url: "https://www.youtube.com/watch?v=yoH_8V8-9Y4",
    source: "Harvard University (CS50)",
    tags: ["cs50", "algorithms", "education", "programming"],
    date: "2025-08-31",
    duration: "2:15:30 video",
    popularity: 1420
  },
  {
    id: "vid-7",
    title: "SQL vs NoSQL: Definitive Database Engine Showdown",
    category: "Videos",
    description: "Fireship details the core performance, normalization, horizontal scaling, ACID properties, and query language differences between Relational databases and Document stores.",
    url: "https://www.youtube.com/watch?v=ZS_kXvOe90o",
    source: "Fireship",
    tags: ["databases", "sql", "nosql", "fireship"],
    date: "2024-03-12",
    duration: "11:25 video",
    popularity: 1100
  },
  {
    id: "vid-8",
    title: "Webpack, Vite, Bun, or Esbuild: What to Choose in 2026?",
    category: "Videos",
    description: "An expert review benchmarking bundler loading speeds, dev hot reload, production asset treeshaking, and module resolution limits of modern bundlers.",
    url: "https://www.youtube.com/watch?v=Jg6MfeZis-k",
    source: "TechLead",
    tags: ["build-tools", "vite", "esbuild", "performance"],
    date: "2026-03-22",
    duration: "14:15 video",
    popularity: 690
  },
  {
    id: "vid-9",
    title: "Building a Serverless REST API with Node and AWS Lambda",
    category: "Videos",
    description: "Deploy highly scalable serverless architectures using AWS Lambda, API Gateway, and DynamoDB. Learn cold start mitigation, CORS, and logging configs.",
    url: "https://www.youtube.com/watch?v=7y1v8z2S3g4",
    source: "Traversy Media",
    tags: ["aws", "serverless", "node", "api"],
    date: "2025-07-11",
    duration: "52:40 video",
    popularity: 810
  },
  {
    id: "vid-10",
    title: "What is Docker? Containerization Visualized",
    category: "Videos",
    description: "A friendly, comprehensive 10-minute guide to Docker. Understand containers, images, volumes, Dockerfiles, and how Docker isolation saves development overhead.",
    url: "https://www.youtube.com/watch?v=3c-iBn73dDE",
    source: "Web Dev Simplified",
    tags: ["docker", "containers", "devops", "isolation"],
    date: "2025-10-02",
    duration: "10:15 video",
    popularity: 980
  },
  {
    id: "vid-11",
    title: "React 19 Compiler deep dive: Goodbye useMemo!",
    category: "Videos",
    description: "Fireship walks through the incredible React compiler (React Forget) which automates component memoization on the fly, eliminating visual re-render bottlenecks.",
    url: "https://www.youtube.com/watch?v=qOQZLOeqX0I",
    source: "Fireship",
    tags: ["react", "react19", "compiler", "performance"],
    date: "2025-09-02",
    duration: "12:10 video",
    popularity: 1190
  },
  {
    id: "vid-12",
    title: "Database Locking Explained: Shared vs Exclusive locks",
    category: "Videos",
    description: "Hussein Nasser explains database transaction isolation levels, row locks, table locks, deadlocks, and multi-version concurrency control (MVCC) in Postgres.",
    url: "https://www.youtube.com/watch?v=gT8gO8U_vYc",
    source: "Hussein Nasser Channel",
    tags: ["databases", "sql", "performance", "locking"],
    date: "2025-11-20",
    duration: "32:15 video",
    popularity: 760
  },
  {
    id: "vid-13",
    title: "Introduction to VIM / Neovim for beginners",
    category: "Videos",
    description: "The Primeagen presents a hilariously frantic, high-value guide to editing code at terminal speed using Vim navigation keybindings, motions, and custom registers.",
    url: "https://www.youtube.com/watch?v=8yI38znQrZ0",
    source: "The Primeagen",
    tags: ["vim", "terminal", "editor", "productivity"],
    date: "2025-06-15",
    duration: "22:40 video",
    popularity: 1340
  },
  {
    id: "vid-14",
    title: "What is the T3 Stack? Type-safe Next.js development",
    category: "Videos",
    description: "Theo details how Next.js, Tailwind CSS, tRPC, Prisma, and NextAuth combine to create the ultimate type-safe developer stack for production scaling.",
    url: "https://www.youtube.com/watch?v=2TzT3v_n6Cg",
    source: "Theo - t3.gg",
    tags: ["t3-stack", "nextjs", "trpc", "typescript"],
    date: "2025-08-01",
    duration: "25:30 video",
    popularity: 910
  },
  {
    id: "vid-15",
    title: "Advanced CSS Layout Masterclass: Master Flexbox and Grid",
    category: "Videos",
    description: "Kevin Powell showcases deep css grid and flexbox layout strategies, detailing how CSS auto-placement algorithms function and resolving nesting scroll blocks.",
    url: "https://www.youtube.com/watch?v=rg7Fvvl3taU",
    source: "Kevin Powell",
    tags: ["css", "frontend", "layout", "responsive"],
    date: "2026-03-08",
    duration: "45:15 video",
    popularity: 1050
  },
  {
    id: "vid-16",
    title: "Build an Express.js REST API with complete security practices",
    category: "Videos",
    description: "Traversy Media provides a 1-hour tutorial on Express.js. Learn how to configure CORS, handle JWT auth states, encrypt passwords with bcrypt, and secure HTTP headers.",
    url: "https://www.youtube.com/watch?v=L72fhGm1tfY",
    source: "Traversy Media",
    tags: ["express", "node", "api", "security"],
    date: "2025-10-10",
    duration: "1:05:40 video",
    popularity: 880
  },
  {
    id: "vid-17",
    title: "What are WebSockets? Real-Time browser protocols explained",
    category: "Videos",
    description: "An animated, simple overview explaining the differences between HTTP polling, Server-Sent Events (SSE), and full-duplex TCP WebSockets for real-time app scaling.",
    url: "https://www.youtube.com/watch?v=1b7LHC5z0yQ",
    source: "Web Dev Simplified",
    tags: ["websockets", "networking", "realtime", "protocols"],
    date: "2025-12-05",
    duration: "15:20 video",
    popularity: 940
  },
  {
    id: "vid-18",
    title: "Introduction to Kubernetes: Containers at Orchestration Scale",
    category: "Videos",
    description: "TechWorld with Nana showcases Kubernetes fundamentals. Understand pods, nodes, deployments, replica sets, services, and ingress control networks clearly.",
    url: "https://www.youtube.com/watch?v=VnvRFRk_510",
    source: "TechWorld with Nana",
    tags: ["kubernetes", "devops", "cloud", "containers"],
    date: "2025-11-14",
    duration: "55:10 video",
    popularity: 1150
  },
  {
    id: "vid-19",
    title: "Harvard CS50 Web Programming: SQL and Databases",
    category: "Videos",
    description: "Brian Yu walks through SQL commands, database normalization, relational keys, select queries, joins, and indexing structures inside Harvard's Web Course.",
    url: "https://www.youtube.com/watch?v=v=3LctyZIn6I4",
    source: "Harvard CS50",
    tags: ["sql", "databases", "cs50", "education"],
    date: "2025-07-25",
    duration: "1:48:30 video",
    popularity: 1220
  },
  {
    id: "vid-20",
    title: "What is GraphQL? Query language comparison",
    category: "Videos",
    description: "Fireship details the core performance, query resolvers, schema definitions, and underfetching/overfetching differences between REST APIs and GraphQL.",
    url: "https://www.youtube.com/watch?v=eIQh02xuVw4",
    source: "Fireship",
    tags: ["graphql", "api", "rest-api", "fireship"],
    date: "2024-08-14",
    duration: "08:45 video",
    popularity: 990
  },

  // --- POSTS & BLOGS ---
  {
    id: "post-1",
    title: "How to Do What You Love: Paul Graham Essay",
    category: "Posts",
    description: "Paul Graham's timeless philosophy on finding work that energizes you, resisting social prestige traps, navigating career forks, and dedicating yourself to excellence.",
    url: "http://www.paulgraham.com/love.html",
    source: "Paul Graham Essays",
    tags: ["philosophy", "career", "productivity", "culture"],
    date: "2006-01-01",
    readTime: "18 min read",
    popularity: 1380
  },
  {
    id: "post-2",
    title: "Goodbye, Clean Code: Over-engineering Visualized",
    category: "Posts",
    description: "Dan Abramov shares a crucial developer lesson on over-factoring and over-abstracting code too early, and why local duplication is often better than a premature abstraction.",
    url: "https://overreacted.io/goodbye-clean-code/",
    source: "Overreacted (Dan Abramov)",
    tags: ["programming", "clean-code", "refactoring", "react"],
    date: "2020-01-11",
    readTime: "6 min read",
    popularity: 1290
  },
  {
    id: "post-3",
    title: "Microservices Guide: Monolithic vs. Distributed Architecture",
    category: "Posts",
    description: "Martin Fowler's classic review outlining the Monolith First pattern. Learn when microservices add organizational value and when they add destructive latency and complexity.",
    url: "https://martinfowler.com/articles/microservices.html",
    source: "Martin Fowler Blog",
    tags: ["architecture", "microservices", "scaling", "refactoring"],
    date: "2014-03-25",
    readTime: "22 min read",
    popularity: 1150
  },
  {
    id: "post-4",
    title: "The Joel Test: 12 Steps to Better Code",
    category: "Posts",
    description: "A legendary software engineering checklist measuring development quality. Does your team use source control? Build in one step? Write specs? Fix bugs before writing new code?",
    url: "https://www.joelonsoftware.com/2000/08/09/the-joel-test-12-steps-to-better-code/",
    source: "Joel on Software",
    tags: ["culture", "management", "testing", "best-practices"],
    date: "2000-08-09",
    readTime: "9 min read",
    popularity: 1040
  },
  {
    id: "post-5",
    title: "The Grug Brained Developer: Guide to Software Survival",
    category: "Posts",
    description: "An incredibly funny, satirical, yet profoundly wise guide to software engineering, covering complexity control, refactoring, DRY traps, and 'grug brain' strategies.",
    url: "https://grugbrain.dev/",
    source: "grugbrain.dev",
    tags: ["philosophy", "humor", "programming", "simplicity"],
    date: "2022-06-15",
    readTime: "16 min read",
    popularity: 1490
  },
  {
    id: "post-6",
    title: "Things You Should Never Do, Part I: Rebuilding From Scratch",
    category: "Posts",
    description: "Joel Spolsky's highly influential essay on why rebuilding a software codebase from scratch is the single worst strategic mistake a technology business can make.",
    url: "https://www.joelonsoftware.com/2000/04/06/things-you-should-never-do-part-i/",
    source: "Joel on Software",
    tags: ["business", "refactoring", "strategy", "history"],
    date: "2000-04-06",
    readTime: "8 min read",
    popularity: 910
  },
  {
    id: "post-7",
    title: "Choose Boring Technology: The Case for Tried-and-True Stacks",
    category: "Posts",
    description: "Dan McKinley introduces 'innovation tokens'. Why developer teams should build on stable, deeply understood databases (like Postgres) and boring utilities to save operational overhead.",
    url: "https://mcfunley.com/choose-boring-technology",
    source: "Dan McKinley (McFunley)",
    tags: ["ops", "architecture", "business", "databases"],
    date: "2015-03-30",
    readTime: "11 min read",
    popularity: 1110
  },
  {
    id: "post-8",
    title: "Don't Call Yourself a Programmer: Career Optimization",
    category: "Posts",
    description: "Patrick McKenzie's outstanding advice to software engineers on how to talk to businesses, understand corporate value generation, and negotiate executive-level salaries.",
    url: "https://www.kalzumeus.com/2011/10/28/dont-call-yourself-a-programmer/",
    source: "Kalzumeus (Patrick McKenzie)",
    tags: ["career", "negotiation", "business", "culture"],
    date: "2011-10-28",
    readTime: "20 min read",
    popularity: 970
  },
  {
    id: "post-9",
    title: "You Are Not Measuring What You Think You Are Measuring",
    category: "Posts",
    description: "A vital essay on database and network micro-benchmarks. Why synthetic browser loops do not represent actual real-world network latency or user layout execution.",
    url: "https://overreacted.io/",
    source: "Overreacted Blog",
    tags: ["performance", "testing", "standards"],
    date: "2025-05-18",
    readTime: "7 min read",
    popularity: 640
  },
  {
    id: "post-10",
    title: "The Law of Leaky Abstractions: Why All Abstractions Fail",
    category: "Posts",
    description: "Joel Spolsky explains why any non-trivial abstraction is bound to leak, meaning developers must still understand the underlying layers (e.g. SQL under an ORM, TCP under HTTP).",
    url: "https://www.joelonsoftware.com/2002/11/11/the-law-of-leaky-abstractions/",
    source: "Joel on Software",
    tags: ["philosophy", "architecture", "engineering"],
    date: "2002-11-11",
    readTime: "10 min read",
    popularity: 880
  },
  {
    id: "post-11",
    title: "Maker's Schedule, Manager's Schedule: Paul Graham Classic",
    category: "Posts",
    description: "Paul Graham details why standard 1-hour executive meetings represent zero friction for managers, but totally destroy the cognitive flow state of software developers and creators.",
    url: "http://www.paulgraham.com/makersschedule.html",
    source: "Paul Graham Essays",
    tags: ["philosophy", "management", "productivity", "culture"],
    date: "2009-07-01",
    readTime: "8 min read",
    popularity: 1250
  },
  {
    id: "post-12",
    title: "Raw Thought: Aaron Swartz Personal Blog Anthology",
    category: "Posts",
    description: "Explore the profound, highly-analytical writings of the internet activist Aaron Swartz, detailing the structural mechanics of open source, political logic, and education.",
    url: "http://www.aaronsw.com/weblog/",
    source: "Aaron Swartz Blog",
    tags: ["philosophy", "open-source", "activism", "education"],
    date: "2013-01-01",
    readTime: "14 min read",
    popularity: 1190
  },
  {
    id: "post-13",
    title: "The Cathedral and the Bazaar: Open Source Development",
    category: "Posts",
    description: "Eric S. Raymond's seminal analysis of software engineering models. Contrast the top-down corporate 'Cathedral' style against the distributed, peer-reviewed 'Bazaar' style.",
    url: "http://www.catb.org/~esr/writings/cathedral-bazaar/",
    source: "ESR Writings",
    tags: ["open-source", "programming", "culture", "history"],
    date: "1999-01-01",
    readTime: "35 min read",
    popularity: 890
  },
  {
    id: "post-14",
    title: "What is an innovation token? Choose boring tech explained",
    category: "Posts",
    description: "Dan McKinley breaks down innovation budgets. Why you should only select 1-2 new flashy databases/languages per startup setup, and rely on PostgreSQL/Ubuntu for the rest.",
    url: "https://mcfunley.com/choose-boring-technology",
    source: "McFunley Essays",
    tags: ["ops", "architecture", "scaling", "management"],
    date: "2015-03-30",
    readTime: "12 min read",
    popularity: 1050
  },
  {
    id: "post-15",
    title: "The Tyranny of the Structureless: Organizing groups",
    category: "Posts",
    description: "Jo Freeman's classic text explaining how 'structureless' flat groups are an illusion, often leading to unacknowledged, unaccountable, and highly elite power loops.",
    url: "https://www.jofreeman.com/joreen/tyranny.htm",
    source: "Jo Freeman Archive",
    tags: ["philosophy", "sociology", "management", "culture"],
    date: "1972-01-01",
    readTime: "15 min read",
    popularity: 910
  },
  {
    id: "post-16",
    title: "Refactoring: Improving the Design of Existing Code",
    category: "Posts",
    description: "Martin Fowler explains why refactoring is an continuous operational habit, not an end-of-year scheduled rewrite task. Learn standard mechanical codes smells.",
    url: "https://martinfowler.com/books/refactoring.html",
    source: "Martin Fowler",
    tags: ["refactoring", "clean-code", "best-practices", "architecture"],
    date: "2018-12-01",
    readTime: "20 min read",
    popularity: 1040
  },
  {
    id: "post-17",
    title: "Coding Horror: Programming as a Human Activity",
    category: "Posts",
    description: "Jeff Atwood's legendary writings on software engineering team setups, the hardware race, visual interface blunders, and the psychology of internet developers.",
    url: "https://blog.codinghorror.com/",
    source: "Coding Horror (Jeff Atwood)",
    tags: ["culture", "programming", "usability", "humanity"],
    date: "2025-08-14",
    readTime: "11 min read",
    popularity: 980
  },
  {
    id: "post-18",
    title: "The Mythical Man-Month: Software Engineering Guide",
    category: "Posts",
    description: "Fred Brooks' classic thesis. Why adding software developers to a late engineering project makes it even later, and the mechanics of conceptual integrity.",
    url: "https://en.wikipedia.org/wiki/The_Mythical_Man-Month",
    source: "Fred Brooks Essays",
    tags: ["management", "history", "scaling", "architecture"],
    date: "1975-01-01",
    readTime: "25 min read",
    popularity: 1110
  },
  {
    id: "post-19",
    title: "Beating the Averages: The Lisp Programming Essay",
    category: "Posts",
    description: "Paul Graham's personal story detailing how using Lisp gave his startup Viaweb a massive strategic programming advantage, letting them ship features at unmatched speed.",
    url: "http://www.paulgraham.com/avg.html",
    source: "Paul Graham Essays",
    tags: ["programming", "languages", "lisp", "business"],
    date: "2001-04-01",
    readTime: "16 min read",
    popularity: 1150
  },
  {
    id: "post-20",
    title: "A Mathematician's Apology: Pure vs Applied Math",
    category: "Posts",
    description: "G. H. Hardy's beautiful, melancholic defense of mathematics. Learn why mathematics is a creative art form, and why mathematical ideas are judged by beauty and depth.",
    url: "https://en.wikipedia.org/wiki/A_Mathematician%27s_Apology",
    source: "G. H. Hardy",
    tags: ["philosophy", "math", "art", "history"],
    date: "1940-01-01",
    readTime: "19 min read",
    popularity: 840
  }
];

// Dynamically generate tags index
export const ALL_TAGS = Array.from(
  new Set(CURATED_LIBRARY.flatMap(item => item.tags))
).sort();
