import React, { useEffect, useRef, useState } from 'react';
import { Globe, Sparkles } from 'lucide-react';

interface HolographicGlobeProps {
  onSelectCategory: (category: string) => void;
}

export default function HolographicGlobe({ onSelectCategory }: HolographicGlobeProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [width, setWidth] = useState(typeof window !== 'undefined' ? Math.min(540, window.innerWidth - 32) : 540);
  const [activeHoverNode, setActiveHoverNode] = useState<string | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        if (entry.contentRect.width) {
          setWidth(entry.contentRect.width);
        }
      }
    });
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  // Orbiting Category Node Coordinates on screen relative to canvas center
  const categoryNodes = [
    { label: 'Technology', count: '948K topics', angle: 0, radius: 200, color: '#6366f1' },
    { label: 'Science', count: '812K topics', angle: 0.6, radius: 215, color: '#3b82f6' },
    { label: 'Business', count: '734K topics', angle: 1.3, radius: 190, color: '#f59e0b' },
    { label: 'Humanities', count: '645K topics', angle: 2.1, radius: 225, color: '#a855f7' },
    { label: 'Health', count: '421K topics', angle: 2.8, radius: 210, color: '#10b981' },
    { label: 'Environment', count: '298K topics', angle: 3.5, radius: 225, color: '#84cc16' },
    { label: 'History', count: '276K topics', angle: 4.2, radius: 200, color: '#eab308' },
    { label: 'Law & Politics', count: '312K topics', angle: 4.9, radius: 235, color: '#06b6d4' },
    { label: 'Life Sciences', count: '521K topics', angle: 5.6, radius: 215, color: '#14b8a6' },
    { label: 'Arts & Culture', count: '487K topics', angle: 6.1, radius: 200, color: '#ec4899' },
  ];

  const buttonsRef = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let sphereRotationAngle = 0;
    let orbitAngle = 0;
    const particles: Array<{ x: number; y: number; z: number; color: string; size: number }> = [];

    // Initialize sphere grid particles
    for (let i = 0; i < 180; i++) {
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);
      const r = 135; // Globe radius (scaled up from 95)

      particles.push({
        x: r * Math.sin(phi) * Math.cos(theta),
        y: r * Math.sin(phi) * Math.sin(theta),
        z: r * Math.cos(phi),
        color: i % 3 === 0 ? '#6366f1' : i % 3 === 1 ? '#06b6d4' : '#3b82f6',
        size: Math.random() * 1.8 + 0.6,
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const cx = canvas.width / 2;
      const cy = canvas.height / 2;

      // Rotate Category positions slowly in circular orbits without triggering React state updates
      orbitAngle = (orbitAngle + 0.001) % (Math.PI * 2);

      categoryNodes.forEach((node, idx) => {
        const btn = buttonsRef.current[idx];
        if (btn) {
          const currentAngle = (node.angle + orbitAngle) % (Math.PI * 2);
          const x = Math.cos(currentAngle) * node.radius;
          const y = Math.sin(currentAngle) * (node.radius * 0.76);
          btn.style.transform = `translate(${x}px, ${y}px)`;
        }
      });

      // 1. Draw outer holographic tech circles (scaled up to match new radii)
      ctx.strokeStyle = 'rgba(99, 102, 241, 0.08)';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.arc(cx, cy, 150, 0, Math.PI * 2);
      ctx.stroke();

      ctx.strokeStyle = 'rgba(6, 182, 212, 0.05)';
      ctx.setLineDash([5, 8]);
      ctx.beginPath();
      ctx.arc(cx, cy, 190, 0, Math.PI * 2);
      ctx.stroke();
      ctx.setLineDash([]);

      ctx.strokeStyle = 'rgba(168, 85, 247, 0.06)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(cx, cy, 230, 0, Math.PI * 2);
      ctx.stroke();

      // 2. Draw rotating wireframe globe particles with 3D projection
      sphereRotationAngle += 0.004;
      const cosRot = Math.cos(sphereRotationAngle);
      const sinRot = Math.sin(sphereRotationAngle);

      // Sort by depth (Z index) for realistic layering
      const projectedParticles = particles.map(p => {
        // Rotate around Y axis
        const xRot = p.x * cosRot - p.z * sinRot;
        const zRot = p.x * sinRot + p.z * cosRot;
        
        // Perspective factor
        const perspective = 350 / (350 + zRot);
        return {
          sx: cx + xRot * perspective,
          sy: cy + p.y * perspective,
          size: p.size * perspective * 1.25,
          alpha: (350 + zRot) / 450, // back particles fade
          color: p.color,
          zDepth: zRot,
        };
      });

      projectedParticles.sort((a, b) => b.zDepth - a.zDepth);

      projectedParticles.forEach(p => {
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha * 0.55;
        ctx.beginPath();
        ctx.arc(p.sx, p.sy, p.size, 0, Math.PI * 2);
        ctx.fill();
      });
      ctx.globalAlpha = 1.0;

      // 3. Draw grid line accents connecting the projected nodes
      ctx.strokeStyle = 'rgba(99, 102, 241, 0.04)';
      ctx.lineWidth = 0.5;
      ctx.beginPath();
      for (let i = 0; i < projectedParticles.length; i += 12) {
        const p1 = projectedParticles[i];
        const p2 = projectedParticles[(i + 24) % projectedParticles.length];
        ctx.moveTo(p1.sx, p1.sy);
        ctx.lineTo(p2.sx, p2.sy);
      }
      ctx.stroke();

      // 4. Draw central core glowing sphere
      const gradient = ctx.createRadialGradient(cx, cy, 5, cx, cy, 120);
      gradient.addColorStop(0, 'rgba(99, 102, 241, 0.15)');
      gradient.addColorStop(0.5, 'rgba(6, 182, 212, 0.03)');
      gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(cx, cy, 120, 0, Math.PI * 2);
      ctx.fill();

      animationId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, []);

  const scale = Math.min(1, width / 540);

  return (
    <div ref={containerRef} className="relative w-full aspect-square max-w-[540px] mx-auto flex items-center justify-center select-none overflow-hidden">
      <div 
        style={{ 
          transform: `scale(${scale})`,
          transformOrigin: 'center center',
          width: '540px',
          height: '540px'
        }}
        className="absolute flex items-center justify-center shrink-0"
      >
        {/* Background radial atmosphere glow */}
        <div className="absolute inset-0 bg-radial-gradient from-indigo-500/10 via-purple-500/5 to-transparent blur-3xl pointer-events-none" />

        {/* HTML5 Canvas base */}
        <canvas
          ref={canvasRef}
          width={540}
          height={540}
          className="absolute inset-0 w-full h-full pointer-events-none z-10"
        />

        {/* Futuristic Orbiting category badges */}
        {categoryNodes.map((node, idx) => {
          // Project initial position on ellipse for modern isometric feel
          const x = Math.cos(node.angle) * node.radius;
          const y = Math.sin(node.angle) * (node.radius * 0.76);
          const isHovered = activeHoverNode === node.label;

          return (
            <button
              key={node.label}
              ref={el => { buttonsRef.current[idx] = el; }}
              onMouseEnter={() => setActiveHoverNode(node.label)}
              onMouseLeave={() => setActiveHoverNode(null)}
              onClick={() => onSelectCategory(node.label)}
              style={{
                transform: `translate(${x}px, ${y}px)`,
                borderColor: isHovered ? node.color : 'rgba(38, 38, 41, 0.7)',
              }}
              className="absolute z-20 px-3.5 py-2 rounded-full border bg-zinc-950/80 backdrop-blur-md shadow-lg flex items-center gap-2 hover:shadow-indigo-500/10 cursor-pointer transition-all duration-300 text-left active:scale-95 group"
            >
              {/* Pulsing indicator core */}
              <span
                style={{ backgroundColor: node.color }}
                className={`h-2 w-2 rounded-full ${isHovered ? 'animate-ping' : ''}`}
              />
              <div>
                <p className="text-[11px] font-sans font-bold text-zinc-200 uppercase tracking-wider leading-none group-hover:text-white transition">
                  {node.label}
                </p>
                <p className="text-[9px] font-mono text-zinc-500 mt-0.5 leading-none">
                  {node.count}
                </p>
              </div>
            </button>
          );
        })}

        {/* Floating Center Tech HUD overlay */}
        <div className="absolute z-0 flex flex-col items-center justify-center text-center pointer-events-none p-4">
          <div className="rounded-full bg-indigo-550/5 border border-indigo-550/15 p-3 animate-pulse mb-2">
            <Globe className="h-6 w-6 text-indigo-400" />
          </div>
          <span className="text-[10px] font-mono text-indigo-500 font-bold uppercase tracking-widest leading-none">
            Sphere Online
          </span>
          <span className="text-[11px] font-sans font-semibold text-zinc-600 mt-1 uppercase tracking-wider">
            Node-Active
          </span>
        </div>
      </div>
    </div>
  );
}
