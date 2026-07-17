import React from 'react';
import { Award, Compass, Heart, Shield, Cpu, BookOpen, Clock, Activity, Zap, Rss, Globe, Sparkles, Youtube, ExternalLink } from 'lucide-react';

export default function KnowledgeProfile() {
  const navigateTo = (path: string) => {
    window.history.pushState(null, '', path);
    window.dispatchEvent(new PopStateEvent('popstate'));
  };

  const achievements = [
    { name: 'Tech Explorer', desc: 'Mastered advanced software engineering concepts and algorithm bounds.', rank: 'Gold', icon: Zap, color: 'text-amber-400 border-amber-500/20 bg-amber-500/5' },
    { name: 'System Architect', desc: 'Analyzed complex full-stack architectures and V8 compiler behaviors.', rank: 'Silver', icon: Cpu, color: 'text-slate-300 border-slate-500/20 bg-slate-500/5' },
    { name: 'Curated Collector', desc: 'Completed foundational linear algebra, system design, and math paths.', rank: 'Bronze', icon: BookOpen, color: 'text-orange-400 border-orange-500/20 bg-orange-500/5' },
  ];

  return (
    <div className="space-y-8">
      {/* Profile Header Card */}
      <div className="p-6 md:p-8 rounded-3xl border border-zinc-900 bg-gradient-to-r from-zinc-950 via-[#111112]/80 to-zinc-950 relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="absolute inset-0 bg-radial-gradient from-indigo-500/5 to-transparent pointer-events-none" />
        
        <div className="flex items-center gap-5 relative z-10">
          {/* Avatar sphere mockup */}
          <div className="h-16 w-16 rounded-full bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 p-0.5 relative">
            <div className="h-full w-full rounded-full bg-zinc-950 flex items-center justify-center font-bold font-sans text-xl text-white">
              AS
            </div>
            {/* Pulsing online status indicator */}
            <span className="absolute bottom-1 right-1 h-3.5 w-3.5 rounded-full bg-emerald-500 border-2 border-zinc-950" />
          </div>

          <div className="space-y-1">
            <h3 className="text-xl font-black text-white tracking-tight">Akash Solanki</h3>
            <p className="text-xs font-mono font-bold text-indigo-400 uppercase tracking-wider leading-none">Senior Software Developer</p>
            <p className="text-[10px] text-zinc-500">Member since March 2025 • User ID: 9203-MEMBER</p>
          </div>
        </div>

        {/* Global Level display */}
        <div className="flex items-center gap-4 relative z-10 bg-zinc-950/60 p-4 rounded-2xl border border-zinc-900/60">
          <div className="text-right">
            <p className="text-[9px] font-mono font-bold text-zinc-500 uppercase tracking-widest">Learning Progress Tracker</p>
            <p className="text-sm font-bold text-white mt-1">Level 4 Explorer</p>
          </div>
          <div className="h-10 w-[1px] bg-zinc-800" />
          <div className="text-center font-display font-black text-2xl text-indigo-400">
            8,420 <span className="text-[10px] font-sans font-medium text-zinc-500 uppercase tracking-wider">XP</span>
          </div>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Topics Explored', value: '42 nodes', icon: Compass, text: '21 advanced, 21 foundational' },
          { label: 'Total Study hours', value: '18.4 hours', icon: Clock, text: 'Avg 45m per module session' },
          { label: 'Saved Discoveries', value: '12 items', icon: Heart, text: 'Synced with cloud database' },
          { label: 'Community Rep', value: '98.5 Score', icon: Shield, text: 'Top 5% of active curators' },
        ].map((met) => {
          const Icon = met.icon;
          return (
            <div key={met.label} className="p-5 rounded-2xl border border-zinc-900 bg-zinc-950/20 space-y-3">
              <div className="flex items-center justify-between text-zinc-500">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider">{met.label}</span>
                <Icon className="h-4 w-4 text-indigo-400" />
              </div>
              <p className="text-2xl font-black text-white tracking-tight leading-none font-display">
                {met.value}
              </p>
              <p className="text-[10px] font-sans text-zinc-500 leading-normal">{met.text}</p>
            </div>
          );
        })}
      </div>

      {/* Achievements and Saved Discoveries */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Achievements Column (Col span 7) */}
        <div className="lg:col-span-7 space-y-5">
          <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-300 flex items-center gap-2">
            <Award className="h-4 w-4 text-indigo-400" /> Unlockable Milestone Badges
          </h3>

          <div className="space-y-3">
            {achievements.map((ach) => {
              const Icon = ach.icon;
              return (
                <div key={ach.name} className={`p-4 rounded-xl border flex items-center gap-4 ${ach.color}`}>
                  <div className="p-2.5 rounded-lg bg-zinc-950/80 border border-zinc-900 text-inherit shrink-0">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm font-bold text-white tracking-tight">{ach.name}</h4>
                      <span className="text-[8px] font-mono font-bold uppercase tracking-widest px-1 py-0.2 bg-zinc-900 rounded border border-zinc-800 text-zinc-400">
                        {ach.rank} Badge
                      </span>
                    </div>
                    <p className="text-xs text-zinc-400 leading-relaxed font-sans">{ach.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Personalized Local Sub-Node Graph (Col span 5) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Quick Access Portal (Profile Menu) */}
          <div className="bg-zinc-950/40 border border-zinc-900 rounded-2xl p-6 space-y-4">
            <div className="space-y-1">
              <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-300 flex items-center gap-1.5">
                <Compass className="h-4 w-4 text-indigo-400" /> Quick Access Portal
              </h3>
              <p className="text-[11px] text-zinc-500 leading-relaxed font-sans">
                Navigate directly to different channels in your curated discovery engine:
              </p>
            </div>

            <div className="grid grid-cols-1 gap-2">
              {[
                { label: 'Curated Index', path: '/explore/curated', icon: BookOpen, color: 'hover:border-indigo-500/40 hover:bg-indigo-500/5 text-zinc-300 hover:text-white' },
                { label: 'Live Feeds', path: '/explore/live', icon: Rss, color: 'hover:border-amber-500/40 hover:bg-amber-500/5 text-zinc-300 hover:text-white' },
                { label: 'Compiled Archives', path: '/explore/compiled', icon: Sparkles, color: 'hover:border-purple-500/40 hover:bg-purple-500/5 text-zinc-300 hover:text-white' },
                { label: 'Wikipedia Lookup', path: '/explore/wiki', icon: Globe, color: 'hover:border-cyan-500/40 hover:bg-cyan-500/5 text-zinc-300 hover:text-white' },
                { label: 'YouTube Tutorials', path: '/explore/youtube', icon: Youtube, color: 'hover:border-rose-500/40 hover:bg-rose-500/5 text-zinc-300 hover:text-white' }
              ].map((link) => {
                const Icon = link.icon;
                return (
                  <button
                    key={link.label}
                    onClick={() => navigateTo(link.path)}
                    className={`flex items-center justify-between w-full p-3 rounded-xl border border-zinc-900/60 bg-zinc-950/60 font-sans text-xs font-bold text-left transition duration-200 cursor-pointer ${link.color}`}
                  >
                    <div className="flex items-center gap-2.5">
                      <Icon className="h-4 w-4 text-zinc-400 group-hover:text-current animate-pulse" />
                      <span>{link.label}</span>
                    </div>
                    <ExternalLink className="h-3 w-3 text-zinc-600" />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Sub-Node Network Card */}
          <div className="bg-zinc-950/40 border border-zinc-900 rounded-2xl p-6 space-y-5 flex flex-col justify-between">
            <div className="space-y-1.5">
              <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-300 flex items-center gap-1.5">
                <Activity className="h-4 w-4 text-cyan-400" /> Learning Sub-Node Network
              </h3>
              <p className="text-xs text-zinc-500 leading-relaxed font-sans">
                Your custom network visualizer projecting dynamic relationships of topics you recently studied:
              </p>
            </div>

            {/* Visual Canvas Sub-Graph Map */}
            <div className="h-[180px] bg-zinc-950/80 rounded-xl border border-zinc-900 relative flex items-center justify-center overflow-hidden">
              <div className="absolute h-[80px] w-[80px] rounded-full border border-indigo-500/10 animate-ping" />
              
              {/* Small nodes network diagram */}
              <div className="relative z-10 flex flex-col items-center gap-1 text-center">
                <span className="h-4 w-4 rounded-full bg-indigo-500 shadow shadow-indigo-500/20" />
                <span className="text-[8px] font-mono uppercase tracking-wider text-zinc-300">Akash Solanki</span>
              </div>

              <div className="absolute top-8 left-8 flex flex-col items-center gap-0.5 text-center">
                <span className="h-2 w-2 rounded-full bg-cyan-400" />
                <span className="text-[6px] font-mono uppercase text-zinc-500">System Design</span>
              </div>

              <div className="absolute bottom-8 right-8 flex flex-col items-center gap-0.5 text-center">
                <span className="h-2 w-2 rounded-full bg-purple-500" />
                <span className="text-[6px] font-mono uppercase text-zinc-500">React Server Components</span>
              </div>

              <div className="absolute top-12 right-12 flex flex-col items-center gap-0.5 text-center">
                <span className="h-2 w-2 rounded-full bg-emerald-400" />
                <span className="text-[6px] font-mono uppercase text-zinc-500">Data Structures</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
