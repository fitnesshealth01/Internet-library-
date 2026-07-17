import React, { useState } from 'react';
import { Search, Play, X, Sparkles, Youtube, Clock, ExternalLink } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { YouTubeVideo } from '../types';

export default function YouTubeEmbedPanel() {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [videos, setVideos] = useState<YouTubeVideo[]>([]);
  const [activeVideoId, setActiveVideoId] = useState<string | null>(null);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    setHasSearched(true);
    setActiveVideoId(null);
    try {
      const response = await fetch('/api/youtube', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query })
      });
      const data = await response.json();
      if (data.success) {
        setVideos(data.videos);
      } else {
        setVideos([]);
      }
    } catch (err) {
      console.error(err);
      setVideos([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Search Input */}
      <form onSubmit={handleSearch} className="flex gap-2 max-w-lg mx-auto">
        <div className="relative flex-1">
          <input
            id="youtube-search-input"
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="What do you want to watch? (e.g. event loop, react 19, git)..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-zinc-800 text-sm focus:outline-none focus:border-indigo-500 transition font-sans bg-[#1A1A1C] text-zinc-100 placeholder-zinc-500"
          />
          <Search className="absolute left-3.5 top-3.5 h-4 w-4 text-zinc-500" />
        </div>
        <button
          id="youtube-search-btn"
          type="submit"
          disabled={loading || !query.trim()}
          className="px-5 py-2.5 rounded-xl bg-indigo-600 text-white text-sm font-semibold hover:bg-indigo-700 disabled:opacity-50 transition flex items-center gap-1 cursor-pointer"
        >
          <Youtube className="h-4 w-4" />
          Search
        </button>
      </form>

      {/* Video Grid */}
      {loading ? (
        <div className="py-20 flex flex-col items-center justify-center gap-4 bg-[#111112] border border-zinc-800 rounded-2xl">
          <div className="relative">
            <div className="h-10 w-10 rounded-full border-4 border-zinc-800 border-t-indigo-500 animate-spin" />
            <Sparkles className="absolute inset-0 m-auto h-4 w-4 text-indigo-400 animate-pulse" />
          </div>
          <div className="text-center space-y-1">
            <p className="text-sm font-medium text-zinc-300 font-sans">AI recommending top educational videos...</p>
            <p className="text-xs text-zinc-500">Consulting Gemini knowledge base for high-quality video ids</p>
          </div>
        </div>
      ) : videos.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {videos.map((video, index) => (
            <motion.div
              key={video.videoId}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
              className="bg-[#111112] rounded-2xl border border-zinc-800 overflow-hidden shadow-sm hover:shadow-lg hover:border-indigo-500/50 transition duration-300 flex flex-col justify-between"
            >
              {/* Video Thumbnail Mimic */}
              <div className="relative aspect-video bg-black flex items-center justify-center group overflow-hidden">
                <img
                  src={`https://img.youtube.com/vi/${video.videoId}/0.jpg`}
                  alt={video.title}
                  onError={(e) => {
                    // fall back to default image if thumbnail is invalid
                    (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=600';
                  }}
                  className="absolute inset-0 h-full w-full object-cover opacity-50 group-hover:scale-105 transition duration-500"
                  referrerPolicy="no-referrer"
                />
                {/* Play Overlay */}
                <button
                  id={`play-video-${video.videoId}`}
                  onClick={() => setActiveVideoId(video.videoId)}
                  className="relative z-10 h-14 w-14 rounded-full bg-indigo-600/90 text-white flex items-center justify-center hover:bg-indigo-600 hover:scale-110 shadow-lg transition duration-200 cursor-pointer"
                >
                  <Play className="h-6 w-6 fill-white ml-0.5" />
                </button>
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-xs z-10 bg-black/60 backdrop-blur-[2px] px-2 py-1 rounded">
                  <span className="font-semibold">{video.channel}</span>
                  <span className="flex items-center gap-1 font-mono">
                    <Clock className="h-3 w-3 text-zinc-400" />
                    {video.duration}
                  </span>
                </div>
              </div>

              {/* Video Details */}
              <div className="p-4 flex-1 flex flex-col justify-between space-y-3 bg-[#111112]">
                <div className="space-y-1.5">
                  <h3 className="font-sans font-bold text-zinc-200 text-sm leading-snug line-clamp-2">
                    {video.title}
                  </h3>
                  <p className="text-xs text-zinc-400 leading-relaxed font-sans line-clamp-2">
                    {video.description}
                  </p>
                </div>
                <div className="flex items-center justify-between pt-3 border-t border-zinc-800/80">
                  <span className="text-[10px] text-zinc-500 font-mono">ID: {video.videoId}</span>
                  <a
                    href={`https://www.youtube.com/watch?v=${video.videoId}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    referrerPolicy="no-referrer"
                    className="inline-flex items-center gap-1 text-xs font-semibold text-indigo-400 hover:text-indigo-300 transition-colors"
                  >
                    Open on YouTube
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      ) : hasSearched ? (
        <div className="py-20 text-center space-y-2 bg-[#111112] border border-zinc-800 rounded-2xl">
          <Youtube className="h-10 w-10 text-zinc-600 mx-auto" />
          <p className="text-sm font-semibold text-zinc-300">No recommended videos found</p>
          <p className="text-xs text-zinc-500">Try simple programming terms like "react", "databases", "docker" or "css grid".</p>
        </div>
      ) : (
        <div className="py-20 border-2 border-dashed border-zinc-800 rounded-2xl text-center space-y-3 bg-[#111112]">
          <Youtube className="h-12 w-12 text-zinc-600 mx-auto" />
          <div className="max-w-md mx-auto">
            <h4 className="font-sans font-bold text-sm text-zinc-300">Intelligent Video Catalog</h4>
            <p className="text-xs text-zinc-500 mt-1">Discover, verify, and view real-world popular technical video tutorials directly within the platform. Our catalog utilizes Gemini-assisted link indices.</p>
          </div>
          <div className="flex flex-wrap justify-center gap-1.5 max-w-sm mx-auto pt-2">
            {["JavaScript Event Loop", "CS50 Computer Science", "Docker Crash Course"].map((topic) => (
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

      {/* Video Playback Modal Overlay */}
      <AnimatePresence>
        {activeVideoId && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-950/80 backdrop-blur-sm">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative w-full max-w-3xl rounded-2xl overflow-hidden bg-black shadow-2xl border border-neutral-800"
            >
              <button
                id="close-video-overlay"
                onClick={() => setActiveVideoId(null)}
                className="absolute top-4 right-4 z-10 rounded-full p-2 bg-neutral-900/80 text-neutral-300 hover:text-white hover:bg-neutral-800 transition"
              >
                <X className="h-5 w-5" />
              </button>
              <div className="aspect-video">
                <iframe
                  src={`https://www.youtube.com/embed/${activeVideoId}?autoplay=1`}
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                />
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
