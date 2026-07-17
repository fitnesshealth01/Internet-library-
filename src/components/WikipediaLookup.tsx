import React, { useState } from 'react';
import { Search, Loader2, BookOpen, ExternalLink } from 'lucide-react';
import { motion } from 'motion/react';

interface WikiItem {
  id: string;
  title: string;
  description: string;
  url: string;
  source: string;
  tags: string[];
}

export default function WikipediaLookup() {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<WikiItem[]>([]);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    setHasSearched(true);
    try {
      const response = await fetch(`/api/wikipedia?q=${encodeURIComponent(query)}`);
      const data = await response.json();
      if (data.success) {
        setResults(data.items);
      } else {
        setResults([]);
      }
    } catch (err) {
      console.error(err);
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Search Bar */}
      <form onSubmit={handleSearch} className="flex gap-2 max-w-lg mx-auto">
        <div className="relative flex-1">
          <input
            id="wikipedia-search-input"
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search Wikipedia (e.g. quantum physics, database indexes, V8)..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-zinc-800 text-sm focus:outline-none focus:border-indigo-500 transition font-sans bg-[#1A1A1C] text-zinc-100 placeholder-zinc-500"
          />
          <Search className="absolute left-3.5 top-3.5 h-4 w-4 text-zinc-500" />
        </div>
        <button
          id="wikipedia-search-btn"
          type="submit"
          disabled={loading || !query.trim()}
          className="px-5 py-2.5 rounded-xl bg-indigo-600 text-white text-sm font-semibold hover:bg-indigo-700 disabled:opacity-50 transition cursor-pointer"
        >
          Lookup
        </button>
      </form>

      {/* Results */}
      {loading ? (
        <div className="py-20 flex flex-col items-center justify-center gap-3">
          <Loader2 className="h-8 w-8 text-indigo-400 animate-spin" />
          <p className="text-sm font-medium text-zinc-500 font-sans">Querying Wikipedia database...</p>
        </div>
      ) : results.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {results.map((wiki, index) => (
            <motion.div
              key={wiki.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="group bg-[#111112] p-5 rounded-2xl border border-zinc-800 shadow-sm hover:shadow-lg hover:border-indigo-500/50 hover:bg-[#1A1A1C] transition-all duration-300 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="px-2 py-0.5 rounded-md bg-zinc-900 border border-zinc-800 text-zinc-400 font-mono text-[10px]">
                    Page ID: {wiki.id.replace('wiki-', '')}
                  </span>
                  <BookOpen className="h-4 w-4 text-zinc-600 group-hover:text-indigo-400 transition" />
                </div>
                <h3 className="font-sans font-bold text-zinc-200 text-base leading-snug group-hover:text-white transition-colors">
                  {wiki.title}
                </h3>
                <p className="text-xs text-zinc-400 leading-relaxed font-sans line-clamp-3">
                  {wiki.description}
                </p>
              </div>

              <div className="flex items-center justify-between pt-4 mt-4 border-t border-zinc-800/80">
                <div className="flex gap-1">
                  {wiki.tags.map((tag) => (
                    <span key={tag} className="text-[10px] bg-indigo-500/15 text-indigo-400 font-semibold px-2 py-0.5 rounded border border-indigo-500/20">
                      #{tag}
                    </span>
                  ))}
                </div>
                <a
                  href={wiki.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  referrerPolicy="no-referrer"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-zinc-500 group-hover:text-white transition-colors"
                >
                  Read Wikipedia
                  <ExternalLink className="h-3 w-3" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      ) : hasSearched ? (
        <div className="py-20 text-center space-y-2 bg-[#111112] border border-zinc-800 rounded-2xl">
          <BookOpen className="h-10 w-10 text-zinc-600 mx-auto" />
          <p className="text-sm font-semibold text-zinc-300">No encyclopedic entries found</p>
          <p className="text-xs text-zinc-500">Try searching for simple academic keywords like "Internet", "Computer Science", or "PostgreSQL".</p>
        </div>
      ) : (
        <div className="py-20 border-2 border-dashed border-zinc-800 rounded-2xl text-center space-y-3 bg-[#111112]">
          <BookOpen className="h-12 w-12 text-zinc-600 mx-auto" />
          <div className="max-w-md mx-auto">
            <h4 className="font-sans font-bold text-sm text-zinc-300">Wikipedia Research Desk</h4>
            <p className="text-xs text-zinc-500 mt-1">Look up definitions, historical records, and global articles directly. Fully integrated with standard Wikipedia media lookup.</p>
          </div>
          <div className="flex flex-wrap justify-center gap-1.5 max-w-sm mx-auto pt-2">
            {["System Design", "HTTP/3", "Node.js", "Neural Networks"].map((topic) => (
              <button
                key={topic}
                onClick={() => {
                  setQuery(topic);
                }}
                className="text-[11px] px-2.5 py-1 rounded-full bg-[#1A1A1C] border border-zinc-800 text-zinc-400 hover:border-indigo-500/50 hover:text-white transition cursor-pointer"
              >
                "{topic}"
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
