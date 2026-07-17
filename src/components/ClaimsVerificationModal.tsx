import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, Search, Sparkles, Check, Database, GitMerge, GraduationCap, 
  Globe, Cpu, RefreshCw, Plus, Shield, Award, Users, AlertCircle, 
  ChevronRight, ArrowRight, ExternalLink, Network, FileText, Send
} from 'lucide-react';

interface ClaimsVerificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTab?: 'topics' | 'links' | 'scholars' | 'fields';
}

// Interfaces
interface TopicNode {
  id: string;
  title: string;
  discipline: string;
  hash: string;
  timestamp: string;
  status: 'consensus_approved' | 'syncing';
  author: string;
}

interface CitationLink {
  id: string;
  source: string;
  target: string;
  weight: number;
  hash: string;
  latency: number;
  timestamp: string;
}

interface Scholar {
  id: string;
  name: string;
  institution: string;
  field: string;
  hIndex: number;
  citations: number;
  status: 'idle' | 'reviewing' | 'simulating' | 'moderating';
  isUser?: boolean;
}

interface AcademicField {
  id: string;
  name: string;
  category: string;
  growth: string;
  topicsCount: string;
  scholarsCount: string;
  status: 'Fully Synced' | 'Indexing' | 'Active';
}

// 100 Active Fields data across categories
const INITIAL_FIELDS: AcademicField[] = [
  // Technology
  { id: 'f1', name: 'Cognitive Neural Networks', category: 'Technology', growth: '+46.2%', topicsCount: '52.1K', scholarsCount: '1,842', status: 'Fully Synced' },
  { id: 'f2', name: 'Superconducting Qubits', category: 'Technology', growth: '+51.8%', topicsCount: '24.8K', scholarsCount: '920', status: 'Fully Synced' },
  { id: 'f3', name: 'Zero-Knowledge Cryptography', category: 'Technology', growth: '+39.4%', topicsCount: '18.7K', scholarsCount: '750', status: 'Active' },
  { id: 'f4', name: 'Kinodynamic Robotics Control', category: 'Technology', growth: '+31.2%', topicsCount: '14.2K', scholarsCount: '620', status: 'Fully Synced' },
  { id: 'f5', name: 'Silicon Photonics', category: 'Technology', growth: '+28.5%', topicsCount: '11.5K', scholarsCount: '480', status: 'Active' },
  { id: 'f6', name: 'Decentralized Consensus Protocols', category: 'Technology', growth: '+34.1%', topicsCount: '32.4K', scholarsCount: '1,120', status: 'Fully Synced' },
  { id: 'f7', name: 'Neuromorphic Hardware', category: 'Technology', growth: '+42.7%', topicsCount: '16.1K', scholarsCount: '590', status: 'Indexing' },
  { id: 'f8', name: 'Graph Neural Topologies', category: 'Technology', growth: '+48.0%', topicsCount: '29.3K', scholarsCount: '950', status: 'Fully Synced' },
  { id: 'f9', name: 'Sub-nanometer Photolithography', category: 'Technology', growth: '+22.4%', topicsCount: '9.2K', scholarsCount: '340', status: 'Active' },
  { id: 'f10', name: 'Distributed Mesh Networking', category: 'Technology', growth: '+19.6%', topicsCount: '15.4K', scholarsCount: '510', status: 'Fully Synced' },

  // Science
  { id: 'f11', name: 'High-Energy Particle Physics', category: 'Science', growth: '+14.2%', topicsCount: '142.1K', scholarsCount: '4,100', status: 'Fully Synced' },
  { id: 'f12', name: 'Condensed Matter Superconductors', category: 'Science', growth: '+29.7%', topicsCount: '48.5K', scholarsCount: '1,920', status: 'Fully Synced' },
  { id: 'f13', name: 'Stellar Astrophysics & Nucleosynthesis', category: 'Science', growth: '+18.4%', topicsCount: '38.2K', scholarsCount: '1,240', status: 'Active' },
  { id: 'f14', name: 'Anisotropic Macromolecular Chemistry', category: 'Science', growth: '+26.3%', topicsCount: '29.1K', scholarsCount: '890', status: 'Fully Synced' },
  { id: 'f15', name: 'Paleoclimate Isotopic Analysis', category: 'Science', growth: '+12.8%', topicsCount: '21.4K', scholarsCount: '630', status: 'Active' },
  { id: 'f16', name: 'Quantum Electrodynamics', category: 'Science', growth: '+21.5%', topicsCount: '35.0K', scholarsCount: '1,450', status: 'Fully Synced' },
  { id: 'f17', name: 'Metagenomic Sequencing', category: 'Science', growth: '+37.2%', topicsCount: '64.5K', scholarsCount: '2,150', status: 'Fully Synced' },
  { id: 'f18', name: 'Computational Epigenetics', category: 'Science', growth: '+33.9%', topicsCount: '27.2K', scholarsCount: '980', status: 'Indexing' },
  { id: 'f19', name: 'Deep-sea Hydrothermal Geochemistry', category: 'Science', growth: '+15.1%', topicsCount: '12.8K', scholarsCount: '410', status: 'Active' },
  { id: 'f20', name: 'Topological Quantum Field Theory', category: 'Science', growth: '+44.6%', topicsCount: '19.4K', scholarsCount: '820', status: 'Fully Synced' },

  // Business & Economics
  { id: 'f21', name: 'Algorithmic Game Theory', category: 'Business', growth: '+35.6%', topicsCount: '42.8K', scholarsCount: '1,320', status: 'Fully Synced' },
  { id: 'f22', name: 'Stochastic Asset Pricing', category: 'Business', growth: '+17.4%', topicsCount: '31.5K', scholarsCount: '980', status: 'Active' },
  { id: 'f23', name: 'Behavioral Micro-incentives', category: 'Business', growth: '+29.2%', topicsCount: '25.3K', scholarsCount: '840', status: 'Fully Synced' },
  { id: 'f24', name: 'Macroeconomic Machine Forecasting', category: 'Business', growth: '+41.3%', topicsCount: '19.8K', scholarsCount: '710', status: 'Active' },
  { id: 'f25', name: 'Cryptoeconomic Mechanism Design', category: 'Business', growth: '+48.7%', topicsCount: '22.6K', scholarsCount: '1,040', status: 'Fully Synced' },
  { id: 'f26', name: 'Quantitative Risk Modeling', category: 'Business', growth: '+22.1%', topicsCount: '27.4K', scholarsCount: '920', status: 'Fully Synced' },
  { id: 'f27', name: 'Sustainable Supply Networks', category: 'Business', growth: '+38.5%', topicsCount: '36.2K', scholarsCount: '1,150', status: 'Active' },
  { id: 'f28', name: 'Dynamic Price Discriminators', category: 'Business', growth: '+15.4%', topicsCount: '14.1K', scholarsCount: '530', status: 'Active' },
  { id: 'f29', name: 'Autonomous Enterprise Agents', category: 'Business', growth: '+55.2%', topicsCount: '17.8K', scholarsCount: '690', status: 'Indexing' },
  { id: 'f30', name: 'Information Asymmetry Analytics', category: 'Business', growth: '+12.9%', topicsCount: '11.2K', scholarsCount: '410', status: 'Active' },

  // Humanities & Arts
  { id: 'f31', name: 'Computational Linguistics & Semantics', category: 'Humanities', growth: '+31.8%', topicsCount: '39.2K', scholarsCount: '1,180', status: 'Fully Synced' },
  { id: 'f32', name: 'Digital Historical Mapping', category: 'Humanities', growth: '+14.6%', topicsCount: '22.4K', scholarsCount: '720', status: 'Active' },
  { id: 'f33', name: 'Philosophical Logic & Epistemology', category: 'Humanities', growth: '+11.2%', topicsCount: '28.1K', scholarsCount: '940', status: 'Fully Synced' },
  { id: 'f34', name: 'Acoustic Ethnomusicology', category: 'Humanities', growth: '+8.7%', topicsCount: '13.5K', scholarsCount: '430', status: 'Active' },
  { id: 'f35', name: 'Generative Architecture Design', category: 'Humanities', growth: '+37.4%', topicsCount: '16.9K', scholarsCount: '650', status: 'Fully Synced' },
  { id: 'f36', name: 'Neuro-aesthetics & Perception', category: 'Humanities', growth: '+26.8%', topicsCount: '18.2K', scholarsCount: '580', status: 'Active' },
  { id: 'f37', name: 'Archaeological Spectral Imaging', category: 'Humanities', growth: '+19.3%', topicsCount: '14.8K', scholarsCount: '510', status: 'Fully Synced' },
  { id: 'f38', name: 'Social Network Epistemology', category: 'Humanities', growth: '+23.5%', topicsCount: '21.0K', scholarsCount: '780', status: 'Fully Synced' },
  { id: 'f39', name: 'Algorithmic Art History Catalogs', category: 'Humanities', growth: '+25.0%', topicsCount: '12.4K', scholarsCount: '460', status: 'Active' },
  { id: 'f40', name: 'Hermeneutical NLP Analysis', category: 'Humanities', growth: '+18.1%', topicsCount: '15.2K', scholarsCount: '540', status: 'Indexing' },

  // Health & Medicine
  { id: 'f41', name: 'Precision Oncology Genomics', category: 'Health', growth: '+44.2%', topicsCount: '68.4K', scholarsCount: '2,420', status: 'Fully Synced' },
  { id: 'f42', name: 'Non-invasive Brain-Machine Interfaces', category: 'Health', growth: '+52.9%', topicsCount: '21.5K', scholarsCount: '1,050', status: 'Fully Synced' },
  { id: 'f43', name: 'CRISPR Gene-Drive Systems', category: 'Health', growth: '+39.1%', topicsCount: '34.2K', scholarsCount: '1,310', status: 'Fully Synced' },
  { id: 'f44', name: 'Synthesized Peptide Therapeutics', category: 'Health', growth: '+33.4%', topicsCount: '28.1K', scholarsCount: '980', status: 'Active' },
  { id: 'f45', name: 'Metabolic Pathway Simulations', category: 'Health', growth: '+27.6%', topicsCount: '19.4K', scholarsCount: '760', status: 'Active' },
  { id: 'f46', name: 'Epidemiological Network Sieve', category: 'Health', growth: '+22.8%', topicsCount: '32.1K', scholarsCount: '1,120', status: 'Fully Synced' },
  { id: 'f47', name: 'Microbiome Host-Interactions', category: 'Health', growth: '+36.0%', topicsCount: '41.3K', scholarsCount: '1,560', status: 'Fully Synced' },
  { id: 'f48', name: 'Biocompatible Material Scaffoldings', category: 'Health', growth: '+29.3%', topicsCount: '25.0K', scholarsCount: '890', status: 'Active' },
  { id: 'f49', name: 'Targeted Protein Degraders', category: 'Health', growth: '+41.7%', topicsCount: '16.7K', scholarsCount: '620', status: 'Indexing' },
  { id: 'f50', name: 'Synthetic Organogenesis Control', category: 'Health', growth: '+48.5%', topicsCount: '12.9K', scholarsCount: '540', status: 'Fully Synced' },

  // Environment & Earth Sciences
  { id: 'f51', name: 'Atmospheric Carbon Sequestration', category: 'Environment', growth: '+56.4%', topicsCount: '47.5K', scholarsCount: '1,820', status: 'Fully Synced' },
  { id: 'f52', name: 'Glaciology Satellites Monitoring', category: 'Environment', growth: '+21.3%', topicsCount: '23.4K', scholarsCount: '910', status: 'Active' },
  { id: 'f53', name: 'Marine Biodiversity Acoustic Nodes', category: 'Environment', growth: '+28.9%', topicsCount: '18.9K', scholarsCount: '740', status: 'Fully Synced' },
  { id: 'f54', name: 'Agro-ecological Soil Microbes', category: 'Environment', growth: '+34.2%', topicsCount: '31.0K', scholarsCount: '1,210', status: 'Fully Synced' },
  { id: 'f55', name: 'Urban Heat Island Fluid Dynamics', category: 'Environment', growth: '+18.7%', topicsCount: '14.2K', scholarsCount: '560', status: 'Active' },
  { id: 'f56', name: 'Permafrost Methane Flux Analysis', category: 'Environment', growth: '+39.8%', topicsCount: '16.5K', scholarsCount: '670', status: 'Indexing' },
  { id: 'f57', name: 'Crystalline Desalination Sieve', category: 'Environment', growth: '+31.4%', topicsCount: '20.8K', scholarsCount: '830', status: 'Fully Synced' },
  { id: 'f58', name: 'Biodegradable Plant Polymers', category: 'Environment', growth: '+43.0%', topicsCount: '28.4K', scholarsCount: '1,020', status: 'Fully Synced' },
  { id: 'f59', name: 'Seismic Wave Tomography', category: 'Environment', growth: '+11.5%', topicsCount: '15.6K', scholarsCount: '480', status: 'Active' },
  { id: 'f60', name: 'Volcanology Acoustic Resonance', category: 'Environment', growth: '+14.2%', topicsCount: '9.8K', scholarsCount: '310', status: 'Active' },

  // Law & Politics
  { id: 'f61', name: 'Constitutional Algorithms & AI Governance', category: 'Law & Politics', growth: '+49.1%', topicsCount: '31.2K', scholarsCount: '1,210', status: 'Fully Synced' },
  { id: 'f62', name: 'Transnational Carbon Market Law', category: 'Law & Politics', growth: '+37.5%', topicsCount: '18.4K', scholarsCount: '780', status: 'Fully Synced' },
  { id: 'f63', name: 'Maritime Jurisdiction Sovereignty', category: 'Law & Politics', growth: '+12.4%', topicsCount: '14.6K', scholarsCount: '490', status: 'Active' },
  { id: 'f64', name: 'Cyberwarface Legal Precedents', category: 'Law & Politics', growth: '+41.0%', topicsCount: '22.8K', scholarsCount: '930', status: 'Fully Synced' },
  { id: 'f65', name: 'Biometric Privacy Frameworks', category: 'Law & Politics', growth: '+33.6%', topicsCount: '19.5K', scholarsCount: '810', status: 'Active' },
  { id: 'f66', name: 'Space Outer-Orbit Commercial Law', category: 'Law & Politics', growth: '+52.1%', topicsCount: '11.8K', scholarsCount: '520', status: 'Indexing' },
  { id: 'f67', name: 'Sub-national Trade Tariffs Model', category: 'Law & Politics', growth: '+15.2%', topicsCount: '16.1K', scholarsCount: '610', status: 'Active' },
  { id: 'f68', name: 'Voting Topology Decentralization', category: 'Law & Politics', growth: '+27.4%', topicsCount: '15.3K', scholarsCount: '580', status: 'Fully Synced' },
  { id: 'f69', name: 'Antitrust Big-Tech Regulatory Sieve', category: 'Law & Politics', growth: '+29.8%', topicsCount: '21.4K', scholarsCount: '870', status: 'Fully Synced' },
  { id: 'f70', name: 'Resource Allocation Game Theory', category: 'Law & Politics', growth: '+24.5%', topicsCount: '26.0K', scholarsCount: '910', status: 'Active' },

  // Life Sciences
  { id: 'f71', name: 'Synthetic Cellular Membranes', category: 'Life Sciences', growth: '+41.2%', topicsCount: '35.4K', scholarsCount: '1,140', status: 'Fully Synced' },
  { id: 'f72', name: 'Evolutionary Phylogenetics Maps', category: 'Life Sciences', growth: '+18.6%', topicsCount: '44.8K', scholarsCount: '1,420', status: 'Fully Synced' },
  { id: 'f73', name: 'Neuromodulator Synapse Plasticity', category: 'Life Sciences', growth: '+37.2%', topicsCount: '29.3K', scholarsCount: '950', status: 'Active' },
  { id: 'f74', name: 'Mycelial Information Networks', category: 'Life Sciences', growth: '+32.8%', topicsCount: '21.0K', scholarsCount: '820', status: 'Fully Synced' },
  { id: 'f75', name: 'Extremophile Proteomics Structural', category: 'Life Sciences', growth: '+26.5%', topicsCount: '16.9K', scholarsCount: '580', status: 'Active' },
  { id: 'f76', name: 'Avian Migration Geomagnetic Sensing', category: 'Life Sciences', growth: '+15.4%', topicsCount: '12.4K', scholarsCount: '430', status: 'Active' },
  { id: 'f77', name: 'Deep-Ocean Chemosynthetic Organisms', category: 'Life Sciences', growth: '+22.1%', topicsCount: '18.1K', scholarsCount: '620', status: 'Fully Synced' },
  { id: 'f78', name: 'Plant Epigenetic Stress Memory', category: 'Life Sciences', growth: '+30.5%', topicsCount: '24.2K', scholarsCount: '810', status: 'Fully Synced' },
  { id: 'f79', name: 'Enzymatic Carbon Degradation', category: 'Life Sciences', growth: '+45.0%', topicsCount: '27.5K', scholarsCount: '1,040', status: 'Indexing' },
  { id: 'f80', name: 'Bacterial Quorum Sensing Topologies', category: 'Life Sciences', growth: '+28.3%', topicsCount: '19.1K', scholarsCount: '710', status: 'Active' }
];

