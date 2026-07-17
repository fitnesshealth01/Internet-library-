import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowUp, Sparkles } from 'lucide-react';

export default function ScrollToTopCompanion() {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isAscending, setIsAscending] = useState(false);
  const [blinkState, setBlinkState] = useState(false);
  const [lookDirection, setLookDirection] = useState<'center' | 'left' | 'right'>('center');
  const [companionQuote, setCompanionQuote] = useState('Deep insights await below!');
  
  // Track dragging state to separate dragging from clicking
  const isDraggingRef = useRef(false);
  const [dragConstraints, setDragConstraints] = useState({ left: -400, right: 20, top: -800, bottom: 20 });

  // Update drag constraints based on window dimensions so it works beautifully on mobile & desktop
  useEffect(() => {
    const updateConstraints = () => {
      setDragConstraints({
        left: -window.innerWidth + 80,
        right: 20,
        top: -window.innerHeight + 80,
        bottom: 20
      });
    };
    updateConstraints();
    window.addEventListener('resize', updateConstraints);
    return () => window.removeEventListener('resize', updateConstraints);
  }, []);

  // Handle scroll distance visibility
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 250) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
        setIsAscending(false); // Reset boost state once back at top
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  // Micro-interactions: Automatic eye blinks and direction changes
  useEffect(() => {
    const blinkInterval = setInterval(() => {
      setBlinkState(true);
      setTimeout(() => setBlinkState(false), 150);
    }, 4000);

    const lookInterval = setInterval(() => {
      const directions: ('center' | 'left' | 'right')[] = ['center', 'left', 'right'];
      const randomDir = directions[Math.floor(Math.random() * directions.length)];
      setLookDirection(randomDir);
    }, 6000);

    return () => {
      clearInterval(blinkInterval);
      clearInterval(lookInterval);
    };
  }, []);

  // Update quote based on state
  useEffect(() => {
    if (isAscending) {
      setCompanionQuote('Initiating hyper-ascension! 🚀');
    } else if (isHovered) {
      setCompanionQuote('Ready to return to top orbit!');
    } else {
      setCompanionQuote('Touch & hold to drag • Click to ascend!');
    }
  }, [isHovered, isAscending]);

  const scrollToTop = (e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    // Prevent scrolling if user is dragging or in middle of drag release
    if (isDraggingRef.current) return;
    if (isAscending) return;
    
    setIsAscending(true);
    
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          id="scroll-companion-container"
          drag
          dragMomentum={false}
          dragElastic={0.15}
          dragConstraints={dragConstraints}
          onDragStart={() => {
            isDraggingRef.current = true;
          }}
          onDragEnd={() => {
            // Slight timeout to prevent click trigger immediately upon drag release
            setTimeout(() => {
              isDraggingRef.current = false;
            }, 100);
          }}
          initial={{ opacity: 0, scale: 0.7, y: 100, rotate: -15 }}
          animate={{ 
            opacity: 1, 
            scale: isHovered ? 1.15 : 0.95, 
            y: isAscending ? -120 : 0, 
            rotate: isAscending ? 360 : 0 
          }}
          exit={{ opacity: 0, scale: 0.7, y: 150, rotate: 15 }}
          transition={{ 
            type: 'spring', 
            stiffness: 120, 
            damping: 15,
            y: isAscending ? { duration: 1.2, ease: 'easeInOut' } : undefined
          }}
          className="fixed bottom-24 right-2 sm:bottom-28 lg:bottom-4 lg:right-4 z-50 flex flex-col items-end group pointer-events-none touch-none"
        >
          {/* Futuristic speech bubble HUD */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, x: 20 }}
            animate={{ opacity: isHovered ? 1 : 0, scale: isHovered ? 1 : 0.8, x: isHovered ? 0 : 20 }}
            transition={{ duration: 0.2 }}
            onClick={(e) => scrollToTop(e)}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            title="Axiom Drone v2.5 - Click to ascend"
            className={`mb-3 mr-2 bg-emerald-950/95 backdrop-blur-md border border-emerald-500/30 px-3 py-1.5 rounded-xl shadow-2xl transition-all max-w-xs text-right whitespace-nowrap ${
              isHovered ? 'pointer-events-auto cursor-pointer hover:border-emerald-400' : 'pointer-events-none'
            }`}
          >
            <div className="flex items-center gap-1.5 justify-end select-none">
              <span className="text-[10px] font-mono font-black text-emerald-400 uppercase tracking-widest hover:text-emerald-300">
                Axiom Companion v2.5
              </span>
              <Sparkles className="h-3 w-3 text-emerald-400 animate-pulse" />
            </div>
            <p className="text-[11px] font-sans font-bold text-zinc-100 mt-0.5">
              {companionQuote}
            </p>
          </motion.div>

          {/* Interactive 3D Character Body Wrapper */}
          <button
            onClick={(e) => scrollToTop(e)}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            aria-label="Scroll to top"
            className="relative cursor-grab active:cursor-grabbing focus:outline-none select-none transition-transform duration-300 pointer-events-auto"
            style={{ perspective: '1000px' }}
          >
            {/* Ambient Shadow with Pulse */}
            <div className={`absolute -bottom-2 left-1/2 -translate-x-1/2 w-12 h-2.5 rounded-full bg-emerald-950/40 blur-md transition-transform duration-300 ${isHovered ? 'scale-125' : 'scale-100'} ${isAscending ? 'scale-0' : 'animate-pulse'}`} />

            {/* 3D Container using transform-style */}
            <div 
              className={`relative flex flex-col items-center justify-center transition-all duration-500 transform-gpu ${
                isHovered ? 'scale-110 -translate-y-2' : ''
              }`}
              style={{
                transformStyle: 'preserve-3d',
                transform: isHovered ? 'rotateY(15deg) rotateX(10deg)' : 'rotateY(0deg) rotateX(0deg)'
              }}
            >
              {/* Outer holographic shield / protective ring (3D effect) */}
              <div 
                className={`absolute w-20 h-20 rounded-full border-2 border-dashed border-emerald-500/25 pointer-events-none transition-all duration-1000 ${
                  isHovered ? 'border-emerald-400/45 animate-spin scale-110' : 'animate-[spin_12s_linear_infinite]'
                }`}
              />

              {/* Tilted vertical orbital orbit */}
              <div 
                className="absolute w-24 h-6 border border-emerald-900/20 rounded-full pointer-events-none animate-pulse"
                style={{
                  transform: 'rotateX(75deg) rotateY(15deg)',
                }}
              />

              {/* Glowing Energy Core Behind Bot */}
              <div 
                className={`absolute w-12 h-12 rounded-full filter blur-xl transition-all duration-300 ${
                  isAscending 
                    ? 'bg-amber-500 opacity-90 scale-125' 
                    : isHovered 
                      ? 'bg-emerald-500 opacity-70' 
                      : 'bg-emerald-600/30 opacity-50'
                }`}
              />

              {/* MAIN CHARACTER DESIGN (The Drone) */}
              <div className="relative w-14 h-16 bg-gradient-to-b from-zinc-900 to-zinc-950 border border-emerald-900/40 rounded-3xl flex flex-col items-center shadow-2xl overflow-visible">
                
                {/* Shiny Specular Highlight Glass Cover */}
                <div className="absolute inset-0.5 rounded-[22px] bg-gradient-to-br from-white/10 via-transparent to-transparent pointer-events-none" />

                {/* Cybernetic Antenna / Receptor */}
                <div className="absolute -top-3 w-1 h-3 bg-zinc-800 flex items-center justify-center">
                  <div className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                    isAscending ? 'bg-amber-400 animate-ping' : isHovered ? 'bg-emerald-400 animate-pulse' : 'bg-emerald-600'
                  }`} />
                </div>

                {/* Left and Right Side Hover Jet Thrusters */}
                <div className="absolute -left-2 top-6 w-2.5 h-6 bg-zinc-900 border border-emerald-950/50 rounded-l-md transition-all duration-300 origin-right"
                     style={{ transform: isHovered ? 'rotateY(-25deg)' : 'rotateY(0)' }}>
                  <div className={`w-1 h-1 bg-emerald-500 rounded-full absolute bottom-1 left-0.5 animate-pulse ${isAscending ? 'bg-amber-400' : ''}`} />
                </div>
                <div className="absolute -right-2 top-6 w-2.5 h-6 bg-zinc-900 border border-emerald-950/50 rounded-r-md transition-all duration-300 origin-left"
                     style={{ transform: isHovered ? 'rotateY(25deg)' : 'rotateY(0)' }}>
                  <div className={`w-1 h-1 bg-emerald-500 rounded-full absolute bottom-1 right-0.5 animate-pulse ${isAscending ? 'bg-amber-400' : ''}`} />
                </div>

                {/* Cybernetic Digital Visor Face */}
                <div className="w-11 h-6.5 bg-black border border-zinc-900 rounded-xl mt-3 flex items-center justify-center relative overflow-hidden shadow-inner">
                  {/* Digital scanlines background */}
                  <div className="absolute inset-0 opacity-10 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[size:100%_4px,6px_100%]" />
                  
                  {/* Visor internal indicator */}
                  <div className="absolute top-0.5 left-1/2 -translate-x-1/2 w-6 h-0.5 bg-emerald-500/20 rounded-full" />

                  {/* Eye LED Screen with Dynamic Glances & Blinks */}
                  <div className={`flex gap-3.5 transition-transform duration-300 ${
                    lookDirection === 'left' ? '-translate-x-1' : lookDirection === 'right' ? 'translate-x-1' : 'translate-x-0'
                  }`}>
                    {/* Left Eye */}
                    <div className="relative w-2 h-2.5">
                      <div className={`absolute inset-x-0 bottom-0 bg-emerald-400 rounded-full shadow-[0_0_8px_#34d399] transition-all duration-150 ${
                        blinkState ? 'h-0.5 bg-emerald-500/40 shadow-none' : 'h-2.5'
                      } ${isAscending ? 'bg-amber-400 shadow-[0_0_10px_#fbbf24]' : ''}`} />
                    </div>

                    {/* Right Eye */}
                    <div className="relative w-2 h-2.5">
                      <div className={`absolute inset-x-0 bottom-0 bg-emerald-400 rounded-full shadow-[0_0_8px_#34d399] transition-all duration-150 ${
                        blinkState ? 'h-0.5 bg-emerald-500/40 shadow-none' : 'h-2.5'
                      } ${isAscending ? 'bg-amber-400 shadow-[0_0_10px_#fbbf24]' : ''}`} />
                    </div>
                  </div>
                </div>

                {/* LED Breathing Chest Plate Indicator */}
                <div className="mt-2.5 w-7 h-1.5 bg-zinc-950 rounded-full border border-zinc-900/80 flex items-center justify-center overflow-hidden">
                  <div className={`h-full bg-emerald-500 transition-all duration-500 ${
                    isAscending ? 'w-full bg-amber-400 animate-pulse' : isHovered ? 'w-5 bg-emerald-400 animate-pulse' : 'w-2.5 animate-[pulse_2s_infinite]'
                  }`} />
                </div>

                {/* Futuristic Utility Badge Decal */}
                <span className="text-[7px] font-mono text-zinc-600 mt-1 uppercase tracking-widest leading-none select-none">
                  AX-02
                </span>

                {/* Rocket Thrust Emitter / Plume */}
                <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center">
                  <div className={`w-3.5 rounded-full transition-all duration-300 ${
                    isAscending 
                      ? 'h-8 bg-gradient-to-t from-transparent via-amber-600 to-amber-400 opacity-100 blur-[1px]' 
                      : isHovered 
                        ? 'h-4 bg-gradient-to-t from-transparent to-emerald-400 opacity-80 blur-[2px]' 
                        : 'h-1.5 bg-emerald-600/40 opacity-40 blur-[3px]'
                  }`} />
                </div>
              </div>

              {/* Mini Interactive Rocket Booster particles on Click / Ascent */}
              {isAscending && (
                <div className="absolute -bottom-8 flex gap-1 pointer-events-none">
                  <span className="w-1.5 h-1.5 bg-amber-400 rounded-full animate-ping" />
                  <span className="w-1 h-1 bg-amber-500 rounded-full animate-ping" style={{ animationDelay: '0.1s' }} />
                  <span className="w-1 h-1 bg-orange-500 rounded-full animate-ping" style={{ animationDelay: '0.2s' }} />
                </div>
              )}

              {/* Elegant floating arrow element that reveals itself inside the bot on hover */}
              <div className={`absolute -top-1 px-1.5 py-0.5 rounded bg-emerald-700 border border-emerald-500 text-[8px] font-mono font-bold text-white uppercase tracking-widest shadow-lg transition-all duration-300 ${
                isHovered ? 'scale-100 opacity-100 translate-y-[-16px]' : 'scale-75 opacity-0 translate-y-0'
              }`}>
                <div className="flex items-center gap-0.5">
                  <ArrowUp className="h-2 w-2 animate-bounce" />
                  <span>Ascend</span>
                </div>
              </div>

            </div>
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
