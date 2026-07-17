import React, { useState } from 'react';
import { Users, Send, Activity, Sparkles, MessageSquare, Award, Star, BookOpen } from 'lucide-react';

interface ActiveResearcher {
  name: string;
  role: string;
  expertise: string;
  contributions: number;
  recentActivity: string;
  statusColor: string;
}

export default function CommunityHub() {
  const [researchers, setResearchers] = useState<ActiveResearcher[]>([
    {
      name: 'Dr. Helena Vance',
      role: 'Quantum Cryptographer',
      expertise: 'Post-Quantum Lattice Structures',
      contributions: 142,
      recentActivity: 'Published "Lattice Bounds under Shor Interceptions"',
      statusColor: 'bg-indigo-500'
    },
    {
      name: 'Prof. Alexei Karpathy',
      role: 'Deep Learning Lead',
      expertise: 'Autoregressive Transformer Decoders',
      contributions: 310,
      recentActivity: 'Optimized attention matrix for 1M context limits',
      statusColor: 'bg-cyan-400'
    },
    {
      name: 'Sarah Chen',
      role: 'Biocomputation Expert',
      expertise: 'DNA Folding Optimization Models',
      contributions: 89,
      recentActivity: 'Added 12 structures to DNA Helical repository',
      statusColor: 'bg-emerald-400'
    },
    {
      name: 'Marcus Brody',
      role: 'Archaeological Historian',
      expertise: 'Bronze Age Civilization Holograms',
      contributions: 204,
      recentActivity: 'Reconstructed architectural models of ancient Ur',
      statusColor: 'bg-amber-400'
    }
  ]);

  const [simulatedLogs, setSimulatedLogs] = useState<string[]>([
    'Dr. Helena Vance linked Node: "Quantum Cryptography" to "Lattice Math" (10m ago)',
    'Sarah Chen uploaded a new structural visual concept for "DNA Helical Helix" (25m ago)',
    'Prof. Alexei Karpathy cited "V8 Compiler Pipeline Optimization" in Transformer Decoders (1h ago)',
    'System synced 1,420 peer-reviewed metadata indexes from arXiv (2h ago)'
  ]);

  const [newPost, setNewPost] = useState('');
  const [postSubject, setPostSubject] = useState('');

  const handlePublish = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPost.trim() || !postSubject.trim()) return;

    setSimulatedLogs(prev => [
      `You published Discovery: "${postSubject}" to the Global Knowledge Network (Just now)`,
      ...prev
    ]);

    setNewPost('');
    setPostSubject('');
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <span className="text-[10px] font-mono font-bold tracking-widest text-indigo-400 uppercase flex items-center gap-1">
          <Users className="h-3.5 w-3.5" /> Global Knowledge Network
        </span>
        <h2 className="text-3xl font-black text-white tracking-tight mt-1">
          Futuristic Academic Hub
        </h2>
        <p className="text-zinc-400 text-sm mt-2 leading-relaxed font-sans max-w-2xl">
          Coordinate, verify, and debate technical theories in real-time. Join peer researchers, deep learning engineers, and biomimetic authors in establishing absolute truths.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* LEFT COLUMN: ACTIVE RESEARCHERS & LEADERBOARD (Col span 7) */}
        <div className="lg:col-span-7 space-y-6">
          <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-300 flex items-center gap-2">
            <Star className="h-4 w-4 text-indigo-400 fill-indigo-400/10" /> Connected Knowledge Founders
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {researchers.map((r) => {
              return (
                <div
                  key={r.name}
                  className="p-5 rounded-2xl border border-zinc-900 bg-zinc-950/20 hover:border-indigo-500/20 transition duration-300 space-y-4 flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className={`h-2 w-2 rounded-full ${r.statusColor} animate-pulse`} />
                        <h4 className="text-sm font-bold text-white tracking-tight">{r.name}</h4>
                      </div>
                      <span className="text-[8px] font-mono text-zinc-600 uppercase font-black tracking-widest">
                        Founder
                      </span>
                    </div>

                    <p className="text-[10px] font-mono font-bold text-indigo-400 uppercase tracking-wide leading-none">{r.role}</p>
                    <p className="text-[11px] text-zinc-500 leading-normal font-sans">
                      <strong>Focus:</strong> {r.expertise}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-zinc-900 flex items-center justify-between text-[10px] text-zinc-400 font-mono">
                    <span>{r.contributions} nodes verified</span>
                    <span className="text-indigo-400/80 max-w-[50%] truncate">{r.recentActivity.split('"')[1] || r.recentActivity}</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Simulated Activity Stream */}
          <div className="p-5 bg-zinc-950/40 border border-zinc-900 rounded-2xl space-y-3.5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-300 flex items-center gap-1.5">
              <Activity className="h-4 w-4 text-emerald-400" /> Live Blockchain Network Activity Logs
            </h4>
            
            <div className="space-y-2 font-mono text-[10px] divide-y divide-zinc-900">
              {simulatedLogs.map((log, index) => (
                <div key={index} className="pt-2.5 first:pt-0 flex items-center gap-2 text-zinc-500">
                  <span className="text-indigo-500 font-bold shrink-0">◇</span>
                  <span className="text-zinc-400">{log}</span>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* RIGHT COLUMN: PUBLISH PROPOSAL PORTAL (Col span 5) */}
        <div className="lg:col-span-5 bg-zinc-950/40 border border-zinc-900 rounded-2xl p-6 space-y-6">
          <div className="space-y-1">
            <h3 className="text-lg font-black text-white tracking-tight flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-indigo-400" /> Publish Thesis Draft
            </h3>
            <p className="text-xs text-zinc-500 leading-relaxed font-sans">
              Submit your discovery or concept node relationship parameters directly to the decentralized network registry for validation peer review.
            </p>
          </div>

          <form onSubmit={handlePublish} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-[10px] font-mono font-bold uppercase tracking-wider text-zinc-400">Concept / Topic Title</label>
              <input
                type="text"
                required
                value={postSubject}
                onChange={(e) => setPostSubject(e.target.value)}
                placeholder="e.g., Lattice Cryptography Shor bounds"
                className="w-full px-4 py-2.5 rounded-xl border border-zinc-800 bg-zinc-950/60 text-xs text-white focus:outline-none focus:border-indigo-500 transition font-semibold"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] font-mono font-bold uppercase tracking-wider text-zinc-400">Thesis Summary Details</label>
              <textarea
                required
                rows={4}
                value={newPost}
                onChange={(e) => setNewPost(e.target.value)}
                placeholder="Flesh out the core architectural axioms or vector bounds..."
                className="w-full p-4 rounded-xl border border-zinc-800 bg-zinc-950/60 text-xs text-white focus:outline-none focus:border-indigo-500 transition font-sans resize-none"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-sans font-bold text-xs uppercase tracking-widest cursor-pointer shadow hover:scale-[1.01] transition-all flex items-center justify-center gap-1.5"
            >
              <span>Broadcast Thesis</span>
              <Send className="h-3.5 w-3.5" />
            </button>
          </form>
        </div>

      </div>
    </div>
  );
}