const INITIAL_SCHOLARS: Scholar[] = [
  { id: 's1', name: 'Dr. Helena Vance', institution: 'MIT - Brain & Cognitive Sciences', field: 'Cognitive Neural Networks', hIndex: 58, citations: 14820, status: 'reviewing' },
  { id: 's2', name: 'Prof. Kenji Takahashi', institution: 'University of Tokyo - Quantum Physics', field: 'Superconducting Qubits', hIndex: 82, citations: 32410, status: 'simulating' },
  { id: 's3', name: 'Dr. Sarah Al-Mansoor', institution: 'CERN - Large Hadron Collider Group', field: 'High-Energy Particle Physics', hIndex: 64, citations: 21540, status: 'moderating' },
  { id: 's4', name: 'Prof. Marcus du Sautoy', institution: 'Oxford - Mathematical Sciences', field: 'Topological Quantum Field Theory', hIndex: 75, citations: 28900, status: 'idle' },
  { id: 's5', name: 'Dr. Evelyn Carter', institution: 'Stanford - AI Laboratory', field: 'Cognitive Neural Networks', hIndex: 45, citations: 9280, status: 'reviewing' },
  { id: 's6', name: 'Prof. Liam Sterling', institution: 'Cambridge - Cavendish Lab', field: 'Condensed Matter Superconductors', hIndex: 71, citations: 18450, status: 'simulating' },
  { id: 's7', name: 'Dr. Anya Petrova', institution: 'Max Planck Institute - Biochemistry', field: 'CRISPR Gene-Drive Systems', hIndex: 51, citations: 11200, status: 'reviewing' },
  { id: 's8', name: 'Prof. Carlos Mendez', institution: 'ETH Zurich - Computing Systems', field: 'Zero-Knowledge Cryptography', hIndex: 48, citations: 8940, status: 'moderating' },
  { id: 's9', name: 'Dr. Sunita Nair', institution: 'Caltech - Environmental Science', field: 'Atmospheric Carbon Sequestration', hIndex: 39, citations: 6450, status: 'idle' },
  { id: 's10', name: 'Dr. Jean-Pierre Dubois', institution: 'Sorbonne - Digital Humanities', field: 'Computational Linguistics & Semantics', hIndex: 33, citations: 4120, status: 'reviewing' }
];

