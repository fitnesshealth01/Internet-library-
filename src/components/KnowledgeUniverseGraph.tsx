import React, { useState } from 'react';
import { Network, Sparkles, Brain, Cpu, Database, ChevronRight, Info, Award } from 'lucide-react';
import { LibraryItem } from '../types';

interface NodeItem {
  id: string;
  label: string;
  category: string;
  growth: string;
  connectionsCount: number;
  insight: string;
  discovery: {
    title: string;
    time: string;
  };
}

interface KnowledgeUniverseGraphProps {
  onOpenArticle: (id: string) => void;
}

export default function KnowledgeUniverseGraph({ onOpenArticle }: KnowledgeUniverseGraphProps) {
  const nodes: Record<string, NodeItem> = {
    'ai': {
      id: 'ai',
      label: 'Artificial Intelligence',
      category: 'Advanced Computing',
      growth: '+42% annually',
      connectionsCount: 1247,
      insight: 'Artificial Intelligence forms the gravitational center of modern computer science, branching into self-supervised transformers, reinforcement logic, and cognitive neural pathways.',
      discovery: {
        title: 'New AI Agent Architectures',
        time: '2 hours ago'
      }
    },
    'ml': {
      id: 'ml',
      label: 'Machine Learning',
      category: 'Statistics & Math',
      growth: '+38% annually',
      connectionsCount: 840,
      insight: 'Machine Learning focuses on optimization gradients, empirical risk minimizations, and feature dimension transformations to allow computational weights to approximate functions.',
      discovery: {
        title: 'Direct Preference Optimization V2',
        time: '1 day ago'
      }
    },
    'robotics': {
      id: 'robotics',
      label: 'Robotics Control',
      category: 'Cyber-Physical Systems',
      growth: '+29% annually',
      connectionsCount: 310,
      insight: 'Robotics integrates cybernetics, kinodynamic motion planning, tactile sensors, and real-time control loops with spatial transformers for humanoid physics operations.',
      discovery: {
        title: 'Tactile Finger Sensor Breakthrough',
        time: '3 days ago'
      }
    },
    'neural': {
      id: 'neural',
      label: 'Neural Networks',
      category: 'Biomimetic Systems',
      growth: '+46% annually',
      connectionsCount: 955,
      insight: 'Neural Networks mimic neurological synaptic weight updates. Modern stacks employ deep multi-headed attention blocks, sparse gate layers, and residual feedback rails.',
      discovery: {
        title: 'Sparse Mixture of Experts Benchmarks',
        time: '12 hours ago'
      }
    },
    'math': {
      id: 'math',
      label: 'Mathematics Foundations',
      category: 'Mathematical Sciences',
      growth: '+12% annually',
      connectionsCount: 1420,
      insight: 'Mathematics provides the fundamental bedrock of all computer intelligence, covering high-dimensional linear algebra, matrix calculus, probability distributions, and manifolds.',
      discovery: {
        title: 'New Matrix Multiplication Evacuations',
        time: '5 days ago'
      }
    },
    'datasci': {
      id: 'datasci',
      label: 'Data Science',
      category: 'Analytical Systems',
      growth: '+22% annually',
      connectionsCount: 650,
      insight: 'Data Science merges predictive analytics, statistical inferences, structural feature engineering, and massive database query engines to synthesize business discoveries.',
      discovery: {
        title: 'GPU-Accelerated Parquet Engine',
        time: '10 hours ago'
      }
    },
    'nlp': {
      id: 'nlp',
      label: 'Natural Language Processing',
      category: 'Linguistic Computing',
      growth: '+39% annually',
      connectionsCount: 480,
      insight: 'Natural Language Processing bridges machines and human tongues. It covers text tokenization, positional sin-cos embeddings, semantic parsing, and structural text summaries.',
      discovery: {
        title: 'Sub-quadratic Context Window Slices',
        time: '18 hours ago'
      }
    },
    'deep': {
      id: 'deep',
      label: 'Deep Learning',
      category: 'Hierarchical Networks',
      growth: '+48% annually',
      connectionsCount: 1110,
      insight: 'Deep Learning leverages layered abstract architectures (CNNs, RNNs, Transformers, Diffusion Models) to automatically extract complex features directly from raw high-dimensional source arrays.',
      discovery: {
        title: 'Diffusion-Guided Autonomous Driving',
        time: '4 hours ago'
      }
    }
  };

  const [activeNodeId, setActiveNodeId] = useState<string>('ai');
  const activeNode = nodes[activeNodeId] || nodes['ai'];

  // Static branch connections mapping from key to orbiting nodes with increased coordinates to match a larger container
  const satelliteNodes = [
    { id: 'ml', label: 'Machine Learning', x: -145, y: -85 },
    { id: 'neural', label: 'Neural Networks', x: 145, y: -85 },
    { id: 'robotics', label: 'Robotics Control', x: -165, y: 45 },
    { id: 'datasci', label: 'Data Science', x: 0, y: -145 },
    { id: 'math', label: 'Mathematics', x: -65, y: 150 },
    { id: 'nlp', label: 'NLP', x: 65, y: 150 },
    { id: 'deep', label: 'Deep Learning', x: 165, y: 45 },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch bg-zinc-950/20 border border-zinc-900 rounded-3xl p-6 md:p-8 overflow-hidden relative">
      {/* Background vector cosmos mesh */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(99,102,241,0.12),rgba(0,0,0,0))] pointer-events-none" />
      
      {/* Dynamic Animated Grid Overlay */}
      <div className="absolute inset-0 opacity-[0.02] bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

      {/* LEFT COLUMN: INTERACTIVE GALAXY GRAPH CANVAS (Col span 7) */}
      <div className="lg:col-span-7 h-[500px] bg-zinc-950/60 rounded-2xl border border-zinc-900 relative overflow-hidden">
        
        {/* Scaled graph wrapper to prevent truncation of nodes on mobile devices */}
        <div className="absolute inset-0 flex items-center justify-center scale-[0.55] min-[360px]:scale-[0.62] min-[400px]:scale-[0.72] sm:scale-[0.95] md:scale-[1.1] lg:scale-[1.15] xl:scale-[1.25] origin-center transition-transform duration-300">
          {/* Orbital concentric stellar trails */}
          <div className="absolute h-[150px] w-[150px] rounded-full border border-dashed border-indigo-500/10 animate-spin" style={{ animationDuration: '40s' }} />
          <div className="absolute h-[270px] w-[270px] rounded-full border border-zinc-800/20 animate-spin" style={{ animationDuration: '60s' }} />
          <div className="absolute h-[380px] w-[380px] rounded-full border border-dashed border-zinc-800/10 animate-spin" style={{ animationDuration: '90s' }} />

          {/* Outer glowing network connection lines (SVG lines for absolute visual accuracy) */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
            <defs>
              <linearGradient id="beamGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#818cf8" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.05" />
              </linearGradient>
            </defs>
            {satelliteNodes.map((sat) => {
              const isSatActive = activeNodeId === sat.id;
              return (
                <line
                  key={sat.id}
                  x1="50%"
                  y1="50%"
                  x2={`calc(50% + ${sat.x}px)`}
                  y2={`calc(50% + ${sat.y}px)`}
                  stroke={isSatActive ? '#818cf8' : 'rgba(63, 63, 70, 0.25)'}
                  strokeWidth={isSatActive ? 3.5 : 1.25}
                  strokeDasharray={isSatActive ? 'none' : '4 4'}
                  className="transition-all duration-300"
                />
              );
            })}
          </svg>

          {/* Center Prime Node (A.I.) */}
          <button
            onClick={() => setActiveNodeId('ai')}
            className={`absolute z-20 h-24 w-24 rounded-full border-2 flex flex-col items-center justify-center cursor-pointer transition-all duration-500 shadow-2xl ${
              activeNodeId === 'ai'
                ? 'bg-indigo-600/35 border-indigo-400 shadow-indigo-500/30 scale-110'
                : 'bg-zinc-950/90 border-zinc-800 hover:border-zinc-700'
            }`}
          >
            <Brain className={`h-7 w-7 text-indigo-400 ${activeNodeId === 'ai' ? 'animate-pulse text-white' : ''}`} />
            <span className="text-xs font-sans font-black uppercase tracking-wider text-zinc-100 mt-1">
              Prime AI
            </span>
            <span className="absolute -bottom-1.5 px-2 py-0.5 rounded bg-indigo-600 text-[9px] font-mono font-bold text-white tracking-widest uppercase">
              Center
            </span>
          </button>

          {/* Satellite Branch Nodes */}
          {satelliteNodes.map((sat) => {
            const isActive = activeNodeId === sat.id;
            return (
              <button
                key={sat.id}
                onClick={() => setActiveNodeId(sat.id)}
                style={{
                  transform: `translate(${sat.x}px, ${sat.y}px)`,
                }}
                className={`absolute z-10 px-4 py-3 rounded-xl border flex flex-col items-center text-center cursor-pointer shadow-xl transition-all duration-300 hover:scale-105 active:scale-95 ${
                  isActive
                    ? 'bg-zinc-950/95 border-indigo-400 text-white shadow-indigo-500/20'
                    : 'bg-zinc-950/85 border-zinc-900 text-zinc-300 hover:border-zinc-800 hover:text-white'
                }`}
              >
                <span className="text-sm font-sans font-black leading-none tracking-wide text-white group-hover:text-indigo-300 transition-colors whitespace-nowrap">
                  {sat.label}
                </span>
                <span className="text-[10px] font-mono font-bold text-zinc-400 mt-1.5 uppercase tracking-wider">
                  Explore
                </span>
              </button>
            );
          })}
        </div>

        {/* Tech Watermark Hud overlay */}
        <div className="absolute top-4 left-4 flex items-center gap-1.5 px-3 py-1 bg-zinc-950/60 border border-zinc-900/60 rounded-lg text-xs font-mono font-bold text-zinc-400">
          <Network className="h-3.5 w-3.5 text-indigo-500 animate-spin" style={{ animationDuration: '10s' }} />
          <span>Interactive Knowledge Graph</span>
        </div>

        <div className="absolute bottom-4 right-4 text-xs font-mono font-semibold text-zinc-400">
          Double-click node to lock focus
        </div>
      </div>

      {/* RIGHT COLUMN: INTELLIGENCE SIDE PANEL HUD (Col span 5) */}
      <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
        <div className="space-y-5">
          <div className="space-y-1.5">
            <span className="text-[9px] font-mono font-bold tracking-widest text-indigo-400 uppercase flex items-center gap-1">
              <Sparkles className="h-3.5 w-3.5" /> Discovery Node Analytics
            </span>
            <h3 className="text-xl font-black text-white tracking-tight leading-none">
              {activeNode.label}
            </h3>
            <div className="flex gap-2 text-[10px] font-mono font-bold uppercase text-zinc-500">
              <span className="text-indigo-400">{activeNode.category}</span>
              <span>•</span>
              <span className="text-emerald-400">{activeNode.growth}</span>
            </div>
          </div>

          {/* AI Insight Box */}
          <div className="p-4 bg-zinc-950/60 border border-zinc-900 rounded-2xl relative overflow-hidden space-y-2.5">
            <div className="flex items-center gap-1.5 text-[10px] font-sans font-bold text-zinc-400 uppercase tracking-wider">
              <Info className="h-3.5 w-3.5 text-indigo-400 shrink-0" />
              <span>Computational AI Insight</span>
            </div>
            <p className="text-xs text-zinc-400 leading-relaxed font-sans">
              {activeNode.insight}
            </p>
          </div>

          {/* Statistics Grid */}
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3.5 bg-[#0D0D0E]/60 border border-zinc-900/80 rounded-xl text-center">
              <p className="text-[10px] font-sans font-bold uppercase tracking-wider text-zinc-500">Knowledge Depth</p>
              <p className="text-lg font-black text-white font-display mt-0.5">8.9 / 10</p>
            </div>
            <div className="p-3.5 bg-[#0D0D0E]/60 border border-zinc-900/80 rounded-xl text-center">
              <p className="text-[10px] font-sans font-bold uppercase tracking-wider text-zinc-500">Connected Nodes</p>
              <p className="text-lg font-black text-indigo-400 font-display mt-0.5">{activeNode.connectionsCount}+</p>
            </div>
          </div>

          {/* Related Live News / Discovery */}
          <div className="p-4 bg-indigo-950/10 border border-indigo-500/10 rounded-2xl space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[9px] font-mono font-black text-indigo-400 uppercase tracking-widest flex items-center gap-1">
                <Award className="h-3 w-3" /> Related Discovery
              </span>
              <span className="text-[8px] font-mono text-zinc-500">{activeNode.discovery.time}</span>
            </div>
            <p className="text-xs font-bold text-zinc-200 group hover:text-indigo-400 transition cursor-pointer">
              {activeNode.discovery.title}
            </p>
          </div>
        </div>

        {/* Action Button */}
        <button
          onClick={() => {
            // Map node IDs to real curated library items that exist
            if (activeNodeId === 'ai') onOpenArticle('july-news-1');
            else if (activeNodeId === 'ml') onOpenArticle('july-art-10');
            else if (activeNodeId === 'neural') onOpenArticle('july-art-2');
            else if (activeNodeId === 'math') onOpenArticle('july-art-10');
            else if (activeNodeId === 'datasci') onOpenArticle('july-art-14');
            else if (activeNodeId === 'robotics') onOpenArticle('july-news-15');
            else if (activeNodeId === 'nlp') onOpenArticle('july-art-1');
            else if (activeNodeId === 'deep') onOpenArticle('july-art-10');
            else onOpenArticle('july-news-1'); // fallback
          }}
          className="w-full py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-sans font-bold text-xs uppercase tracking-widest cursor-pointer shadow-md hover:shadow-indigo-500/20 flex items-center justify-center gap-1 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
        >
          <span>Explore Connections In-Depth</span>
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
