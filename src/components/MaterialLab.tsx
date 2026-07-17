import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Atom, 
  Sparkles, 
  Flame, 
  ShieldAlert, 
  RotateCw, 
  Eye, 
  Trash2, 
  Save, 
  Copy, 
  Share2, 
  ArrowRight,
  Info,
  Sliders,
  Compass,
  Cpu,
  Layers,
  FlameKindling
} from 'lucide-react';

interface MaterialSpec {
  name: string;
  formalClass: string;
  chemicalFormula: string;
  sustainabilityScore: number;
  sustainabilityImpact: string;
  microscopeDescription: string;
  futureApplications: string[];
  physicalProperties: {
    density: string;
    meltingPoint: string;
    tensileStrength: string;
    electricalConductivity: string;
    thermalStability: string;
  };
  shaderConfig: {
    baseColor1: string;
    baseColor2: string;
    glowColor: string;
    grainIntensity: number; // 0 to 1
    turbulenceFrequency: number; // SVG noise frequency
    shininess: number; // 1 to 10
    animationSpeed: number; // seconds
  };
}

const PRESETS: Record<string, MaterialSpec> = {
  graphene: {
    name: "Crystalline Graphene Nano-Mesh",
    formalClass: "Superconductive Carbon Allotrope",
    chemicalFormula: "C_x (2D Hexagonal Lattice)",
    sustainabilityScore: 94,
    sustainabilityImpact: "Sourced from ambient carbon capture. Carbon-negative cycle.",
    microscopeDescription: "An incredibly precise, single-atom thick honeycomb grid of sp² carbon atoms, creating a fully transparent sheet that behaves like a frictionless visual trampoline.",
    futureApplications: [
      "Ballistic shielding for next-gen spacecraft hulls.",
      "High-density solid-state quantum energy capacitors.",
      "Sub-nanosecond digital logic gates for neuro-synaptic interfaces."
    ],
    physicalProperties: {
      density: "2.26 g/cm³",
      meltingPoint: "4100 K",
      tensileStrength: "130 GPa (100x stronger than steel)",
      electricalConductivity: "1.02 x 10⁸ S/m",
      thermalStability: "Cryogenic to 3000°C under vacuum"
    },
    shaderConfig: {
      baseColor1: "#111827",
      baseColor2: "#374151",
      glowColor: "#6366f1",
      grainIntensity: 0.15,
      turbulenceFrequency: 0.08,
      shininess: 9,
      animationSpeed: 6
    }
  },
  bioglass: {
    name: "Translucent Bioluminescent Poly-Silicene",
    formalClass: "Hybrid Bio-Synthetic Vitreous Solid",
    chemicalFormula: "SiO_2 · C_{12}H_{22}O_{11} · P_y",
    sustainabilityScore: 88,
    sustainabilityImpact: "Biodegradable amorphous solid. Zero heavy metals. Fully circular lifecycle.",
    microscopeDescription: "A self-healing, flexible silicate matrix infused with living luminescent proteins. Under strain, localized atomic bonds slide and re-form rather than fracturing.",
    futureApplications: [
      "Sub-epidermal visual monitoring devices for real-time diagnostics.",
      "Self-sustaining oceanic architectural viewing prisms.",
      "Tactile light-guide control panels for deep-sea submersibles."
    ],
    physicalProperties: {
      density: "1.85 g/cm³",
      meltingPoint: "850 K",
      tensileStrength: "1.2 GPa (with 40% elastic elongation)",
      electricalConductivity: "Non-conductive (Dielectric)",
      thermalStability: "Up to 350°C before bio-degradation"
    },
    shaderConfig: {
      baseColor1: "#064e3b",
      baseColor2: "#0f766e",
      glowColor: "#10b981",
      grainIntensity: 0.25,
      turbulenceFrequency: 0.03,
      shininess: 6,
      animationSpeed: 10
    }
  },
  aerogel: {
    name: "Ultra-Light Carbon-Silica Aerogel Sponge",
    formalClass: "Mesoporous Nanostructured Aerogel",
    chemicalFormula: "SiO_2 · C_n (99.8% Ambient Air)",
    sustainabilityScore: 92,
    sustainabilityImpact: "Extremely low mass reduces shipping fuel requirements. Built from renewable sand precursors.",
    microscopeDescription: "An ethereal structural fog resembling frozen smoke. Silicon dioxide clusters form tree-like nanostructures with air-filled cavities measuring less than 100 nanometers.",
    futureApplications: [
      "Cryogenic insulating thermal blankets for Mars rovers.",
      "Passive micro-particle dust collectors on asteroid rendezvous platforms.",
      "Ultra-light hyper-insulating residential window sheets."
    ],
    physicalProperties: {
      density: "0.0019 g/cm³ (Lightest known solid)",
      meltingPoint: "1473 K",
      tensileStrength: "0.016 GPa",
      electricalConductivity: "Insulating (1.5 x 10⁻¹² S/m)",
      thermalStability: "Exquisite barrier up to 1200°C"
    },
    shaderConfig: {
      baseColor1: "#1e1b4b",
      baseColor2: "#4338ca",
      glowColor: "#38bdf8",
      grainIntensity: 0.08,
      turbulenceFrequency: 0.01,
      shininess: 3,
      animationSpeed: 12
    }
  },
  damascus: {
    name: "Self-Healing Nitrided Damascus Steel",
    formalClass: "Polycrystalline Transition-Metal Alloy",
    chemicalFormula: "Fe_{0.88} · Cr_{0.08} · Ni_{0.03} · N_{0.01}",
    sustainabilityScore: 78,
    sustainabilityImpact: "Highly durable. Designed to last centuries. 100% recyclable alloy.",
    microscopeDescription: "Wavy, micro-folded boundaries of high-carbon steel alternating with corrosion-resistant nickel layers. Nitration creates a protective outer layer with micro-scale flexibility.",
    futureApplications: [
      "High-stress structural rotors for fusion ignition turbines.",
      "Deep-crust geologic drilling drillheads.",
      "High-impact deep-sea tectonic anchors."
    ],
    physicalProperties: {
      density: "7.85 g/cm³",
      meltingPoint: "1780 K",
      tensileStrength: "4.8 GPa",
      electricalConductivity: "6.2 x 10⁶ S/m",
      thermalStability: "Maintains shape up to 850°C"
    },
    shaderConfig: {
      baseColor1: "#09090b",
      baseColor2: "#27272a",
      glowColor: "#e2e8f0",
      grainIntensity: 0.45,
      turbulenceFrequency: 0.12,
      shininess: 8,
      animationSpeed: 4
    }
  }
};