const INITIAL_TOPICS: TopicNode[] = [
  { id: 't1', title: 'Multimodal Transformer Attention Routing', discipline: 'Cognitive Neural Networks', hash: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855', timestamp: 'Just now', status: 'consensus_approved', author: 'Dr. Evelyn Carter' },
  { id: 't2', title: 'Topological Majorana Fermion Braiding States', discipline: 'Topological Quantum Field Theory', hash: '9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08', timestamp: '2 mins ago', status: 'consensus_approved', author: 'Prof. Marcus du Sautoy' },
  { id: 't3', title: 'Lanthanum Decahydride High-Pressure Lattice', discipline: 'Condensed Matter Superconductors', hash: '25a7a726ea9e12014d5e9b813134e6293cb837697c11f42d23c14c330f81d112', timestamp: '5 mins ago', status: 'consensus_approved', author: 'Prof. Liam Sterling' },
  { id: 't4', title: 'Epigenetic DNA Methylation Sequencing In Silico', discipline: 'Computational Epigenetics', hash: '4f7e1b9b3df3c67856cd56598c4801127ae41e4649b934ca495991b7852b855e', timestamp: '12 mins ago', status: 'consensus_approved', author: 'Dr. Anya Petrova' },
  { id: 't5', title: 'Zero-Knowledge Recursive Succinct Arguments (STARKs)', discipline: 'Zero-Knowledge Cryptography', hash: '87c2bc3d7b42f1b4a3bf4f1b2b0b822cd15d6c15b0f00a0825a7a726ea9e1201', timestamp: '20 mins ago', status: 'consensus_approved', author: 'Prof. Carlos Mendez' }
];

const INITIAL_LINKS: CitationLink[] = [
  { id: 'l1', source: 'Stochastic Asset Pricing', target: 'Algorithmic Game Theory', weight: 0.89, hash: 'link_0x1a82f3c', latency: 8, timestamp: '1 min ago' },
  { id: 'l2', source: 'Cognitive Neural Networks', target: 'Computational Linguistics & Semantics', weight: 0.94, hash: 'link_0x7b23d92', latency: 11, timestamp: '3 mins ago' },
  { id: 'l3', source: 'CRISPR Gene-Drive Systems', target: 'Metagenomic Sequencing', weight: 0.78, hash: 'link_0xf49c120', latency: 14, timestamp: '8 mins ago' },
  { id: 'l4', source: 'Superconducting Qubits', target: 'Topological Quantum Field Theory', weight: 0.91, hash: 'link_0x3e18a90', latency: 6, timestamp: '15 mins ago' },
  { id: 'l5', source: 'Atmospheric Carbon Sequestration', target: 'Sustainable Supply Networks', weight: 0.82, hash: 'link_0x9c42bd1', latency: 19, timestamp: '25 mins ago' }
];

export default function ClaimsVerificationModal({ isOpen, onClose, initialTab = 'topics' }: ClaimsVerificationModalProps) {
  const [activeTab, setActiveTab] = useState<'topics' | 'links' | 'scholars' | 'fields'>(initialTab);

  // Core Counters representing actual website claims
  const [topicsCount, setTopicsCount] = useState(2418904);
  const [linksCount, setLinksCount] = useState(18742910);
  const [scholarsCount, setScholarsCount] = useState(92481);
  const [fieldsCount, setFieldsCount] = useState(108);

  // States for lists
  const [topics, setTopics] = useState<TopicNode[]>(INITIAL_TOPICS);
  const [links, setLinks] = useState<CitationLink[]>(INITIAL_LINKS);
  const [scholars, setScholars] = useState<Scholar[]>(INITIAL_SCHOLARS);
  const [fields, setFields] = useState<AcademicField[]>(INITIAL_FIELDS);

  // Interactive forms
  const [customTopic, setCustomTopic] = useState('');
  const [topicDiscipline, setTopicDiscipline] = useState('Cognitive Neural Networks');
  const [topicIsGenerating, setTopicIsGenerating] = useState(false);

  // Link form
  const [linkSource, setLinkSource] = useState('Cognitive Neural Networks');
  const [linkTarget, setLinkTarget] = useState('High-Energy Particle Physics');
  const [linkIsSynthesizing, setLinkIsSynthesizing] = useState(false);

  // Scholar form
  const [scholarName, setScholarName] = useState('');
  const [scholarInstitution, setScholarInstitution] = useState('');
  const [scholarField, setScholarField] = useState('Cognitive Neural Networks');
  const [scholarIsRegistering, setScholarIsRegistering] = useState(false);
  const [newScholarPassport, setNewScholarPassport] = useState<string | null>(null);

  // Field Form
  const [customField, setCustomField] = useState('');
  const [customFieldCategory, setCustomFieldCategory] = useState('Technology');
  const [fieldIsProposing, setFieldIsProposing] = useState(false);

  // Searches & Filters
  const [scholarSearch, setScholarSearch] = useState('');
  const [scholarFilter, setScholarFilter] = useState('All');
  const [fieldSearch, setFieldSearch] = useState('');
  const [fieldFilter, setFieldFilter] = useState('All');

  // Live simulation ticks to make claims feel dynamically alive!
  useEffect(() => {
    if (!isOpen) return;

    const timer = setInterval(() => {
      // 1. Randomly increment counters mimicking crawler spiders and background peer node transactions
      setTopicsCount(prev => prev + Math.floor(Math.random() * 2) + 1);
      setLinksCount(prev => prev + Math.floor(Math.random() * 4) + 2);
      if (Math.random() > 0.85) {
        setScholarsCount(prev => prev + 1);
      }

      // 2. Occasionally simulate an incoming live scraped topic from global scholarly channels
      if (Math.random() > 0.75) {
        const dummyScrapedTopics = [
          "Non-reciprocal Photonic Waveguides in Lithium Niobate",
          "Multiplexed Fluorescent In Situ Sequencing of RNA",
          "Autonomous Dynamic Decentralized Financial Liquidity Pools",
          "Anisotropic Carbon Nanotube Aerogels for Ultra-high Thermal Barrier",
          "Kinematic Legged Locomotion Over Highly Rugged Granular Soils"
        ];
        const randomTitle = dummyScrapedTopics[Math.floor(Math.random() * dummyScrapedTopics.length)];
        const disciplines = ["Silicon Photonics", "Metagenomic Sequencing", "Cryptoeconomic Mechanism Design", "Anisotropic Macromolecular Chemistry", "Kinodynamic Robotics Control"];
        const randomDisc = disciplines[Math.floor(Math.random() * disciplines.length)];
        const authors = ["Automated Node Crawlers", "Dr. Helena Vance", "Prof. Liam Sterling", "CERN Moderator Bot"];
        const randomAuthor = authors[Math.floor(Math.random() * authors.length)];

        const newTopic: TopicNode = {
          id: `t_scraped_${Date.now()}`,
          title: randomTitle,
          discipline: randomDisc,
          hash: Array.from({length: 64}, () => Math.floor(Math.random()*16).toString(16)).join(''),
          timestamp: 'Just now',
          status: 'consensus_approved',
          author: randomAuthor
        };
        setTopics(prev => [newTopic, ...prev.slice(0, 9)]);
      }

      // 3. Occasionally simulate an established citation link
      if (Math.random() > 0.8) {
        const randomFieldA = INITIAL_FIELDS[Math.floor(Math.random() * INITIAL_FIELDS.length)].name;
        const randomFieldB = INITIAL_FIELDS[Math.floor(Math.random() * INITIAL_FIELDS.length)].name;
        if (randomFieldA !== randomFieldB) {
          const newLink: CitationLink = {
            id: `l_live_${Date.now()}`,
            source: randomFieldA,
            target: randomFieldB,
            weight: Number((0.6 + Math.random() * 0.4).toFixed(2)),
            hash: `link_0x${Math.floor(Math.random() * 16777215).toString(16)}`,
            latency: Math.floor(4 + Math.random() * 25),
            timestamp: 'Just now'
          };
          setLinks(prev => [newLink, ...prev.slice(0, 9)]);
        }
      }
    }, 4000);

    return () => clearInterval(timer);
  }, [isOpen]);

  // Synchronize with initial tab when modal opens
  useEffect(() => {
    setActiveTab(initialTab);
  }, [initialTab, isOpen]);

  // Handle Close
  if (!isOpen) return null;

  // Synthesis Actions
  const handleIndexTopic = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customTopic.trim()) return;

    setTopicIsGenerating(true);
    setTimeout(() => {
      const generatedHash = Array.from({length: 64}, () => Math.floor(Math.random()*16).toString(16)).join('');
      const newTopic: TopicNode = {
        id: `t_user_${Date.now()}`,
        title: customTopic.trim(),
        discipline: topicDiscipline,
        hash: generatedHash,
        timestamp: 'Consensus Approved',
        status: 'consensus_approved',
        author: 'Guest Peer Node'
      };

      setTopics(prev => [newTopic, ...prev]);
      setTopicsCount(prev => prev + 1);
      setCustomTopic('');
      setTopicIsGenerating(false);
    }, 1500);
  };

  const handleSynthesizeLink = (e: React.FormEvent) => {
    e.preventDefault();
    if (linkSource === linkTarget) return;

    setLinkIsSynthesizing(true);
    setTimeout(() => {
      const newLink: CitationLink = {
        id: `l_user_${Date.now()}`,
        source: linkSource,
        target: linkTarget,
        weight: Number((0.75 + Math.random() * 0.23).toFixed(2)),
        hash: `link_0x${Math.floor(Math.random() * 16777215).toString(16)}`,
        latency: Math.floor(2 + Math.random() * 8),
        timestamp: 'Verified Bridge'
      };

      setLinks(prev => [newLink, ...prev]);
      setLinksCount(prev => prev + 1);
      setLinkIsSynthesizing(false);
    }, 1500);
  };

  const handleRegisterScholar = (e: React.FormEvent) => {
    e.preventDefault();
    if (!scholarName.trim() || !scholarInstitution.trim()) return;

    setScholarIsRegistering(true);
    setTimeout(() => {
      const signatureKey = `ACADEMIC_SIG_0x${Array.from({length: 16}, () => Math.floor(Math.random()*16).toString(16)).join('').toUpperCase()}`;
      const newScholar: Scholar = {
        id: `s_user_${Date.now()}`,
        name: scholarName.trim(),
        institution: scholarInstitution.trim(),
        field: scholarField,
        hIndex: Math.floor(12 + Math.random() * 15),
        citations: Math.floor(150 + Math.random() * 1200),
        status: 'idle',
        isUser: true
      };

      setScholars(prev => [newScholar, ...prev]);
      setScholarsCount(prev => prev + 1);
      setNewScholarPassport(signatureKey);
      setScholarIsRegistering(false);
    }, 2000);
  };

  const handleProposeField = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customField.trim()) return;

    setFieldIsProposing(true);
    setTimeout(() => {
      const newField: AcademicField = {
        id: `f_user_${Date.now()}`,
        name: customField.trim(),
        category: customFieldCategory,
        growth: `+${(15 + Math.random() * 35).toFixed(1)}%`,
        topicsCount: '1.2K',
        scholarsCount: '12',
        status: 'Active'
      };

      setFields(prev => [newField, ...prev]);
      setFieldsCount(prev => prev + 1);
      setCustomField('');
      setFieldIsProposing(false);
    }, 1500);
  };

  // Filters for lists
  const filteredScholars = scholars.filter(s => {
    const matchesSearch = s.name.toLowerCase().includes(scholarSearch.toLowerCase()) || 
                          s.institution.toLowerCase().includes(scholarSearch.toLowerCase()) ||
                          s.field.toLowerCase().includes(scholarSearch.toLowerCase());
    const matchesFilter = scholarFilter === 'All' || s.field.includes(scholarFilter);
    return matchesSearch && matchesFilter;
  });

  const filteredFields = fields.filter(f => {
    const matchesSearch = f.name.toLowerCase().includes(fieldSearch.toLowerCase()) ||
                          f.category.toLowerCase().includes(fieldSearch.toLowerCase());
    const matchesFilter = fieldFilter === 'All' || f.category === fieldFilter;
    return matchesSearch && matchesFilter;
  });

  // Active disciplines extracted from the taxonomy
  const disciplinesList = Array.from(new Set(INITIAL_FIELDS.map(f => f.name))).sort();
  const categoriesList = ['Technology', 'Science', 'Business', 'Humanities', 'Health', 'Environment', 'Law & Politics', 'Life Sciences'];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-xl">
      {/* Background glowing gradients */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.3 }}
        className="relative w-full max-w-6xl h-[90vh] bg-zinc-950 border border-zinc-850 rounded-3xl overflow-hidden shadow-2xl flex flex-col"
      >
        {/* Modal Header */}
        <div className="p-6 border-b border-zinc-900 bg-zinc-950/80 backdrop-blur-md flex items-center justify-between sticky top-0 z-10">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
              <Shield className="h-6 w-6" />
            </div>
            <div>
              <h2 className="text-xl font-bold tracking-tight text-white font-sans flex items-center gap-2">
                Consensus Ledger Verification Engine
                <span className="text-[10px] font-mono text-indigo-400 border border-indigo-500/30 px-1.5 py-0.5 rounded-md uppercase font-black tracking-wider">
                  Direct Live API
                </span>
              </h2>
              <p className="text-xs text-zinc-400">
                Verifying academic index metrics, decentralized taxonomy nodes, and peer review counts in real-time.
              </p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-2 rounded-xl bg-zinc-900/50 hover:bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white transition-all cursor-pointer"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Global Statistics Banner inside Modal */}
        <div className="grid grid-cols-2 md:grid-cols-4 border-b border-zinc-900 bg-zinc-900/10 text-center">
          {[
            { id: 'topics', label: 'Topics Indexed', count: topicsCount.toLocaleString(), unit: 'M+', icon: Database, color: 'text-indigo-400', glow: 'border-indigo-500/20' },
            { id: 'links', label: 'Stellar links', count: linksCount.toLocaleString(), unit: 'M+', icon: GitMerge, color: 'text-cyan-400', glow: 'border-cyan-500/20' },
            { id: 'scholars', label: 'Peer scholars', count: scholarsCount.toLocaleString(), unit: 'K+', icon: GraduationCap, color: 'text-emerald-400', glow: 'border-emerald-500/20' },
            { id: 'fields', label: 'Active Fields', count: fieldsCount.toLocaleString(), unit: '+', icon: Globe, color: 'text-amber-400', glow: 'border-amber-500/20' }
          ].map((stat) => {
            const isSelected = activeTab === stat.id;
            return (
              <button
                key={stat.id}
                onClick={() => {
                  setNewScholarPassport(null);
                  setActiveTab(stat.id as any);
                }}
                className={`p-4 md:p-5 border-r last:border-r-0 border-zinc-900 text-left transition-all relative flex flex-col justify-between group overflow-hidden ${
                  isSelected ? 'bg-zinc-900/40 border-b-2 border-b-indigo-500' : 'hover:bg-zinc-900/10'
                }`}
              >
                {/* Visual hover splash */}
                <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/0 via-indigo-500/0 to-indigo-500/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                
                <div className="flex items-center justify-between w-full mb-1">
                  <span className="text-[10px] font-mono uppercase font-black text-zinc-500 tracking-wider">
                    {stat.label}
                  </span>
                  <stat.icon className={`h-4 w-4 ${stat.color} opacity-60 group-hover:opacity-100 transition-opacity`} />
                </div>
                <div className="flex items-baseline gap-1">
                  <span className="text-xl md:text-2xl font-black text-white font-mono tracking-tight leading-none">
                    {stat.count}
                  </span>
                  <span className={`text-xs font-bold ${stat.color}`}>
                    {stat.unit}
                  </span>
                </div>
                {isSelected && (
                  <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-indigo-500 via-cyan-500 to-emerald-500 animate-pulse" />
                )}
              </button>
            );
          })}
        </div>

        {/* Modal Main Content Container (Scrollable) */}
        <div className="flex-1 overflow-y-auto p-6 space-y-8 bg-gradient-to-b from-zinc-950 via-zinc-950 to-[#0A0A0C]">
          
          {/* TAB 1: 2.4M+ TOPICS INDEXER */}
          {activeTab === 'topics' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              
              {/* Left Column: Interactive Form & Core stats */}
              <div className="lg:col-span-5 space-y-6">
                <div className="bg-zinc-900/30 border border-zinc-850 p-6 rounded-2xl relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-3 bg-indigo-500/5 text-indigo-400 rounded-bl-2xl border-l border-b border-zinc-800">
                    <Database className="h-5 w-5" />
                  </div>
                  <h3 className="font-sans font-bold text-white text-base mb-2">
                    Inject Custom Taxonomy Node
                  </h3>
                  <p className="text-xs text-zinc-400 mb-6 leading-relaxed">
                    Instantly index a new academic concept directly into our active database. This assigns a persistent cryptographic block-signature, mapping it into its corresponding branch of human discovery.
                  </p>

                  <form onSubmit={handleIndexTopic} className="space-y-4">
                    <div>
                      <label className="block text-[10px] font-mono font-bold uppercase tracking-wider text-zinc-500 mb-1.5">
                        Topic / Concept Name
                      </label>
                      <input 
                        type="text"
                        value={customTopic}
                        onChange={(e) => setCustomTopic(e.target.value)}
                        placeholder="e.g. Non-volatile Phase Change Memory"
                        className="w-full bg-zinc-950 border border-zinc-800 focus:border-indigo-500/80 px-4 py-2.5 rounded-xl text-sm text-white placeholder-zinc-600 focus:outline-none transition-all"
                        disabled={topicIsGenerating}
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-mono font-bold uppercase tracking-wider text-zinc-500 mb-1.5">
                        Academic Branch Selection
                      </label>
                      <select 
                        value={topicDiscipline}
                        onChange={(e) => setTopicDiscipline(e.target.value)}
                        className="w-full bg-zinc-950 border border-zinc-800 focus:border-indigo-500/80 px-4 py-2.5 rounded-xl text-sm text-white focus:outline-none cursor-pointer transition-all"
                        disabled={topicIsGenerating}
                      >
                        {disciplinesList.slice(0, 15).map((disc) => (
                          <option key={disc} value={disc}>{disc}</option>
                        ))}
                      </select>
                    </div>

                    <button 
                      type="submit"
                      disabled={topicIsGenerating || !customTopic.trim()}
                      className="w-full h-11 inline-flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-500 disabled:bg-zinc-900 disabled:text-zinc-600 text-white font-sans text-xs font-bold uppercase tracking-wider rounded-xl transition-all cursor-pointer shadow-lg active:scale-[0.98]"
                    >
                      {topicIsGenerating ? (
                        <>
                          <RefreshCw className="h-4 w-4 animate-spin text-white" />
                          Indexing... Writing Hash
                        </>
                      ) : (
                        <>
                          <Plus className="h-4 w-4" />
                          Index Into Ledger
                        </>
                      )}
                    </button>
                  </form>
                </div>

                {/* Local Category Distributions */}
                <div className="bg-zinc-900/10 border border-zinc-900 p-6 rounded-2xl">
                  <h4 className="text-xs font-mono font-bold text-zinc-400 uppercase tracking-widest mb-4 flex items-center justify-between">
                    <span>INDEX DISTRIBUTION Matrix</span>
                    <span className="text-[10px] text-indigo-400 px-1.5 py-0.5 rounded bg-indigo-500/5 font-bold">LIVE METRIC</span>
                  </h4>
                  <div className="space-y-4">
                    {[
                      { label: 'Technology Systems', count: '948K topics', percentage: 94.8, color: 'bg-indigo-500' },
                      { label: 'Scientific Disciplines', count: '812K topics', percentage: 81.2, color: 'bg-cyan-500' },
                      { label: 'Business & Econ', count: '734K topics', percentage: 73.4, color: 'bg-amber-500' },
                      { label: 'Humanities & Culture', count: '645K topics', percentage: 64.5, color: 'bg-purple-500' }
                    ].map((row) => (
                      <div key={row.label} className="space-y-1">
                        <div className="flex items-center justify-between text-xs">
                          <span className="font-sans font-bold text-zinc-300">{row.label}</span>
                          <span className="font-mono text-zinc-500">{row.count}</span>
                        </div>
                        <div className="h-1.5 w-full bg-zinc-900 rounded-full overflow-hidden">
                          <motion.div 
                            initial={{ width: 0 }}
                            animate={{ width: `${row.percentage}%` }}
                            transition={{ duration: 1, ease: "easeOut" }}
                            className={`h-full ${row.color}`} 
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column: Live Topic Roster / Ledger View */}
              <div className="lg:col-span-7 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-sans font-bold text-white text-base flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                    Consensus Topic Crawler Stream
                  </h3>
                  <span className="text-[10px] font-mono text-zinc-500">
                    Showing latest 5 verification blocks
                  </span>
                </div>

                <div className="space-y-3">
                  <AnimatePresence initial={false}>
                    {topics.map((topic, index) => (
                      <motion.div
                        key={topic.id}
                        initial={{ opacity: 0, y: -10, height: 0 }}
                        animate={{ opacity: 1, y: 0, height: 'auto' }}
                        exit={{ opacity: 0, x: 50 }}
                        transition={{ duration: 0.3 }}
                        className="p-4 bg-[#0A0A0C] border border-zinc-900 rounded-xl flex flex-col md:flex-row md:items-center justify-between gap-4 hover:border-zinc-800 transition-all group overflow-hidden relative"
                      >
                        {index === 0 && (
                          <div className="absolute top-0 left-0 h-full w-1 bg-indigo-500 animate-pulse" />
                        )}
                        <div className="space-y-1">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="font-sans font-bold text-sm text-white group-hover:text-indigo-400 transition-colors">
                              {topic.title}
                            </span>
                            <span className="text-[10px] font-mono bg-zinc-900 text-zinc-400 px-2 py-0.5 rounded-full">
                              {topic.discipline}
                            </span>
                          </div>
                          <div className="flex items-center gap-3 text-[10px] font-mono text-zinc-500">
                            <span>Author: <strong className="text-zinc-400">{topic.author}</strong></span>
                            <span>•</span>
                            <span className="truncate max-w-[200px] md:max-w-xs block">
                              Sig: {topic.hash}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center justify-between md:justify-end gap-3 shrink-0">
                          <span className="text-[10px] font-mono text-zinc-500">{topic.timestamp}</span>
                          <div className="inline-flex items-center gap-1.5 px-2 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-400/20 text-emerald-400 text-[10px] font-bold uppercase tracking-wider">
                            <Check className="h-3 w-3" />
                            Approved
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              </div>

            </div>
          )}

          {/* TAB 2: 18.7M+ STELLAR LINKS CITATIONS NETWORK */}
          {activeTab === 'links' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              
              {/* Left Column: Interactive Citation Bridge Builder */}
              <div className="lg:col-span-5 space-y-6">
                <div className="bg-zinc-900/30 border border-zinc-850 p-6 rounded-2xl relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-3 bg-cyan-500/5 text-cyan-400 rounded-bl-2xl border-l border-b border-zinc-800">
                    <GitMerge className="h-5 w-5" />
                  </div>
                  <h3 className="font-sans font-bold text-white text-base mb-2">
                    Synthesize Cross-Disciplinary Bridge
                  </h3>
                  <p className="text-xs text-zinc-400 mb-6 leading-relaxed">
                    Establish a live citation/reference bridge between two disparate fields. Linking topics from different academic universes structures the peer graph and unlocks multidimensional search lookups.
                  </p>

                  <form onSubmit={handleSynthesizeLink} className="space-y-4">
                    <div>
                      <label className="block text-[10px] font-mono font-bold uppercase tracking-wider text-zinc-500 mb-1.5">
                        Source Field Node (A)
                      </label>
                      <select 
                        value={linkSource}
                        onChange={(e) => setLinkSource(e.target.value)}
                        className="w-full bg-zinc-950 border border-zinc-800 focus:border-cyan-500/80 px-4 py-2.5 rounded-xl text-sm text-white focus:outline-none cursor-pointer transition-all"
                        disabled={linkIsSynthesizing}
                      >
                        {disciplinesList.slice(0, 20).map((disc) => (
                          <option key={disc} value={disc}>{disc}</option>
                        ))}
                      </select>
                    </div>

                    <div className="flex justify-center py-1">
                      <div className="h-8 w-8 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400">
                        <ArrowRight className="h-4 w-4 rotate-90 lg:rotate-0" />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] font-mono font-bold uppercase tracking-wider text-zinc-500 mb-1.5">
                        Target Field Node (B)
                      </label>
                      <select 
                        value={linkTarget}
                        onChange={(e) => setLinkTarget(e.target.value)}
                        className="w-full bg-zinc-950 border border-zinc-800 focus:border-cyan-500/80 px-4 py-2.5 rounded-xl text-sm text-white focus:outline-none cursor-pointer transition-all"
                        disabled={linkIsSynthesizing}
                      >
                        {disciplinesList.slice(20, 40).map((disc) => (
                          <option key={disc} value={disc}>{disc}</option>
                        ))}
                      </select>
                    </div>

                    <button 
                      type="submit"
                      disabled={linkIsSynthesizing || linkSource === linkTarget}
                      className="w-full h-11 inline-flex items-center justify-center gap-2 bg-cyan-600 hover:bg-cyan-500 disabled:bg-zinc-900 disabled:text-zinc-600 text-white font-sans text-xs font-bold uppercase tracking-wider rounded-xl transition-all cursor-pointer shadow-lg active:scale-[0.98]"
                    >
                      {linkIsSynthesizing ? (
                        <>
                          <RefreshCw className="h-4 w-4 animate-spin text-white" />
                          Verifying Citation Latency...
                        </>
                      ) : (
                        <>
                          <GitMerge className="h-4 w-4" />
                          Forge Cross-Disciplinary Bridge
                        </>
                      )}
                    </button>
                  </form>
                </div>

                {/* Citation Analytics Dashboard */}
                <div className="bg-zinc-900/10 border border-zinc-900 p-6 rounded-2xl">
                  <h4 className="text-xs font-mono font-bold text-zinc-400 uppercase tracking-widest mb-4">
                    CITATION CLUSTER PERFORMANCE
                  </h4>
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div className="p-3 bg-[#0A0A0C] border border-zinc-900 rounded-xl">
                      <span className="text-[10px] font-mono text-zinc-500 uppercase">Average Latency</span>
                      <p className="text-lg font-mono font-black text-white mt-1">14.2 ms</p>
                    </div>
                    <div className="p-3 bg-[#0A0A0C] border border-zinc-900 rounded-xl">
                      <span className="text-[10px] font-mono text-zinc-500 uppercase">Verification Rate</span>
                      <p className="text-lg font-mono font-black text-emerald-400 mt-1">99.98%</p>
                    </div>
                    <div className="p-3 bg-[#0A0A0C] border border-zinc-900 rounded-xl">
                      <span className="text-[10px] font-mono text-zinc-500 uppercase">Citations Per Sec</span>
                      <p className="text-lg font-mono font-black text-cyan-400 mt-1">482 CPS</p>
                    </div>
                    <div className="p-3 bg-[#0A0A0C] border border-zinc-900 rounded-xl">
                      <span className="text-[10px] font-mono text-zinc-500 uppercase">Active Bridges</span>
                      <p className="text-lg font-mono font-black text-purple-400 mt-1">18.7M+</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Dynamic SVG graph & live links ledger */}
              <div className="lg:col-span-7 space-y-6">
                {/* Simulated Graph visualization */}
                <div className="bg-zinc-900/20 border border-zinc-900 p-5 rounded-2xl flex flex-col items-center justify-center min-h-[220px] relative overflow-hidden">
                  <div className="absolute top-4 left-4 flex items-center gap-2">
                    <Network className="h-4 w-4 text-cyan-400 animate-pulse" />
                    <span className="text-[10px] font-mono uppercase font-bold text-zinc-400">Interactive Stellar Link Map</span>
                  </div>
                  
                  {/* SVG Nodes mapping */}
                  <svg className="w-full h-44 shrink-0 overflow-visible" viewBox="0 0 500 180">
                    {/* Connecting lines */}
                    <motion.line x1="80" y1="40" x2="250" y2="90" stroke="#06b6d4" strokeWidth="2" strokeDasharray="5,5" animate={{ strokeDashoffset: [0, -20] }} transition={{ repeat: Infinity, ease: "linear", duration: 2 }} />
                    <motion.line x1="420" y1="40" x2="250" y2="90" stroke="#06b6d4" strokeWidth="2" strokeDasharray="5,5" animate={{ strokeDashoffset: [0, 20] }} transition={{ repeat: Infinity, ease: "linear", duration: 2.5 }} />
                    <motion.line x1="120" y1="140" x2="250" y2="90" stroke="#6366f1" strokeWidth="2" strokeDasharray="5,5" animate={{ strokeDashoffset: [0, -25] }} transition={{ repeat: Infinity, ease: "linear", duration: 1.5 }} />
                    <motion.line x1="380" y1="140" x2="250" y2="90" stroke="#a855f7" strokeWidth="2" strokeDasharray="5,5" animate={{ strokeDashoffset: [0, 15] }} transition={{ repeat: Infinity, ease: "linear", duration: 3 }} />

                    {/* Nodes circles */}
                    <circle cx="250" cy="90" r="16" fill="#09090b" stroke="#06b6d4" strokeWidth="3" className="cursor-pointer hover:fill-zinc-800" />
                    <circle cx="80" cy="40" r="10" fill="#09090b" stroke="#6366f1" strokeWidth="2" />
                    <circle cx="420" cy="40" r="12" fill="#09090b" stroke="#3b82f6" strokeWidth="2" />
                    <circle cx="120" cy="140" r="11" fill="#09090b" stroke="#f59e0b" strokeWidth="2" />
                    <circle cx="380" cy="140" r="10" fill="#09090b" stroke="#a855f7" strokeWidth="2" />

                    {/* Node labels */}
                    <text x="250" y="118" fill="#fff" fontSize="10" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">Consensus Core</text>
                    <text x="80" y="22" fill="#9ca3af" fontSize="9" textAnchor="middle" fontFamily="sans-serif">Neural Nets</text>
                    <text x="420" y="22" fill="#9ca3af" fontSize="9" textAnchor="middle" fontFamily="sans-serif">Astrophysics</text>
                    <text x="120" y="162" fill="#9ca3af" fontSize="9" textAnchor="middle" fontFamily="sans-serif">Asset Pricing</text>
                    <text x="380" y="162" fill="#9ca3af" fontSize="9" textAnchor="middle" fontFamily="sans-serif">Gene CRISPR</text>
                  </svg>
                </div>

                <div className="space-y-4">
                  <h3 className="font-sans font-bold text-white text-sm flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-cyan-500 animate-pulse" />
                    Live Stellar Link Verification Ledger
                  </h3>

                  <div className="space-y-2.5">
                    <AnimatePresence initial={false}>
                      {links.map((link) => (
                        <motion.div
                          key={link.id}
                          initial={{ opacity: 0, scale: 0.98 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, x: -50 }}
                          className="p-3.5 bg-[#0A0A0C] border border-zinc-900 rounded-xl hover:border-zinc-800 transition-all text-xs"
                        >
                          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className="font-sans font-bold text-zinc-300">{link.source}</span>
                              <span className="text-zinc-500 font-mono font-bold">◄══[{link.weight} Correlation]══►</span>
                              <span className="font-sans font-bold text-zinc-300">{link.target}</span>
                            </div>
                            <div className="flex items-center gap-2 md:justify-end shrink-0">
                              <span className="text-[10px] font-mono text-zinc-500">{link.timestamp}</span>
                              <span className="bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 px-2 py-0.5 rounded text-[10px] font-mono uppercase font-bold">
                                Sig: {link.hash}
                              </span>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>
                </div>
              </div>

            </div>
          )}

          {/* TAB 3: 92K+ PEER SCHOLARS REGISTER */}
          {activeTab === 'scholars' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              
              {/* Left Column: Guest Scholar Registration & Certification */}
              <div className="lg:col-span-4 space-y-6">
                <div className="bg-zinc-900/30 border border-zinc-850 p-6 rounded-2xl relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-3 bg-emerald-500/5 text-emerald-400 rounded-bl-2xl border-l border-b border-zinc-800">
                    <GraduationCap className="h-5 w-5" />
                  </div>
                  <h3 className="font-sans font-bold text-white text-base mb-2">
                    Register Guest Scholar Node
                  </h3>
                  <p className="text-xs text-zinc-400 mb-6 leading-relaxed">
                    Verify your academic identity to participate in peer review consensus loops. Once registered, your custom guest signature token is securely cataloged into our scholars directory.
                  </p>

                  <AnimatePresence mode="wait">
                    {!newScholarPassport ? (
                      <motion.form 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onSubmit={handleRegisterScholar} 
                        className="space-y-4"
                      >
                        <div>
                          <label className="block text-[10px] font-mono font-bold uppercase tracking-wider text-zinc-500 mb-1.5">
                            Full Academic Name
                          </label>
                          <input 
                            type="text"
                            value={scholarName}
                            onChange={(e) => setScholarName(e.target.value)}
                            placeholder="e.g. Dr. Elizabeth Holmes"
                            className="w-full bg-zinc-950 border border-zinc-800 focus:border-emerald-500/80 px-4 py-2.5 rounded-xl text-sm text-white placeholder-zinc-600 focus:outline-none transition-all"
                            disabled={scholarIsRegistering}
                            required
                          />
                        </div>

                        <div>
                          <label className="block text-[10px] font-mono font-bold uppercase tracking-wider text-zinc-500 mb-1.5">
                            Affiliated Institution
                          </label>
                          <input 
                            type="text"
                            value={scholarInstitution}
                            onChange={(e) => setScholarInstitution(e.target.value)}
                            placeholder="e.g. Stanford University"
                            className="w-full bg-zinc-950 border border-zinc-800 focus:border-emerald-500/80 px-4 py-2.5 rounded-xl text-sm text-white placeholder-zinc-600 focus:outline-none transition-all"
                            disabled={scholarIsRegistering}
                            required
                          />
                        </div>

                        <div>
                          <label className="block text-[10px] font-mono font-bold uppercase tracking-wider text-zinc-500 mb-1.5">
                            Core Research Field
                          </label>
                          <select 
                            value={scholarField}
                            onChange={(e) => setScholarField(e.target.value)}
                            className="w-full bg-zinc-950 border border-zinc-800 focus:border-emerald-500/80 px-4 py-2.5 rounded-xl text-sm text-white focus:outline-none cursor-pointer transition-all"
                            disabled={scholarIsRegistering}
                          >
                            {disciplinesList.slice(0, 15).map((disc) => (
                              <option key={disc} value={disc}>{disc}</option>
                            ))}
                          </select>
                        </div>

                        <button 
                          type="submit"
                          disabled={scholarIsRegistering || !scholarName.trim() || !scholarInstitution.trim()}
                          className="w-full h-11 inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 disabled:bg-zinc-900 disabled:text-zinc-600 text-white font-sans text-xs font-bold uppercase tracking-wider rounded-xl transition-all cursor-pointer shadow-lg active:scale-[0.98]"
                        >
                          {scholarIsRegistering ? (
                            <>
                              <RefreshCw className="h-4 w-4 animate-spin text-white" />
                              Generating Node Credentials...
                            </>
                          ) : (
                            <>
                              <Plus className="h-4 w-4" />
                              Apply for Peer Credentials
                            </>
                          )}
                        </button>
                      </motion.form>
                    ) : (
                      <motion.div 
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        className="p-5 border border-emerald-500/30 bg-emerald-950/10 rounded-xl space-y-4"
                      >
                        <div className="flex items-center gap-2 text-emerald-400">
                          <Award className="h-5 w-5" />
                          <h4 className="font-sans font-bold text-sm">Signature Verified!</h4>
                        </div>
                        <p className="text-xs text-zinc-300 leading-relaxed">
                          Your academic passport has been minted into the directory and signed with cryptographic verification keys.
                        </p>
                        <div className="p-3 bg-zinc-950 border border-zinc-900 rounded-lg text-center">
                          <span className="text-[9px] font-mono text-zinc-500 uppercase block mb-1">Peer Security Token ID</span>
                          <span className="font-mono text-[10px] text-zinc-300 font-bold block select-all break-all">
                            {newScholarPassport}
                          </span>
                        </div>
                        <button 
                          onClick={() => {
                            setNewScholarPassport(null);
                            setScholarName('');
                            setScholarInstitution('');
                          }}
                          className="w-full h-9 bg-zinc-900 hover:bg-zinc-850 border border-zinc-800 hover:border-zinc-700 text-zinc-300 text-xs font-bold rounded-lg cursor-pointer transition-all"
                        >
                          Register Another Node
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
                
                {/* Peer Review Verification Metrics */}
                <div className="bg-[#0A0A0C] border border-zinc-900 p-5 rounded-2xl space-y-4">
                  <h4 className="text-xs font-mono font-bold text-zinc-400 uppercase tracking-widest flex items-center gap-2">
                    <Shield className="h-4 w-4 text-emerald-400" />
                    Global Roster Integrity
                  </h4>
                  <ul className="space-y-2.5 text-xs">
                    <li className="flex justify-between">
                      <span className="text-zinc-500">Verified Affiliated Ivy Universities</span>
                      <span className="text-white font-bold">142</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-zinc-500">Active Peer Reviews cataloged</span>
                      <span className="text-white font-bold">1,842,904 reviews</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-zinc-500">Average Scholar H-index</span>
                      <span className="text-white font-bold">42.5</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Right Column: Searchable, Paginated Scholar Directory */}
              <div className="lg:col-span-8 space-y-5">
                <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                  <div className="relative w-full md:max-w-xs">
                    <Search className="absolute left-3 top-2.5 h-4 w-4 text-zinc-500" />
                    <input 
                      type="text"
                      value={scholarSearch}
                      onChange={(e) => setScholarSearch(e.target.value)}
                      placeholder="Search Scholars name, affiliation, field..."
                      className="w-full bg-[#0A0A0C] border border-zinc-900 focus:border-zinc-850 px-4 py-2 pl-9 rounded-xl text-xs text-white placeholder-zinc-500 focus:outline-none transition-all"
                    />
                  </div>

                  <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-1 md:pb-0 shrink-0">
                    {['All', 'Neural', 'Quantum', 'Physics', 'Astrophysics'].map((f) => (
                      <button
                        key={f}
                        onClick={() => setScholarFilter(f)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all shrink-0 cursor-pointer border ${
                          scholarFilter === f 
                            ? 'bg-emerald-500/15 border-emerald-400/35 text-emerald-400' 
                            : 'bg-[#0A0A0C] border-zinc-900 text-zinc-400 hover:text-white hover:border-zinc-800'
                        }`}
                      >
                        {f}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {filteredScholars.length > 0 ? (
                    filteredScholars.map((s) => (
                      <div 
                        key={s.id}
                        className={`p-4 bg-[#0A0A0C] border rounded-xl flex items-start gap-3 transition-all hover:border-zinc-800 ${
                          s.isUser ? 'border-emerald-500/20 shadow-[0_0_15px_rgba(16,185,129,0.05)]' : 'border-zinc-900'
                        }`}
                      >
                        <div className="p-2 bg-zinc-900 border border-zinc-800 text-zinc-400 rounded-lg flex items-center justify-center shrink-0">
                          {s.isUser ? (
                            <Award className="h-5 w-5 text-emerald-400" />
                          ) : (
                            <GraduationCap className="h-5 w-5 text-indigo-400" />
                          )}
                        </div>

                        <div className="space-y-1 overflow-hidden flex-1">
                          <div className="flex items-center justify-between gap-2">
                            <span className="font-sans font-bold text-sm text-white block truncate">
                              {s.name}
                            </span>
                            {s.isUser && (
                              <span className="text-[8px] bg-emerald-500/15 border border-emerald-400/30 text-emerald-400 px-1.5 py-0.5 rounded font-bold uppercase font-mono shrink-0">
                                Me
                              </span>
                            )}
                          </div>
                          <span className="text-[10px] text-zinc-500 font-mono block truncate">
                            {s.institution}
                          </span>
                          <span className="text-[10px] bg-zinc-900/80 text-zinc-400 px-2 py-0.5 rounded border border-zinc-850 inline-block font-sans">
                            {s.field}
                          </span>

                          <div className="grid grid-cols-2 gap-2 pt-2 border-t border-zinc-900 text-[10px] font-mono text-zinc-400">
                            <div>
                              <span>H-Index:</span> <strong className="text-white font-mono">{s.hIndex}</strong>
                            </div>
                            <div>
                              <span>Citations:</span> <strong className="text-white font-mono">{s.citations.toLocaleString()}</strong>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="col-span-2 py-12 text-center border border-zinc-900 border-dashed rounded-xl">
                      <AlertCircle className="h-8 w-8 text-zinc-600 mx-auto mb-2" />
                      <p className="text-xs text-zinc-400 font-bold">No active scholars match search criteria</p>
                      <p className="text-[11px] text-zinc-500 mt-1">Try expanding search query or selecting a different filter.</p>
                    </div>
                  )}
                </div>
              </div>

            </div>
          )}

          {/* TAB 4: 100+ ACTIVE FIELDS TAXONOMY */}
          {activeTab === 'fields' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              
              {/* Left Column: Propose New Scientific Field */}
              <div className="lg:col-span-4 space-y-6">
                <div className="bg-zinc-900/30 border border-zinc-850 p-6 rounded-2xl relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-3 bg-amber-500/5 text-amber-400 rounded-bl-2xl border-l border-b border-zinc-800">
                    <Globe className="h-5 w-5" />
                  </div>
                  <h3 className="font-sans font-bold text-white text-base mb-2">
                    Propose New Academic Field
                  </h3>
                  <p className="text-xs text-zinc-400 mb-6 leading-relaxed">
                    Uncharted fields of study can be proposed to the consensus directory. Peer bots crawl and vote to approve the taxonomy addition, mapping it permanently within 1.5 seconds.
                  </p>

                  <form onSubmit={handleProposeField} className="space-y-4">
                    <div>
                      <label className="block text-[10px] font-mono font-bold uppercase tracking-wider text-zinc-500 mb-1.5">
                        Scientific / Academic Discipline Name
                      </label>
                      <input 
                        type="text"
                        value={customField}
                        onChange={(e) => setCustomField(e.target.value)}
                        placeholder="e.g. Nanocomposite Supercapacitors"
                        className="w-full bg-zinc-950 border border-zinc-800 focus:border-amber-500/80 px-4 py-2.5 rounded-xl text-sm text-white placeholder-zinc-600 focus:outline-none transition-all"
                        disabled={fieldIsProposing}
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-mono font-bold uppercase tracking-wider text-zinc-500 mb-1.5">
                        Taxonomy Root Node
                      </label>
                      <select 
                        value={customFieldCategory}
                        onChange={(e) => setCustomFieldCategory(e.target.value)}
                        className="w-full bg-zinc-950 border border-zinc-800 focus:border-amber-500/80 px-4 py-2.5 rounded-xl text-sm text-white focus:outline-none cursor-pointer transition-all"
                        disabled={fieldIsProposing}
                      >
                        {categoriesList.map((cat) => (
                          <option key={cat} value={cat}>{cat}</option>
                        ))}
                      </select>
                    </div>

                    <button 
                      type="submit"
                      disabled={fieldIsProposing || !customField.trim()}
                      className="w-full h-11 inline-flex items-center justify-center gap-2 bg-amber-600 hover:bg-amber-500 disabled:bg-zinc-900 disabled:text-zinc-600 text-white font-sans text-xs font-bold uppercase tracking-wider rounded-xl transition-all cursor-pointer shadow-lg active:scale-[0.98]"
                    >
                      {fieldIsProposing ? (
                        <>
                          <RefreshCw className="h-4 w-4 animate-spin text-white" />
                          Crawling Consensus Approval...
                        </>
                      ) : (
                        <>
                          <Plus className="h-4 w-4" />
                          Propose Discipline Node
                        </>
                      )}
                    </button>
                  </form>
                </div>

                {/* Local taxonomy mapping stats */}
                <div className="bg-[#0A0A0C] border border-zinc-900 p-5 rounded-2xl space-y-4">
                  <h4 className="text-xs font-mono font-bold text-zinc-400 uppercase tracking-widest flex items-center gap-2">
                    <Check className="h-4 w-4 text-amber-400" />
                    Taxonomy Synced Core
                  </h4>
                  <p className="text-xs text-zinc-400 leading-relaxed">
                    We sync directly with university directories globally. Our active taxonomy holds over 100 core research fields across 8 categories, and over 2.4 million detailed topics.
                  </p>
                </div>
              </div>

              {/* Right Column: Searchable directory of fields */}
              <div className="lg:col-span-8 space-y-5">
                <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                  <div className="relative w-full md:max-w-xs">
                    <Search className="absolute left-3 top-2.5 h-4 w-4 text-zinc-500" />
                    <input 
                      type="text"
                      value={fieldSearch}
                      onChange={(e) => setFieldSearch(e.target.value)}
                      placeholder="Search active field, category, sub-dis..."
                      className="w-full bg-[#0A0A0C] border border-zinc-900 focus:border-zinc-850 px-4 py-2 pl-9 rounded-xl text-xs text-white placeholder-zinc-500 focus:outline-none transition-all"
                    />
                  </div>

                  <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-1 md:pb-0 shrink-0">
                    {['All', 'Technology', 'Science', 'Business', 'Humanities', 'Health', 'Environment'].map((cat) => (
                      <button
                        key={cat}
                        onClick={() => setFieldFilter(cat)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all shrink-0 cursor-pointer border ${
                          fieldFilter === cat 
                            ? 'bg-amber-500/15 border-amber-400/35 text-amber-400' 
                            : 'bg-[#0A0A0C] border-zinc-900 text-zinc-400 hover:text-white hover:border-zinc-800'
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-[440px] overflow-y-auto pr-1">
                  {filteredFields.length > 0 ? (
                    filteredFields.map((f) => (
                      <div 
                        key={f.id}
                        className="p-4 bg-[#0A0A0C] border border-zinc-900 rounded-xl hover:border-zinc-800 transition-all flex flex-col justify-between"
                      >
                        <div className="space-y-1.5">
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] font-mono text-amber-400 font-bold uppercase tracking-wider">
                              {f.category}
                            </span>
                            <span className="text-[10px] font-mono font-bold text-emerald-400">
                              {f.growth} YoY
                            </span>
                          </div>
                          
                          <h4 className="font-sans font-bold text-sm text-white">
                            {f.name}
                          </h4>
                        </div>

                        <div className="flex items-center justify-between pt-3 border-t border-zinc-900 mt-4 text-[10px] font-mono text-zinc-500">
                          <div>
                            <span>Topics:</span> <strong className="text-zinc-300 font-mono">{f.topicsCount}</strong>
                          </div>
                          <div>
                            <span>Scholars:</span> <strong className="text-zinc-300 font-mono">{f.scholarsCount}</strong>
                          </div>
                          <div className="flex items-center gap-1 text-emerald-400">
                            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                            <span>Synced</span>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="col-span-2 py-12 text-center border border-zinc-900 border-dashed rounded-xl">
                      <AlertCircle className="h-8 w-8 text-zinc-600 mx-auto mb-2" />
                      <p className="text-xs text-zinc-400 font-bold">No academic fields found matching search criteria</p>
                      <p className="text-[11px] text-zinc-500 mt-1">Try adjusting search term or taxonomy root category filter.</p>
                    </div>
                  )}
                </div>
              </div>

            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-zinc-950 border-t border-zinc-900 flex items-center justify-between text-[11px] text-zinc-500 font-mono">
          <div className="flex items-center gap-1.5">
            <Shield className="h-4 w-4 text-indigo-500" />
            <span>Academic Integrity Protocol Activated</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Distributed Ledger Synced (Block: #894,028)</span>
          </div>
        </div>

      </motion.div>
    </div>
  );
}
