import React from 'react';
import { LibraryItem } from '../types';
import { Sparkles, ExternalLink, ThumbsUp, Calendar, Clock, BookOpen } from 'lucide-react';
import { motion } from 'motion/react';

interface ItemCardProps {
  item: LibraryItem;
  onSummarize: (item: LibraryItem, tab: 'tldr' | 'full') => void;
  index: number;
  key?: string | number;
}

export default function ItemCard({ item, onSummarize, index }: ItemCardProps) {
  // Determine standard color based on category
  const categoryColors: Record<string, string> = {
    Articles: 'bg-emerald-500/10 text-emerald-300 border-emerald-500/25',
    News: 'bg-amber-500/10 text-amber-300 border-amber-500/25',
    Tech: 'bg-yellow-500/10 text-yellow-300 border-yellow-500/25',
    APIs: 'bg-teal-500/10 text-teal-300 border-teal-500/25',
    Videos: 'bg-cyan-500/10 text-cyan-300 border-cyan-500/25',
    Posts: 'bg-emerald-600/10 text-emerald-400 border-emerald-600/25'
  };

  const badgeColor = categoryColors[item.category] || 'bg-zinc-900 text-zinc-450 border-zinc-850';

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: Math.min(index * 0.04, 0.4) }}
      className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-zinc-850 bg-[#0E1310]/90 p-5 shadow-sm hover:shadow-lg hover:border-emerald-600/40 hover:bg-[#121915] transition-all duration-300"
    >
      {/* Top Section */}
      <div className="space-y-3">
        {/* Badges */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border ${badgeColor}`}>
              {item.category}
            </span>
            <span className="text-[11px] font-semibold text-zinc-500 font-sans">
              via {item.source}
            </span>
          </div>
          {item.popularity > 0 && (
            <div className="flex items-center gap-1 text-[11px] font-medium text-zinc-500 font-mono">
              <ThumbsUp className="h-3 w-3 text-emerald-400" />
              {item.popularity}
            </div>
          )}
        </div>

        {/* Title */}
        <h3 className="font-sans font-bold text-zinc-150 text-base leading-snug group-hover:text-white transition-colors">
          {item.title}
        </h3>

        {/* Description */}
        <p className="font-sans text-xs text-zinc-400 leading-relaxed line-clamp-3">
          {item.description}
        </p>
      </div>

      {/* Tags and Action Area */}
      <div className="mt-5 space-y-4 pt-4 border-t border-emerald-950/20">
        {/* Tags */}
        <div className="flex flex-wrap gap-1">
          {item.tags.map((tag) => (
            <span
              key={tag}
              className="px-2 py-0.5 rounded bg-[#090C0A] border border-emerald-950/20 text-zinc-400 text-[10px] font-medium font-mono"
            >
              #{tag}
            </span>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-between gap-1">
          <div className="flex items-center gap-1.5">
            {/* Primary Read Article Button */}
            <button
              id={`read-article-btn-${item.id}`}
              onClick={() => onSummarize(item, 'full')}
              className="inline-flex items-center gap-1 text-xs font-bold text-white bg-emerald-700 hover:bg-emerald-650 px-3 py-1.5 rounded-lg transition-all cursor-pointer shadow-sm hover:shadow"
            >
              <BookOpen className="h-3.5 w-3.5" />
              Read Article
            </button>

            {/* AI Summarizer Trigger */}
            <button
              id={`summarize-btn-${item.id}`}
              onClick={() => onSummarize(item, 'tldr')}
              className="inline-flex items-center gap-1 text-xs font-bold text-emerald-400 bg-emerald-500/10 hover:bg-emerald-500/20 hover:text-emerald-300 px-2.5 py-1.5 rounded-lg border border-emerald-500/20 transition-all cursor-pointer"
            >
              <Sparkles className="h-3 w-3 fill-emerald-500/10 text-emerald-400 animate-pulse" />
              AI TL;DR
            </button>
          </div>

          {/* Primary External Resource URL */}
          <a
            href={item.url}
            target="_blank"
            referrerPolicy="no-referrer"
            className="inline-flex items-center gap-1 text-xs font-semibold text-zinc-500 hover:text-zinc-200 px-1.5 py-1.5 rounded transition-colors"
            title="Open external original resource link"
          >
            Source
            <ExternalLink className="h-3.5 w-3.5" />
          </a>
        </div>
      </div>

      {/* Decorative Bottom Corner Accent */}
      <div className="absolute bottom-0 right-0 h-1 w-0 bg-emerald-500 group-hover:w-full transition-all duration-300" />
    </motion.div>
  );
}
