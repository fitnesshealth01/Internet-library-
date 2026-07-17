import React, { useState } from 'react';
import { BookOpen, Award, ExternalLink, Filter, TrendingUp, Sparkles, Book, Video, Link, ArrowRight } from 'lucide-react';

interface ResourceItem {
  id: string;
  title: string;
  type: 'Book' | 'Course' | 'Research Paper' | 'Video' | 'Tool';
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  trustScore: number;
  recommendation: string;
  popularity: number;
  url: string;
  source: string;
}

export default function ResourcesCenter() {
  const [activeFilter, setActiveFilter] = useState<string>('All');

  const resources: ResourceItem[] = [
    {
      id: 'res-1',
      title: 'Designing Data-Intensive Applications',
      type: 'Book',
      difficulty: 'Advanced',
      trustScore: 99,
      recommendation: 'The definitive bible for scalable, fault-tolerant technical systems architectural planning.',
      popularity: 1850,
      url: 'https://www.oreilly.com/library/view/designing-data-intensive-applications/9781491903063/',
      source: 'O\'Reilly Media'
    },
    {
      id: 'res-2',
      title: 'MIT Deep Learning Lectures (6.S191)',
      type: 'Course',
      difficulty: 'Intermediate',
      trustScore: 98,
      recommendation: 'Comprehensive visual visual step-by-step introduction to deep representation mathematics and transformers.',
      popularity: 1420,
      url: 'http://introtodeeplearning.com/',
      source: 'MIT OpenCourseWare'
    },
    {
      id: 'res-3',
      title: 'Attention Is All You Need',
      type: 'Research Paper',
      difficulty: 'Advanced',
      trustScore: 100,
      recommendation: 'The historic original research paper inventing multi-headed self-attention structures (Transformers).',
      popularity: 2450,
      url: 'https://arxiv.org/abs/1706.03762',
      source: 'Google Brain Research'
    },
    {
      id: 'res-4',
      title: 'Drizzle ORM & Postgres scaling setups',
      type: 'Tool',
      difficulty: 'Intermediate',
      trustScore: 96,
      recommendation: 'Ultra lightweight TypeScript relational mapper supporting near-instant database migrations and queries.',
      popularity: 980,
      url: 'https://orm.drizzle.team/',
      source: 'Drizzle Dev Team'
    },
    {
      id: 'res-5',
      title: 'MDN Web Docs Core CSS Layouts',
      type: 'Tool',
      difficulty: 'Beginner',
      trustScore: 98,
      recommendation: 'Rigorous layout blueprints for modern fluid boxes, grid patterns, and responsive alignment rules.',
      popularity: 1120,
      url: 'https://developer.mozilla.org/en-US/docs/Web/CSS',
      source: 'Mozilla Developer Network'
    },
    {
      id: 'res-6',
      title: 'V8 Compiler Pipeline Architecture',
      type: 'Video',
      difficulty: 'Advanced',
      trustScore: 95,
      recommendation: 'Excellent deep dive video lecture tracing JavaScript bytecode compile down to bare silicon.',
      popularity: 760,
      url: 'https://v8.dev/blog',
      source: 'Google V8 Team'
    }
  ];

  const filteredResources = activeFilter === 'All'
    ? resources
    : resources.filter(r => r.type === activeFilter);

  return (
    <div className="space-y-8">
      {/* Page header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-[10px] font-mono font-bold tracking-widest text-indigo-400 uppercase flex items-center gap-1">
            <BookOpen className="h-3.5 w-3.5" /> Futurist Resource Repository
          </span>
          <h2 className="text-3xl font-black text-white tracking-tight mt-1">
            Elite Technical Library
          </h2>
          <p className="text-zinc-400 text-sm mt-2 leading-relaxed font-sans max-w-xl">
            Sift through highly peer-reviewed courses, original research publications, developer blueprints, and technical compilers. Each resource carries verified AI trust metrics.
          </p>
        </div>

        {/* Categories selector */}
        <div className="flex flex-wrap gap-1 items-center bg-zinc-950/40 p-1 rounded-xl border border-zinc-900 self-start md:self-auto">
          {['All', 'Book', 'Course', 'Research Paper', 'Tool', 'Video'].map((type) => (
            <button
              key={type}
              onClick={() => setActiveFilter(type)}
              className={`px-3 py-1.5 rounded-lg text-[10px] font-mono font-bold uppercase transition cursor-pointer ${
                activeFilter === type
                  ? 'bg-indigo-600 text-white'
                  : 'text-zinc-400 hover:text-white hover:bg-zinc-900'
              }`}
            >
              {type === 'Research Paper' ? 'Papers' : type === 'All' ? 'All' : `${type}s`}
            </button>
          ))}
        </div>
      </div>

      {/* Grid listing */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        
        {filteredResources.map((res) => {
          return (
            <div
              key={res.id}
              className="bg-zinc-950/40 border border-zinc-900 rounded-2xl p-5 hover:border-indigo-500/30 transition-all duration-300 flex flex-col justify-between group relative overflow-hidden"
            >
              {/* Outer decorative glowing dot */}
              <div className="absolute top-0 right-0 h-16 w-16 bg-gradient-to-br from-indigo-500/10 via-transparent to-transparent pointer-events-none" />

              <div className="space-y-4">
                {/* Badge layout */}
                <div className="flex items-center justify-between">
                  <span className="text-[9px] font-mono font-black text-indigo-400 uppercase tracking-widest px-2 py-0.5 rounded bg-indigo-500/10 border border-indigo-500/20">
                    {res.type}
                  </span>
                  
                  {/* Trust indicator */}
                  <div className="flex items-center gap-1 text-[10px] font-mono font-bold text-emerald-400">
                    <Award className="h-3.5 w-3.5" />
                    <span>{res.trustScore}% Score</span>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <h3 className="text-sm font-bold text-white tracking-tight leading-snug group-hover:text-indigo-400 transition">
                    {res.title}
                  </h3>
                  <p className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider">{res.source}</p>
                </div>

                <p className="text-xs text-zinc-400 leading-relaxed font-sans line-clamp-3">
                  {res.recommendation}
                </p>
              </div>

              {/* Action bar */}
              <div className="flex items-center justify-between pt-4 mt-5 border-t border-zinc-900">
                <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-wider">
                  Popularity: {res.popularity} citations
                </span>
                
                <a
                  href={res.url}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 text-[10px] font-mono font-bold uppercase text-indigo-400 hover:text-indigo-300 transition"
                >
                  <span>Acquire</span>
                  <ExternalLink className="h-3 w-3" />
                </a>
              </div>
            </div>
          );
        })}



      </div>
    </div>
  );
}