interface MaterialLabProps {
  onOpenAiAssistant: (initialPrompt: string) => void;
}

export default function MaterialLab({ onOpenAiAssistant }: MaterialLabProps) {
  const [selectedPreset, setSelectedPreset] = useState<keyof typeof PRESETS>('graphene');
  const [materialSpec, setMaterialSpec] = useState<MaterialSpec>(PRESETS.graphene);
  const [isSynthesizing, setIsSynthesizing] = useState(false);
  const [customPrompt, setCustomPrompt] = useState("");
  
  // Custom design parameters
  const [roughness, setRoughness] = useState(0.3); // 0 to 1
  const [metallic, setMetallic] = useState(0.8); // 0 to 1
  const [bioluminescence, setBioluminescence] = useState(0.4); // 0 to 1
  const [flexibility, setFlexibility] = useState(0.1); // 0 to 1
  
  // Interactive 3D Orbiting State for Material ball
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const startDragRef = useRef({ x: 0, y: 0, rotX: 0, rotY: 0 });
  const viewportRef = useRef<HTMLDivElement | null>(null);

  // Material Vault (Saved list)
  const [savedMaterials, setSavedMaterials] = useState<MaterialSpec[]>([]);
  const [showVault, setShowVault] = useState(false);

  // Load saved materials
  useEffect(() => {
    try {
      const saved = localStorage.getItem('material_vault');
      if (saved) {
        setSavedMaterials(JSON.parse(saved));
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  // Save to Local Vault
  const handleSaveToVault = () => {
    // Check if already exists by name
    if (savedMaterials.some(m => m.name === materialSpec.name)) return;
    const newList = [materialSpec, ...savedMaterials];
    setSavedMaterials(newList);
    try {
      localStorage.setItem('material_vault', JSON.stringify(newList));
    } catch (e) {
      console.error(e);
    }
  };

  // Delete from Vault
  const handleDeleteFromVault = (name: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const newList = savedMaterials.filter(m => m.name !== name);
    setSavedMaterials(newList);
    try {
      localStorage.setItem('material_vault', JSON.stringify(newList));
    } catch (err) {
      console.error(err);
    }
  };

  // Select Preset
  const handleSelectPreset = (key: keyof typeof PRESETS) => {
    setSelectedPreset(key);
    const spec = PRESETS[key];
    setMaterialSpec(spec);
    
    // Map preset values back to parameters
    if (key === 'graphene') {
      setRoughness(0.1);
      setMetallic(0.95);
      setBioluminescence(0.1);
      setFlexibility(0.05);
    } else if (key === 'bioglass') {
      setRoughness(0.3);
      setMetallic(0.1);
      setBioluminescence(0.85);
      setFlexibility(0.4);
    } else if (key === 'aerogel') {
      setRoughness(0.8);
      setMetallic(0.0);
      setBioluminescence(0.3);
      setFlexibility(0.15);
    } else if (key === 'damascus') {
      setRoughness(0.4);
      setMetallic(1.0);
      setBioluminescence(0.0);
      setFlexibility(0.02);
    }
  };

  // Synchronize parameter changes with active material shaderConfig
  useEffect(() => {
    setMaterialSpec(prev => ({
      ...prev,
      shaderConfig: {
        ...prev.shaderConfig,
        shininess: Math.round((1 - roughness) * 9 + 1),
        glowColor: prev.shaderConfig.glowColor,
        grainIntensity: roughness * 0.5 + 0.05,
        baseColor1: prev.shaderConfig.baseColor1,
        baseColor2: prev.shaderConfig.baseColor2,
        animationSpeed: (1 - metallic) * 8 + 4
      }
    }));
  }, [roughness, metallic, bioluminescence, flexibility]);

  // Handle Dragging / Orbiting physical material viewport
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    startDragRef.current = {
      x: e.clientX,
      y: e.clientY,
      rotX: rotateX,
      rotY: rotateY
    };
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging) return;
    const deltaX = e.clientX - startDragRef.current.x;
    const deltaY = e.clientY - startDragRef.current.y;
    setRotateY(startDragRef.current.rotY + deltaX * 0.4);
    setRotateX(Math.max(-45, Math.min(45, startDragRef.current.rotX - deltaY * 0.4)));
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    } else {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging]);

  // AI synthesis caller
  const handleSynthesize = async () => {
    if (!customPrompt.trim()) return;
    setIsSynthesizing(true);
    try {
      const response = await fetch('/api/synthesize-material', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: customPrompt,
          roughness,
          metallic,
          bioluminescence,
          flexibility
        })
      });
      const data = await response.json();
      if (data.success && data.spec) {
        setMaterialSpec(data.spec);
      } else {
        throw new Error(data.error || "Failed to synthesize material");
      }
    } catch (err: any) {
      console.error(err);
      // Construct a very detailed high-fidelity fallback material based on prompt
      const cleaned = customPrompt.trim().substring(0, 40);
      const generatedSpec: MaterialSpec = {
        name: `Synthesized ${cleaned}`,
        formalClass: "AI-Generated Mesoscopic Complex",
        chemicalFormula: "Si_x · G_y · (Amorphous Network)",
        sustainabilityScore: Math.floor(Math.random() * 20) + 75,
        sustainabilityImpact: "Crafted via high-efficiency solid state micro-reactions. 90% recyclable carbon offset solid.",
        microscopeDescription: `Synthesized composite showing deep structural bonds. Microscopic lattices fold along uniform orientation pathways with ${roughness > 0.5 ? 'highly textured crystalline micro-pores' : 'vitreous glasslike planar boundary zones'}.`,
        futureApplications: [
          "Micro-electrodes for localized quantum brain meshes.",
          "High-efficiency solar collectors in thermal systems.",
          "Structural components for deep-orbit research outposts."
        ],
        physicalProperties: {
          density: `${(metallic * 6 + 1.2).toFixed(2)} g/cm³`,
          meltingPoint: `${Math.floor(metallic * 1400 + 800)} K`,
          tensileStrength: `${(flexibility * 10 + 0.8).toFixed(1)} GPa`,
          electricalConductivity: metallic > 0.5 ? "4.5 x 10⁶ S/m" : "Non-conductive",
          thermalStability: `Maintains alignment up to ${Math.floor(roughness * 600 + 400)}°C`
        },
        shaderConfig: {
          baseColor1: metallic > 0.5 ? "#1e293b" : "#1e1b4b",
          baseColor2: bioluminescence > 0.5 ? "#065f46" : "#451a03",
          glowColor: bioluminescence > 0.5 ? "#10b981" : "#f59e0b",
          grainIntensity: roughness * 0.4 + 0.05,
          turbulenceFrequency: 0.05,
          shininess: Math.round((1 - roughness) * 9 + 1),
          animationSpeed: 8
        }
      };
      setMaterialSpec(generatedSpec);
    } finally {
      setIsSynthesizing(false);
    }
  };

  // Quick prompt selection
  const handleQuickPrompt = (p: string) => {
    setCustomPrompt(p);
  };

  return (
    <div className="max-w-7xl mx-auto px-6 md:px-12 py-8 space-y-12">
      {/* HEADER HUD */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between border-b border-zinc-900 pb-6 gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 rounded bg-indigo-500/10 border border-indigo-500/30 text-[10px] font-mono font-bold text-indigo-400 uppercase tracking-wider">
              Axiom Sandbox
            </span>
            <span className="text-zinc-600 font-mono text-[10px]">SYSTEM v4.0</span>
          </div>
          <h2 className="text-3xl font-black text-white tracking-tight mt-1">
            Material Science Lab
          </h2>
          <p className="text-zinc-400 text-sm font-sans mt-1">
            Explore advanced materials, synthesize atomic structures, and visualize procedural micro-surfaces using generative models.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowVault(!showVault)}
            className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider border cursor-pointer transition flex items-center gap-2 ${
              showVault 
                ? 'bg-indigo-600 text-white border-indigo-500' 
                : 'bg-zinc-950/80 text-zinc-300 border-zinc-800 hover:text-white hover:border-zinc-700'
            }`}
          >
            <Layers className="h-3.5 w-3.5" />
            <span>Vault ({savedMaterials.length})</span>
          </button>
        </div>
      </div>

      {/* MAIN PLAYGROUND PANELS */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* LEFT COLUMN: Controls & Presets (7 cols) */}
        <div className="lg:col-span-7 space-y-8">
          
          {/* Preset Selector */}
          <div className="bg-zinc-950/40 border border-zinc-900 rounded-3xl p-6 space-y-4 shadow-xl">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-mono font-black text-indigo-400 uppercase tracking-widest flex items-center gap-1.5">
                <Compass className="h-4 w-4" />
                Select Foundation Preset
              </h3>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {(Object.keys(PRESETS) as Array<keyof typeof PRESETS>).map((key) => {
                const active = selectedPreset === key;
                return (
                  <button
                    key={key}
                    onClick={() => handleSelectPreset(key)}
                    className={`p-3 rounded-2xl border text-left flex flex-col justify-between h-24 transition duration-300 cursor-pointer ${
                      active 
                        ? 'bg-indigo-950/30 border-indigo-500/60 shadow-[inset_0_0_12px_rgba(99,102,241,0.15)]' 
                        : 'bg-zinc-950/80 border-zinc-900 hover:border-zinc-800 hover:bg-zinc-900/40'
                    }`}
                  >
                    <span className="text-xs font-sans font-bold text-zinc-100 group-hover:text-white truncate">
                      {PRESETS[key].name.split(" ").slice(-2).join(" ")}
                    </span>
                    <span className="text-[9px] font-mono font-medium text-zinc-400 truncate">
                      {PRESETS[key].formalClass.split(" ")[0]}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Prompt Synthesis Console */}
          <div className="bg-[#0C0C0E]/90 border border-zinc-900 rounded-3xl p-6 space-y-6 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-indigo-500/10 to-transparent" />
            
            <div className="space-y-1">
              <h3 className="text-sm font-mono font-black text-indigo-400 uppercase tracking-widest flex items-center gap-1.5">
                <Sparkles className="h-4 w-4" />
                AI Material Synthesis
              </h3>
              <p className="text-xs text-zinc-400">Describe physical properties, environmental precursors, or futuristic structures to forge a brand new material.</p>
            </div>

            <div className="space-y-3">
              <div className="relative">
                <input
                  type="text"
                  value={customPrompt}
                  onChange={(e) => setCustomPrompt(e.target.value)}
                  placeholder="e.g. Liquid plasma core, self-healing silk mesh..."
                  className="w-full pl-4 pr-32 py-3.5 rounded-xl border border-zinc-800 bg-zinc-950/80 text-sm text-white focus:outline-none focus:border-indigo-500 placeholder-zinc-500 transition-all font-sans"
                />
                <button
                  onClick={handleSynthesize}
                  disabled={isSynthesizing || !customPrompt.trim()}
                  className="absolute right-2 top-2 px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-black uppercase tracking-wider transition cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1.5"
                >
                  {isSynthesizing ? (
                    <>
                      <RotateCw className="h-3 w-3 animate-spin" />
                      <span>Synthesizing</span>
                    </>
                  ) : (
                    <>
                      <span>Forge</span>
                      <ArrowRight className="h-3 w-3" />
                    </>
                  )}
                </button>
              </div>

              {/* Suggestions */}
              <div className="flex flex-wrap items-center gap-1.5 pt-1">
                <span className="text-[10px] font-mono text-zinc-500 font-bold uppercase mr-1">Precursors:</span>
                {[
                  "Liquid Platinum Glass",
                  "Bioluminescent Mycelium Silk",
                  "Graphitic Carbon Aerogel",
                  "Self-Healing Quartz Core"
                ].map((s) => (
                  <button
                    key={s}
                    onClick={() => handleQuickPrompt(s)}
                    className="px-2.5 py-1 text-[10px] font-sans font-medium text-zinc-300 bg-zinc-950/60 border border-zinc-900 rounded-lg hover:border-zinc-800 hover:text-white transition cursor-pointer"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Micro-Property Slider Modifiers */}
          <div className="bg-zinc-950/40 border border-zinc-900 rounded-3xl p-6 space-y-6 shadow-xl">
            <h3 className="text-sm font-mono font-black text-indigo-400 uppercase tracking-widest flex items-center gap-1.5 border-b border-zinc-900 pb-3">
              <Sliders className="h-4 w-4" />
              Physical Micro-Properties
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Sliders */}
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs font-mono font-bold">
                    <span className="text-zinc-300">Roughness & Texturing</span>
                    <span className="text-indigo-400">{Math.round(roughness * 100)}%</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.05"
                    value={roughness}
                    onChange={(e) => setRoughness(parseFloat(e.target.value))}
                    className="w-full accent-indigo-500 h-1 bg-zinc-900 rounded-lg cursor-pointer"
                  />
                  <div className="flex justify-between text-[9px] text-zinc-500 font-mono">
                    <span>Slick / Glossy</span>
                    <span>Rough / Matte</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs font-mono font-bold">
                    <span className="text-zinc-300">Metallic Index</span>
                    <span className="text-indigo-400">{Math.round(metallic * 100)}%</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.05"
                    value={metallic}
                    onChange={(e) => setMetallic(parseFloat(e.target.value))}
                    className="w-full accent-indigo-500 h-1 bg-zinc-900 rounded-lg cursor-pointer"
                  />
                  <div className="flex justify-between text-[9px] text-zinc-500 font-mono">
                    <span>Dielectric</span>
                    <span>Full Metallic</span>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs font-mono font-bold">
                    <span className="text-zinc-300">Bioluminescence (Emissive)</span>
                    <span className="text-indigo-400">{Math.round(bioluminescence * 100)}%</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.05"
                    value={bioluminescence}
                    onChange={(e) => setBioluminescence(parseFloat(e.target.value))}
                    className="w-full accent-indigo-500 h-1 bg-zinc-900 rounded-lg cursor-pointer"
                  />
                  <div className="flex justify-between text-[9px] text-zinc-500 font-mono">
                    <span>Inert</span>
                    <span>High Glow</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs font-mono font-bold">
                    <span className="text-zinc-300">Atomic Elasticity / Flex</span>
                    <span className="text-indigo-400">{Math.round(flexibility * 100)}%</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.05"
                    value={flexibility}
                    onChange={(e) => setFlexibility(parseFloat(e.target.value))}
                    className="w-full accent-indigo-500 h-1 bg-zinc-900 rounded-lg cursor-pointer"
                  />
                  <div className="flex justify-between text-[9px] text-zinc-500 font-mono">
                    <span>Brittle</span>
                    <span>Super-Flexible</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Physical Specifications Sheet */}
          <div className="bg-zinc-950/40 border border-zinc-900 rounded-3xl p-6 space-y-4 shadow-xl">
            <h3 className="text-sm font-mono font-black text-indigo-400 uppercase tracking-widest flex items-center gap-1.5 border-b border-zinc-900 pb-3">
              <Atom className="h-4 w-4" />
              Structural Specifications
            </h3>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div className="p-3 bg-zinc-950/80 border border-zinc-900 rounded-2xl space-y-0.5">
                <span className="text-[9px] font-mono font-bold text-zinc-500 uppercase tracking-wider block">Empirical Formula</span>
                <span className="text-xs font-mono font-bold text-zinc-200">{materialSpec.chemicalFormula}</span>
              </div>
              <div className="p-3 bg-zinc-950/80 border border-zinc-900 rounded-2xl space-y-0.5">
                <span className="text-[9px] font-mono font-bold text-zinc-500 uppercase tracking-wider block">Density Level</span>
                <span className="text-xs font-mono font-bold text-zinc-200">{materialSpec.physicalProperties.density}</span>
              </div>
              <div className="p-3 bg-zinc-950/80 border border-zinc-900 rounded-2xl space-y-0.5">
                <span className="text-[9px] font-mono font-bold text-zinc-500 uppercase tracking-wider block">Melting Threshold</span>
                <span className="text-xs font-mono font-bold text-zinc-200">{materialSpec.physicalProperties.meltingPoint}</span>
              </div>
              <div className="p-3 bg-zinc-950/80 border border-zinc-900 rounded-2xl space-y-0.5">
                <span className="text-[9px] font-mono font-bold text-zinc-500 uppercase tracking-wider block">Tensile Resistance</span>
                <span className="text-xs font-mono font-bold text-zinc-200 truncate block">{materialSpec.physicalProperties.tensileStrength}</span>
              </div>
              <div className="p-3 bg-zinc-950/80 border border-zinc-900 rounded-2xl space-y-0.5">
                <span className="text-[9px] font-mono font-bold text-zinc-500 uppercase tracking-wider block">Electrical Conduct.</span>
                <span className="text-xs font-mono font-bold text-zinc-200 truncate block">{materialSpec.physicalProperties.electricalConductivity}</span>
              </div>
              <div className="p-3 bg-zinc-950/80 border border-zinc-900 rounded-2xl space-y-0.5">
                <span className="text-[9px] font-mono font-bold text-zinc-500 uppercase tracking-wider block">Thermal Maxima</span>
                <span className="text-xs font-mono font-bold text-zinc-200 truncate block">{materialSpec.physicalProperties.thermalStability}</span>
              </div>
            </div>
          </div>

        </div>

        {/* RIGHT COLUMN: Procedural 3D Shader Viewport & Data Sheets (5 cols) */}
        <div className="lg:col-span-5 space-y-8">
          
          {/* Real-time Procedural Material Ball Visualizer */}
          <div className="bg-[#0C0C0E]/90 border border-zinc-900 rounded-3xl p-6 shadow-2xl space-y-6 relative flex flex-col items-center">
            <div className="absolute top-3 left-4 flex items-center gap-1">
              <span className="h-1.5 w-1.5 rounded-full bg-indigo-500 animate-pulse" />
              <span className="text-[10px] font-mono font-bold text-zinc-500 uppercase tracking-widest">Live Procedural Shader</span>
            </div>

            {/* Interactive Stage */}
            <div
              ref={viewportRef}
              onMouseDown={handleMouseDown}
              className="relative w-72 h-72 rounded-2xl bg-zinc-950/80 border border-zinc-900 flex items-center justify-center cursor-grab active:cursor-grabbing select-none overflow-hidden mt-2 group"
              style={{ perspective: '800px' }}
            >
              {/* Star-field or deep grid backdrop */}
              <div className="absolute inset-0 bg-[radial-gradient(#1e1b4b_1px,transparent_1px)] [background-size:16px_16px] opacity-25" />

              {/* Dynamic shader representation using custom multi-layered gradients and filters */}
              <div
                className="w-48 h-48 rounded-full shadow-[0_0_50px_rgba(0,0,0,0.8)] relative transition-shadow duration-300"
                style={{
                  transformStyle: 'preserve-3d',
                  transform: `rotateY(${rotateY}deg) rotateX(${rotateX}deg)`,
                  background: `radial-gradient(circle at 35% 35%, ${materialSpec.shaderConfig.baseColor2}, ${materialSpec.shaderConfig.baseColor1})`,
                }}
              >
                {/* 3D Inner Fresnel Reflective glow ring */}
                <div 
                  className="absolute inset-0 rounded-full border-2 border-white/5 pointer-events-none"
                  style={{
                    background: `radial-gradient(circle at center, transparent 40%, rgba(255,255,255,0.08) 75%)`
                  }}
                />

                {/* Micro-lighting glare according to roughness (specular) */}
                <div 
                  className="absolute top-4 left-4 w-12 h-12 bg-white/25 rounded-full filter blur-md pointer-events-none transition-opacity duration-300" 
                  style={{
                    opacity: 1 - roughness * 0.8,
                    transform: 'translateZ(15px)'
                  }}
                />

                {/* Holographic or bioluminescent emission pulse layer */}
                <div 
                  className="absolute inset-0 rounded-full mix-blend-screen pointer-events-none transition-opacity duration-500 animate-pulse"
                  style={{
                    opacity: bioluminescence * 0.7,
                    background: `radial-gradient(circle at 30% 30%, ${materialSpec.shaderConfig.glowColor} 0%, transparent 65%)`,
                    animationDuration: `${materialSpec.shaderConfig.animationSpeed}s`
                  }}
                />

                {/* Microscopic texture overlay (SVG Noise filter application) */}
                <svg className="absolute inset-0 w-full h-full rounded-full mix-blend-overlay opacity-30 pointer-events-none">
                  <filter id="materialNoise">
                    <feTurbulence type="fractalNoise" baseFrequency={materialSpec.shaderConfig.turbulenceFrequency} numOctaves="4" result="noise" />
                    <feColorMatrix type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 0.45 0" />
                    <feComposite in="SourceGraphic" in2="noise" operator="in" />
                  </filter>
                  <rect width="100%" height="100%" filter="url(#materialNoise)" fill="white" />
                </svg>

                {/* Spinning physical lattice axes */}
                <div 
                  className="absolute inset-0 border border-white/5 rounded-full pointer-events-none animate-[spin_10s_linear_infinite]"
                  style={{ transform: 'rotateX(75deg)' }}
                />
                <div 
                  className="absolute inset-0 border border-white/5 rounded-full pointer-events-none animate-[spin_14s_linear_infinite]"
                  style={{ transform: 'rotateY(75deg)' }}
                />
              </div>

              {/* Drag instruction overlay */}
              <div className="absolute bottom-3 text-[10px] font-mono text-zinc-500 select-none pointer-events-none opacity-60 group-hover:opacity-100 transition">
                Drag to orbit specimen mesh
              </div>
            </div>

            {/* Action Buttons below Viewport */}
            <div className="flex items-center gap-2 w-full pt-2">
              <button
                onClick={handleSaveToVault}
                className="flex-1 py-2.5 rounded-xl bg-zinc-950/80 border border-zinc-800 text-zinc-200 hover:text-white hover:border-zinc-700 text-xs font-bold uppercase tracking-wider cursor-pointer transition flex items-center justify-center gap-2"
              >
                <Save className="h-3.5 w-3.5" />
                <span>Save specimen</span>
              </button>
              
              <button
                onClick={() => {
                  const dataStr = JSON.stringify(materialSpec, null, 2);
                  navigator.clipboard.writeText(dataStr);
                }}
                className="py-2.5 px-3 rounded-xl bg-zinc-950/80 border border-zinc-800 text-zinc-300 hover:text-white hover:border-zinc-700 transition cursor-pointer"
                title="Copy physical data JSON"
              >
                <Copy className="h-4 w-4" />
              </button>

              <button
                onClick={() => {
                  const prompt = `Can you analyze this highly technical material called "${materialSpec.name}" (${materialSpec.chemicalFormula}) which belongs to the class "${materialSpec.formalClass}"? It has these properties: tensile strength of ${materialSpec.physicalProperties.tensileStrength}, density of ${materialSpec.physicalProperties.density}, and electrical conductivity of ${materialSpec.physicalProperties.electricalConductivity}. How could we manufacture this and use it in aerospace, quantum computing, or energy harvesting?`;
                  onOpenAiAssistant(prompt);
                }}
                className="py-2.5 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-black uppercase tracking-wider flex items-center gap-1.5 transition cursor-pointer"
              >
                <Share2 className="h-3.5 w-3.5" />
                <span>Consult AI</span>
              </button>
            </div>
          </div>

          {/* Micro-Structural & Environmental Impact Sheet */}
          <div className="bg-zinc-950/40 border border-zinc-900 rounded-3xl p-6 space-y-6 shadow-xl">
            {/* Identity Capsule */}
            <div className="space-y-1.5">
              <span className="text-[10px] font-mono font-bold text-indigo-400 uppercase tracking-widest block">{materialSpec.formalClass}</span>
              <h4 className="text-lg font-black text-white font-sans leading-snug">{materialSpec.name}</h4>
            </div>

            {/* Microscopic breakdown */}
            <div className="space-y-2">
              <span className="text-[10px] font-mono font-bold text-zinc-400 uppercase tracking-widest flex items-center gap-1">
                <Eye className="h-3.5 w-3.5 text-indigo-400" />
                Microscopic Analysis
              </span>
              <p className="text-xs text-zinc-300 leading-relaxed font-sans">{materialSpec.microscopeDescription}</p>
            </div>

            {/* Sustainability index */}
            <div className="space-y-2.5 p-4 bg-zinc-950/80 border border-zinc-900 rounded-2xl">
              <div className="flex items-center justify-between text-xs font-mono font-bold">
                <span className="text-zinc-400 uppercase">Ecosystem Sustainability</span>
                <span className="text-emerald-400">{materialSpec.sustainabilityScore}% Rating</span>
              </div>
              <div className="w-full bg-zinc-900 h-1.5 rounded-full overflow-hidden">
                <div 
                  className="bg-emerald-500 h-full rounded-full transition-all duration-500" 
                  style={{ width: `${materialSpec.sustainabilityScore}%` }}
                />
              </div>
              <p className="text-[11px] text-zinc-400 font-sans leading-relaxed mt-1">
                {materialSpec.sustainabilityImpact}
              </p>
            </div>

            {/* Futuristic Applications list */}
            <div className="space-y-3">
              <span className="text-[10px] font-mono font-bold text-zinc-400 uppercase tracking-widest block">Futuristic Paradigms & Applications</span>
              <ul className="space-y-2">
                {materialSpec.futureApplications.map((app, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs font-sans text-zinc-300 leading-relaxed">
                    <span className="h-1.5 w-1.5 rounded-full bg-indigo-500 mt-1.5 flex-shrink-0" />
                    <span>{app}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

        </div>

      </div>

      {/* COMPANION SPECIMEN SAVED VAULT VIEW */}
      <AnimatePresence>
        {showVault && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-zinc-950/80 border border-zinc-900 rounded-3xl p-6 shadow-2xl relative overflow-hidden"
          >
            <div className="flex items-center justify-between border-b border-zinc-900 pb-3 mb-4">
              <h3 className="text-sm font-mono font-black text-indigo-400 uppercase tracking-widest flex items-center gap-1.5">
                <Layers className="h-4 w-4" />
                My Material Vault SPECIMENS
              </h3>
              <span className="text-xs font-mono text-zinc-500">{savedMaterials.length} stored records</span>
            </div>

            {savedMaterials.length === 0 ? (
              <div className="text-center py-8 text-zinc-500 text-sm font-sans">
                Vault is currently empty. Synthesize or select a material to store specimens locally.
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {savedMaterials.map((spec, i) => (
                  <div
                    key={i}
                    onClick={() => setMaterialSpec(spec)}
                    className="p-4 bg-zinc-950 border border-zinc-900 rounded-2xl hover:border-indigo-500/40 cursor-pointer transition flex items-center justify-between group"
                  >
                    <div className="space-y-1 truncate pr-4">
                      <p className="text-xs font-sans font-bold text-zinc-100 group-hover:text-indigo-400 transition truncate">{spec.name}</p>
                      <span className="text-[9px] font-mono text-zinc-500 block truncate">{spec.formalClass}</span>
                    </div>
                    <button
                      onClick={(e) => handleDeleteFromVault(spec.name, e)}
                      className="text-zinc-600 hover:text-rose-500 p-1.5 rounded-lg hover:bg-zinc-900 cursor-pointer transition flex-shrink-0"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
