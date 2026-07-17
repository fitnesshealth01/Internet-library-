import React, { useState } from 'react';
import { Compass, Sparkles, Check, Play, Lock, Award, BookOpen, Clock, Layers } from 'lucide-react';

interface PlanetStage {
  id: string;
  name: string;
  badge: string;
  difficulty: string;
  duration: string;
  description: string;
  skillsGained: string[];
  recommendedModules: Array<{ title: string; type: string }>;
  unlocked: boolean;
  color: string;
  coordinates: { x: number; y: number };
}

export default function LearningPaths() {
  const [selectedPlanetId, setSelectedPlanetId] = useState<string>('foundation');
  const [completedStages, setCompletedStages] = useState<string[]>(['foundation']);

  const planets: PlanetStage[] = [
    {
      id: 'foundation',
      name: 'Foundation Planet',
      badge: 'Level 1',
      difficulty: 'Beginner friendly',
      duration: '4-6 weeks',
      description: 'Acquire structural mathematical rockbeds. Study high-dimensional matrix algebra, probability, vector spaces, calculus gradients, and basic discrete systems.',
      skillsGained: ['Linear Algebra', 'Multivariate Calculus', 'Probability Distributions', 'Matrix Inverses'],
      recommendedModules: [
        { title: 'Mathematics for Machine Learning - MIT Course', type: 'Course' },
        { title: 'Calculus Gradients & Backpropagation Proofs', type: 'Technical Note' }
      ],
      unlocked: true,
      color: 'from-indigo-500 to-cyan-400',
      coordinates: { x: 10, y: 30 }
    },
    {
      id: 'programming',
      name: 'Programming Planet',
      badge: 'Level 2',
      difficulty: 'Intermediate core',
      duration: '5-8 weeks',
      description: 'Master systems programming, CPU architecture memory bounds, V8 compiling, high-performance data structures, dynamic pointers, and asynchronous multi-threading.',
      skillsGained: ['Advanced Python', 'C++ System Compilation', 'Asynchronous Coroutines', 'V8 Pipelines'],
      recommendedModules: [
        { title: 'How JavaScript Works: Under the Hood of V8', type: 'Article' },
        { title: 'Designing High-Throughput Memory Allocators', type: 'Research' }
      ],
      unlocked: true,
      color: 'from-blue-500 to-indigo-600',
      coordinates: { x: 30, y: 70 }
    },
    {
      id: 'ml_core',
      name: 'Machine Learning Planet',
      badge: 'Level 3',
      difficulty: 'Core rigor',
      duration: '8-12 weeks',
      description: 'Venture into standard predictive modeling. Formulate regression bounds, decision tree forests, SVM kernels, clustering nodes, and loss optimization models.',
      skillsGained: ['Gradient Descent Optimizer', 'Feature Normalization', 'Dimensionality SVD', 'K-Means Core'],
      recommendedModules: [
        { title: 'Linear Regression & Cost Formulations', type: 'Lecture' },
        { title: 'Random Forests vs Decision Trees In-Depth', type: 'Video' }
      ],
      unlocked: true,
      color: 'from-purple-600 to-indigo-500',
      coordinates: { x: 55, y: 40 }
    },
    {
      id: 'deep_learning',
      name: 'Deep Learning Planet',
      badge: 'Level 4',
      difficulty: 'Advanced mastery',
      duration: '10-15 weeks',
      description: 'Harness multi-layered representations. Deep dive into convolutional lattices, attention weights, spatial transformers, autoregressive encoders, and diffusion noise matrices.',
      skillsGained: ['Transformers Attention Mechanics', 'Diffusion Generative Models', 'PyTorch Tensors', 'CNN Convolution Grid'],
      recommendedModules: [
        { title: 'React Server Components & Deep Attention models', type: 'Article' },
        { title: 'Self-Supervised Contrastive Learning Architectures', type: 'Paper' }
      ],
      unlocked: true,
      color: 'from-pink-500 to-purple-600',
      coordinates: { x: 75, y: 80 }
    },
    {
      id: 'research',
      name: 'Research Planet',
      badge: 'Level 5',
      difficulty: 'Elite technical',
      duration: 'Ongoing',
      description: 'Conduct peer review integrations. Author new structural topologies, explore sub-quadratic linear attention, compress models with quantization, and craft auto-agents.',
      skillsGained: ['Sparse Attention Matrices', '8-bit Quantization Slices', 'Multi-Agent Consensus', 'RLHF Alignment'],
      recommendedModules: [
        { title: 'Direct Preference Optimization: The Mathematical Derivation', type: 'Paper' },
        { title: 'Sparse Mixture of Experts: Production Scale Optimization', type: 'Case Study' }
      ],
      unlocked: true,
      color: 'from-amber-400 to-pink-500',
      coordinates: { x: 92, y: 45 }
    }
  ];

  const activePlanet = planets.find(p => p.id === selectedPlanetId) || planets[0];

  const handleToggleComplete = (id: string) => {
    setCompletedStages(prev => {
      if (prev.includes(id)) {
        return prev.filter(x => x !== id);
      } else {
        return [...prev, id];
      }
    });
  };

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="max-w-3xl">
        <span className="text-[10px] font-mono font-bold tracking-widest text-indigo-400 uppercase flex items-center gap-1">
          <Compass className="h-3.5 w-3.5 animate-spin" style={{ animationDuration: '6s' }} /> GAMIFIED EDUCATION SPHERE
        </span>
        <h2 className="text-3xl font-black text-white tracking-tight mt-1">
          Interactive Learning Journeys
        </h2>
        <p className="text-zinc-400 text-sm mt-2 leading-relaxed font-sans">
          Forget dry lists. Travel through knowledge planets to unlock technical competencies. Track your progression and master advanced software architectures visually.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* LEFT COLUMN: INTERACTIVE MAP SPACE (Col span 7) */}
        <div className="lg:col-span-7 h-[380px] bg-[#0c0c0e]/80 border border-zinc-900 rounded-2xl relative overflow-hidden flex flex-col justify-between p-4">
          
          {/* Deep Space Atmosphere */}
          <div className="absolute inset-0 bg-radial-gradient from-indigo-500/5 to-transparent pointer-events-none" />
          <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none" />

          <div className="text-[9px] font-mono font-bold uppercase tracking-wider text-zinc-600">
            Sector: Core AI Engineering Curriculum
          </div>

          {/* SVG Connector Lines */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
            <line x1="10%" y1="30%" x2="30%" y2="70%" stroke="rgba(99, 102, 241, 0.15)" strokeWidth="2" strokeDasharray="5 5" />
            <line x1="30%" y1="70%" x2="55%" y2="40%" stroke="rgba(99, 102, 241, 0.15)" strokeWidth="2" strokeDasharray="5 5" />
            <line x1="55%" y1="40%" x2="75%" y2="80%" stroke="rgba(99, 102, 241, 0.15)" strokeWidth="2" strokeDasharray="5 5" />
            <line x1="75%" y1="80%" x2="92%" y2="45%" stroke="rgba(99, 102, 241, 0.15)" strokeWidth="2" strokeDasharray="5 5" />
          </svg>

          {/* Planets Rendering */}
          <div className="absolute inset-0 z-10">
            {planets.map((planet) => {
              const isSelected = selectedPlanetId === planet.id;
              const isCompleted = completedStages.includes(planet.id);
              return (
                <button
                  key={planet.id}
                  onClick={() => setSelectedPlanetId(planet.id)}
                  style={{
                    left: `${planet.coordinates.x}%`,
                    top: `${planet.coordinates.y}%`,
                    transform: 'translate(-50%, -50%)'
                  }}
                  className="absolute group flex flex-col items-center cursor-pointer"
                >
                  {/* Planet Sphere Sphere Visual */}
                  <div className={`h-11 w-11 rounded-full bg-gradient-to-br ${planet.color} p-0.5 shadow-2xl relative transition-all duration-300 group-hover:scale-110 active:scale-95 ${
                    isSelected ? 'ring-2 ring-white ring-offset-4 ring-offset-black scale-110' : ''
                  }`}>
                    {/* Pulsing Atmosphere aura */}
                    <span className="absolute inset-0 rounded-full bg-inherit opacity-45 blur-xs group-hover:blur-md" />
                    
                    <div className="h-full w-full rounded-full bg-zinc-950 flex items-center justify-center relative z-10">
                      {isCompleted ? (
                        <Check className="h-4 w-4 text-emerald-400" />
                      ) : (
                        <span className="text-[10px] font-mono font-bold text-zinc-400">{planet.badge.replace('Level ', 'L')}</span>
                      )}
                    </div>
                  </div>

                  {/* Name label */}
                  <span className={`text-[9px] font-sans font-bold uppercase tracking-widest mt-2 px-1.5 py-0.5 rounded ${
                    isSelected ? 'bg-indigo-600 text-white font-black' : 'bg-zinc-950/80 text-zinc-400 group-hover:text-zinc-200'
                  }`}>
                    {planet.name.split(' ')[0]}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="flex justify-between items-center text-[10px] font-mono text-zinc-500">
            <span>UNIVERSE ENGINE v3.5</span>
            <div className="flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>GPS ONLINE</span>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: ACTIVE PLANET DETAILED SCHEMATIC (Col span 5) */}
        <div className="lg:col-span-5 bg-zinc-950/40 border border-zinc-900 rounded-2xl p-6 space-y-6">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 uppercase">
                Active Destination: {activePlanet.badge}
              </span>
              <span className="text-xs text-zinc-500">{activePlanet.duration}</span>
            </div>
            
            <h3 className="text-2xl font-black text-white tracking-tight">
              {activePlanet.name}
            </h3>
            
            <p className="text-xs text-zinc-400 leading-relaxed font-sans">
              {activePlanet.description}
            </p>
          </div>

          {/* Competency Skills list */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-300">Competencies Unlocked:</h4>
            <div className="grid grid-cols-2 gap-2">
              {activePlanet.skillsGained.map((skill) => (
                <div key={skill} className="flex items-center gap-1.5 p-2 rounded-lg bg-[#121214] border border-zinc-900 text-[10px] font-mono font-bold text-zinc-300">
                  <Award className="h-3.5 w-3.5 text-indigo-400 shrink-0" />
                  <span>{skill}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Recommended Modules */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-300">Target Learning Modules:</h4>
            <div className="space-y-2">
              {activePlanet.recommendedModules.map((mod) => (
                <div key={mod.title} className="flex items-center justify-between p-2.5 rounded-xl border border-zinc-800/80 bg-zinc-950/40 hover:border-indigo-500/30 transition">
                  <div className="flex items-center gap-2 max-w-[80%]">
                    <BookOpen className="h-3.5 w-3.5 text-zinc-500 shrink-0" />
                    <span className="text-xs text-zinc-300 truncate font-semibold">{mod.title}</span>
                  </div>
                  <span className="text-[8px] font-mono uppercase bg-zinc-900 border border-zinc-800 px-1.5 py-0.5 text-zinc-500 rounded">
                    {mod.type}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Mark Completed Button */}
          <button
            onClick={() => handleToggleComplete(activePlanet.id)}
            className={`w-full py-3 rounded-xl font-sans font-bold text-xs uppercase tracking-widest cursor-pointer transition flex items-center justify-center gap-2 ${
              completedStages.includes(activePlanet.id)
                ? 'bg-emerald-950/30 border border-emerald-500/20 text-emerald-400 hover:bg-emerald-900/10'
                : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow'
            }`}
          >
            {completedStages.includes(activePlanet.id) ? (
              <>
                <Check className="h-4 w-4" />
                <span>Competencies Secured</span>
              </>
            ) : (
              <>
                <Play className="h-4 w-4 fill-white text-indigo-600" />
                <span>Mark Stage Completed</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
