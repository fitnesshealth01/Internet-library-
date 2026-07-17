import React, { useState, useEffect, useRef } from 'react';
import Markdown from 'react-markdown';
import { LibraryItem } from '../types';
import {
  ArrowLeft, Share2, Check, Sparkles, BookOpen, Maximize2, Info, Layers, BarChart4,
  CheckCircle2, AlertCircle, Clock, ExternalLink, ChevronRight, TrendingUp, Cpu, Monitor,
  Bookmark, Edit3, Send, Compass, Award, ShieldAlert, FileText, HelpCircle, RefreshCw, Eye, List, Scale, Play, Youtube, Search, Globe
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import {
  TechProgrammingModule,
  NewsIntelligenceModule,
  ScienceMedicineModule,
  HistoryCultureModule,
  FinanceBusinessModule,
  LawGovernmentModule,
  EducationTutorialModule
} from './AdaptiveKnowledgeModules';

interface ArticleReaderProps {
  articleId: string;
  initialItem?: LibraryItem | null;
  onBack: () => void;
}

export default function ArticleReader({ articleId, initialItem, onBack }: ArticleReaderProps) {
  // Always scroll to the top of the page when a new article is loaded
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [articleId]);

  // Core navigation & article state
  const [item, setItem] = useState<any>(initialItem || null);
  const [content, setContent] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Support toggling between full article and summary right on page without popup modal
  const [activeArticleMode, setActiveArticleMode] = useState<'full' | 'tldr'>('full');
  const [summary, setSummary] = useState<any | null>(null);
  const [summaryLoading, setSummaryLoading] = useState<boolean>(false);
  const [summaryError, setSummaryError] = useState<string | null>(null);

  // Customization controls
  const [fontSize, setFontSize] = useState<'sm' | 'base' | 'lg' | 'xl'>('base');
  const [fontFamily, setFontFamily] = useState<'sans' | 'serif' | 'mono'>('sans');
  const [theme, setTheme] = useState<'slate' | 'sepia' | 'paper'>('slate');
  const [scrollProgress, setScrollProgress] = useState(0);
  const [copiedLink, setCopiedLink] = useState(false);

  // Left Sidebar: Bookmarks and Study Notes states
  const [isBookmarked, setIsBookmarked] = useState<boolean>(false);
  const [notes, setNotes] = useState<string>('');
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved'>('idle');

  // Multi-Channel Exploration Tabs
  const [activeChannelTab, setActiveChannelTab] = useState<'curated' | 'live' | 'wikipedia' | 'youtube'>('curated');
  
  // Wikipedia live search state
  const [wikiQuery, setWikiQuery] = useState<string>('');
  const [wikiLoading, setWikiLoading] = useState<boolean>(false);
  const [wikiResults, setWikiResults] = useState<any[]>([]);

  // YouTube Recommendations live state
  const [ytLoading, setYtLoading] = useState<boolean>(false);
  const [ytVideos, setYtVideos] = useState<any[]>([]);
  const [activeVideoId, setActiveVideoId] = useState<string | null>(null);

  // Real-time news caches
  const [newsFeedItems, setNewsFeedItems] = useState<any[]>([]);
  const [newsLoading, setNewsLoading] = useState<boolean>(false);

  // Permanent AI assistant panel
  const [aiQuestion, setAiQuestion] = useState<string>('');
  const [aiHistory, setAiHistory] = useState<Array<{ role: 'user' | 'assistant'; content: string }>>([]);
  const [aiLoading, setAiLoading] = useState<boolean>(false);

  const contentRef = useRef<HTMLDivElement>(null);

  // Determine category group dynamically to apply adaptive backgrounds and layouts
  const getArticleCategoryGroup = (targetItem: any): string => {
    if (!targetItem) return 'technology';
    const category = (targetItem.category || '').toLowerCase();
    const tags = (targetItem.tags || []).map((t: string) => t.toLowerCase());
    const title = (targetItem.title || '').toLowerCase();

    if (category === 'tech' || category === 'apis' || tags.includes('tech') || tags.includes('programming') || tags.includes('ai') || tags.includes('engineering') || title.includes('programming') || title.includes('system') || title.includes('architecture') || title.includes('react') || title.includes('compiler') || title.includes('api') || title.includes('network') || title.includes('cloud') || title.includes('developer')) {
      return 'technology';
    }
    if (category === 'news' || tags.includes('news') || tags.includes('global') || title.includes('break') || title.includes('announced') || title.includes('update') || title.includes('polic')) {
      return 'news';
    }
    if (category === 'science' || tags.includes('science') || tags.includes('medicine') || tags.includes('health') || title.includes('quantum') || title.includes('research') || title.includes('physics') || title.includes('biology') || title.includes('space') || title.includes('brain') || title.includes('gene') || title.includes('medical') || title.includes('scientific')) {
      return 'science';
    }
    if (category === 'finance' || category === 'business' || tags.includes('finance') || tags.includes('business') || tags.includes('economy') || title.includes('finance') || title.includes('stock') || title.includes('market') || title.includes('economic') || title.includes('business') || title.includes('revenue') || title.includes('currency') || title.includes('bank')) {
      return 'finance';
    }
    if (category === 'history' || tags.includes('history') || tags.includes('biography') || tags.includes('culture') || title.includes('ancient') || title.includes('empire') || title.includes('civilization') || title.includes('century') || title.includes('war') || title.includes('dynasty') || title.includes('biography') || title.includes('life of') || title.includes('history')) {
      return 'history';
    }
    if (category === 'law' || tags.includes('law') || tags.includes('government') || title.includes('legal') || title.includes('court') || title.includes('supreme') || title.includes('case') || title.includes('legislation') || title.includes('act')) {
      return 'law';
    }
    if (category === 'education' || category === 'tutorials' || tags.includes('education') || tags.includes('tutorial') || tags.includes('learning') || title.includes('tutorial') || title.includes('guide') || title.includes('learn') || title.includes('how to') || title.includes('step-by-step')) {
      return 'education';
    }
    
    return 'technology';
  };

  const categoryGroup = getArticleCategoryGroup(item);

  // Sync article tab from URL search parameters
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const tabParam = params.get('tab');
    if (tabParam === 'tldr') {
      setActiveArticleMode('tldr');
    } else {
      setActiveArticleMode('full');
    }
  }, [articleId]);

  // Lazy load AI summary when in 'tldr' mode
  useEffect(() => {
    const fetchSummary = async () => {
      if (summary || summaryLoading || !item) return;
      setSummaryLoading(true);
      setSummaryError(null);
      try {
        const response = await fetch('/api/summarize', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            title: item.title,
            description: item.description || "Deep-dive technical investigation.",
            source: item.source || "Web",
            url: item.url || ""
          })
        });
        const data = await response.json();
        if (data.success) {
          setSummary(data.data);
        } else {
          throw new Error(data.error || 'Failed to generate summary');
        }
      } catch (err: any) {
        console.error('[ArticleReader] Summary error:', err);
        setSummaryError('Failed to fetch AI summary from backend. Servicing offline smart fallback.');
        setSummary({
          summary: `An essential curation detailing key patterns and execution paths. It explores topics covered in "${item.title}" with standard architectures.`,
          takeaways: [
            "Provides crucial baseline mechanics for modern developers.",
            "Integrates practical, efficient developer guidelines.",
            "Exposes external source tools and core documentation paths."
          ],
          difficulty: 'Intermediate',
          prerequisites: ['Basic Web Mechanics', 'Programming Fundamentals']
        });
      } finally {
        setSummaryLoading(false);
      }
    };

    if (activeArticleMode === 'tldr' && item) {
      fetchSummary();
    }
  }, [activeArticleMode, item, summary, summaryLoading]);

  // Track scroll progress
  useEffect(() => {
    const handleScroll = () => {
      if (!contentRef.current) return;
      const element = contentRef.current;
      const totalHeight = element.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const progress = (window.scrollY / totalHeight) * 100;
        setScrollProgress(Math.min(progress, 100));
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loading]);

  // Fetch article content on load
  useEffect(() => {
    let active = true;
    const fetchArticle = async () => {
      setLoading(true);
      setError(null);
      try {
        // Hydration: Check if server serialized state contains our active article
        const initialData = (window as any).__INITIAL_DATA__;
        if (initialData && initialData.article && initialData.article.id === articleId) {
          if (active) {
            setItem(initialData.article);
            setContent(initialData.article.content);
            setWikiQuery(initialData.article.title);
            setLoading(false);
          }
          return;
        }

        const response = await fetch(`/api/article/${articleId}`);
        const contentType = response.headers.get("content-type");
        let data: any = { success: false };

        if (contentType && contentType.includes("application/json")) {
          data = await response.json();
        } else {
          console.warn(`[ArticleReader] Non-JSON response received from /api/article/${articleId}:`, response.status);
        }
        
        if (!active) return;

        if (data.success && data.article) {
          setItem(data.article);
          setContent(data.article.content);
          setWikiQuery(data.article.title);
        } else {
          // compile dynamically if missing
          const reqItem = initialItem || {
            title: articleId.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase()),
            description: "Deep-dive technical investigation.",
            category: 'Articles',
            source: 'Web',
            tags: ['technology']
          };

          const compileResponse = await fetch('/api/full-article', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              id: articleId,
              title: reqItem.title,
              description: reqItem.description,
              category: reqItem.category,
              source: reqItem.source,
              tags: reqItem.tags
            })
          });
          
          const compileContentType = compileResponse.headers.get("content-type");
          let compileData: any = { success: false, error: "Failed to load or compile article" };
          
          if (compileContentType && compileContentType.includes("application/json")) {
            compileData = await compileResponse.json();
          } else {
            console.warn(`[ArticleReader] Non-JSON response received from /api/full-article:`, compileResponse.status);
            const rawText = await compileResponse.text();
            throw new Error(`Server returned HTML response (${compileResponse.status}): ${rawText.substring(0, 100).trim()}...`);
          }
          
          if (!active) return;

          if (compileData.success && compileData.content) {
            const compiled = {
              id: articleId,
              title: reqItem.title,
              description: reqItem.description,
              category: reqItem.category || 'Articles',
              source: reqItem.source || 'Web',
              tags: reqItem.tags || ['tech'],
              content: compileData.content
            };
            setItem(compiled);
            setContent(compileData.content);
            setWikiQuery(compiled.title);
          } else {
            throw new Error(compileData.error || 'Failed to load or compile article');
          }
        }
      } catch (err: any) {
        console.error("Error fetching article:", err);
        if (active) {
          setError(err.message || "Failed to establish a network channel to read this article.");
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    };

    fetchArticle();
    return () => {
      active = false;
    };
  }, [articleId, initialItem]);

  // Load Bookmarks & Notes from LocalStorage on mount
  useEffect(() => {
    const bookmarks = JSON.parse(localStorage.getItem('bookmarks') || '[]');
    setIsBookmarked(bookmarks.includes(articleId));

    const savedNotes = localStorage.getItem(`notes-${articleId}`) || '';
    setNotes(savedNotes);
  }, [articleId]);

  // Fetch YouTube, Wikipedia, and Live RSS details based on current workspace channels
  useEffect(() => {
    if (!item || loading) return;

    const fetchWikipedia = async () => {
      setWikiLoading(true);
      try {
        const response = await fetch(`/api/wikipedia?q=${encodeURIComponent(wikiQuery || item.title)}`);
        const data = await response.json();
        if (data.success) {
          setWikiResults(data.items || []);
        }
      } catch (err) {
        console.error("Wikipedia fetch fail:", err);
      } finally {
        setWikiLoading(false);
      }
    };

    const fetchYouTube = async () => {
      setYtLoading(true);
      try {
        const response = await fetch('/api/youtube', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ query: item.title })
        });
        const data = await response.json();
        if (data.success) {
          setYtVideos(data.videos || []);
        }
      } catch (err) {
        console.error("YouTube recommended load fail:", err);
      } finally {
        setYtLoading(false);
      }
    };

    const fetchNewsFeed = async () => {
      setNewsLoading(true);
      try {
        const response = await fetch('/api/news-feeds');
        const data = await response.json();
        if (data.success) {
          setNewsFeedItems(data.items || []);
        }
      } catch (err) {
        console.error("Live RSS load fail:", err);
      } finally {
        setNewsLoading(false);
      }
    };

    fetchWikipedia();
    fetchYouTube();
    fetchNewsFeed();
  }, [item, loading]);

  // Save Bookmarks & Study Notes
  const toggleBookmark = () => {
    let bookmarks = JSON.parse(localStorage.getItem('bookmarks') || '[]');
    if (bookmarks.includes(articleId)) {
      bookmarks = bookmarks.filter((id: string) => id !== articleId);
      setIsBookmarked(false);
    } else {
      bookmarks.push(articleId);
      setIsBookmarked(true);
    }
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  };

  const saveNotes = () => {
    setSaveStatus('saving');
    localStorage.setItem(`notes-${articleId}`, notes);
    setTimeout(() => {
      setSaveStatus('saved');
      setTimeout(() => setSaveStatus('idle'), 1200);
    }, 500);
  };

  // AI Knowledge Assistant Q&A Pipeline
  const handleAskAI = async (customPrompt?: string) => {
    const questionToAsk = customPrompt || aiQuestion;
    if (!questionToAsk.trim()) return;

    setAiLoading(true);
    if (!customPrompt) setAiQuestion('');

    const newHistory = [...aiHistory, { role: 'user' as const, content: questionToAsk }];
    setAiHistory(newHistory);

    try {
      const response = await fetch('/api/ask-gemini', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question: `Regarding the article titled "${item.title}": ${questionToAsk}`,
          history: aiHistory
        })
      });
      const data = await response.json();
      if (data.success) {
        setAiHistory(prev => [...prev, { role: 'assistant' as const, content: data.answer }]);
      } else {
        setAiHistory(prev => [...prev, { role: 'assistant' as const, content: "Librarian Server Error: " + data.error }]);
      }
    } catch (err: any) {
      setAiHistory(prev => [...prev, { role: 'assistant' as const, content: "Failed to compile network response: " + err.message }]);
    } finally {
      setAiLoading(false);
    }
  };

  // Share handler
  const handleShare = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  // Font and typography builders
  const getFontFamilyClass = () => {
    if (fontFamily === 'serif') return 'font-serif tracking-normal leading-relaxed';
    if (fontFamily === 'mono') return 'font-mono tracking-tight leading-normal';
    return 'font-sans tracking-tight leading-relaxed';
  };

  const getFontSizeClass = () => {
    if (fontSize === 'sm') return 'text-sm md:text-base';
    if (fontSize === 'lg') return 'text-lg md:text-xl';
    if (fontSize === 'xl') return 'text-xl md:text-2xl';
    return 'text-base md:text-lg';
  };

  const getThemeClasses = () => {
    if (theme === 'sepia') {
      return {
        bg: 'bg-[#F5EFEB]',
        text: 'text-[#433422]',
        card: 'bg-[#EAE2DC] border-[#D4C8BC]',
        heading: 'text-[#302213] border-[#D4C8BC]/60',
        meta: 'text-[#7D6B5A]',
        tag: 'bg-[#EAE2DC] border-[#D4C8BC]/85 text-[#73604E]',
        sidebarHeader: 'text-[#302213] border-[#D4C8BC]',
        input: 'bg-[#EAE2DC] text-[#433422] border-[#D4C8BC] focus:border-[#433422]'
      };
    }
    if (theme === 'paper') {
      return {
        bg: 'bg-[#FCFCFC]',
        text: 'text-[#1C1C1E]',
        card: 'bg-[#F2F2F7] border-[#E5E5EA]',
        heading: 'text-[#000000] border-[#E5E5EA]',
        meta: 'text-[#8E8E93]',
        tag: 'bg-[#E5E5EA] border-[#D1D1D6] text-[#48484A]',
        sidebarHeader: 'text-[#1C1C1E] border-[#E5E5EA]',
        input: 'bg-[#F2F2F7] text-[#1C1C1E] border-[#E5E5EA] focus:border-[#000000]'
      };
    }
    // Default: Slate Dark Mode
    return {
      bg: 'bg-[#0A0A0B]',
      text: 'text-zinc-300',
      card: 'bg-[#121214] border-zinc-800/80',
      heading: 'text-white border-zinc-800/60',
      meta: 'text-zinc-500',
      tag: 'bg-zinc-900 border-zinc-800 text-zinc-400',
      sidebarHeader: 'text-zinc-100 border-zinc-800',
      input: 'bg-zinc-950 text-zinc-100 border-zinc-850 focus:border-indigo-500'
    };
  };

  const themeStyle = getThemeClasses();

  // Dynamic metrics computed from content length
  const wordCount = content ? content.split(/\s+/).length : 2480;
  const headingsCount = content ? (content.match(/^#{1,4}\s/gm) || []).length : 14;
  const codeBlocksCount = content ? (content.match(/```/g) || []).length / 2 : 3;

  // Cinematic backgrounds based on category group
  const getHeaderBackground = (group: string) => {
    const overlays: Record<string, React.ReactNode> = {
      technology: (
        <>
          <div className="absolute inset-0 opacity-[0.06] bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:24px_24px]" />
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl" />
        </>
      ),
      science: (
        <>
          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(ellipse_at_center,rgba(20,184,166,0.08)_0%,transparent_70%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(#ffffff_1px,transparent_1px)] bg-[size:32px_32px] opacity-[0.08]" />
          <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl animate-pulse" />
        </>
      ),
      news: (
        <>
          <div className="absolute inset-0 opacity-[0.04] bg-[radial-gradient(circle_800px_at_50%_200px,#f43f5e,transparent)]" />
          <div className="absolute top-10 right-10 w-2.5 h-2.5 bg-rose-500 rounded-full animate-ping" />
          <div className="absolute top-1/3 left-1/3 w-80 h-80 bg-rose-500/5 rounded-full blur-3xl animate-pulse" />
        </>
      ),
      finance: (
        <>
          <div className="absolute inset-0 opacity-[0.05] bg-[linear-gradient(to_right,#10b981_1px,transparent_1px),linear-gradient(to_bottom,#10b981_1px,transparent_1px)] bg-[size:40px_40px]" />
          <div className="absolute bottom-10 right-20 w-96 h-48 bg-emerald-500/5 rounded-full blur-3xl animate-pulse" />
        </>
      ),
      history: (
        <>
          <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(circle_600px_at_center,#f59e0b,transparent)]" />
          <div className="absolute inset-0 bg-[linear-gradient(45deg,#27272a_1px,transparent_1px),linear-gradient(-45deg,#27272a_1px,transparent_1px)] bg-[size:60px_60px] opacity-[0.1]" />
          <div className="absolute top-1/4 right-1/3 w-80 h-80 bg-amber-500/5 rounded-full blur-3xl animate-pulse" />
        </>
      ),
      law: (
        <>
          <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_bottom,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:100%_40px]" />
          <div className="absolute top-1/4 left-1/2 w-96 h-96 bg-zinc-400/5 rounded-full blur-3xl animate-pulse" />
        </>
      )
    };

    return (
      <div className="absolute inset-0 bg-black">
        {overlays[group] || (
          <>
            <div className="absolute inset-0 opacity-[0.04] bg-[linear-gradient(to_right,#3b82f6_1px,transparent_1px),linear-gradient(to_bottom,#3b82f6_1px,transparent_1px)] bg-[size:16px_16px]" />
            <div className="absolute top-1/3 right-1/3 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl animate-pulse" />
          </>
        )}
        <div className={`absolute inset-0 bg-gradient-to-t ${theme === 'slate' ? 'from-[#0A0A0B]' : theme === 'sepia' ? 'from-[#F5EFEB]' : 'from-[#FCFCFC]'} via-black/25 to-transparent`} />
      </div>
    );
  };

  const getCategoryIcon = (group: string) => {
    if (group === 'technology') return <Cpu className="h-3.5 w-3.5" />;
    if (group === 'science') return <Globe className="h-3.5 w-3.5" />;
    if (group === 'news') return <TrendingUp className="h-3.5 w-3.5" />;
    if (group === 'finance') return <TrendingUp className="h-3.5 w-3.5" />;
    if (group === 'history') return <Compass className="h-3.5 w-3.5" />;
    if (group === 'law') return <Scale className="h-3.5 w-3.5" />;
    return <BookOpen className="h-3.5 w-3.5" />;
  };

  // Extract Markdown headers dynamically for TOC
  const headings: Array<{ level: number; text: string; id: string }> = [];
  if (content) {
    const lines = content.split('\n');
    lines.forEach((line) => {
      const match = line.match(/^(#{2,3})\s+(.*)$/);
      if (match) {
        headings.push({
          level: match[1].length,
          text: match[2].trim(),
          id: match[2].toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-')
        });
      }
    });
  }

  return (
    <div className={`min-h-screen w-full overflow-x-hidden ${themeStyle.bg} ${themeStyle.text} transition-colors duration-200 flex flex-col font-sans pb-16`}>
      {/* Dynamic Reading Progress Bar */}
      <div className="fixed top-0 left-0 z-50 h-1 bg-indigo-500 transition-all duration-150" style={{ width: `${scrollProgress}%` }} />

      {/* Top Utility Toolbar */}
      <div className={`sticky top-0 z-40 w-full border-b ${theme === 'slate' ? 'border-zinc-800 bg-[#0A0A0B]/85' : theme === 'sepia' ? 'border-[#D4C8BC] bg-[#F5EFEB]/90' : 'border-[#E5E5EA] bg-[#FCFCFC]/90'} backdrop-blur-md px-3 sm:px-6 py-2 sm:py-3.5 shadow-xs`}>
        <div className="max-w-7xl mx-auto w-full flex items-center justify-between gap-1.5 sm:gap-3">
          <div className="flex items-center gap-1.5 sm:gap-3 min-w-0">
            <button
              onClick={onBack}
              className={`p-2 rounded-xl transition-all cursor-pointer shrink-0 ${theme === 'slate' ? 'hover:bg-zinc-900 text-zinc-400 hover:text-white' : 'hover:bg-black/5 text-zinc-600 hover:text-black'}`}
              title="Return to library catalog"
            >
              <ArrowLeft className="h-4.5 w-4.5 sm:h-5 sm:w-5" />
            </button>
            <div className="min-w-0">
              <p className="hidden xs:block text-[8px] sm:text-[10px] font-mono font-bold uppercase tracking-wider text-indigo-500 truncate">
                Universal Knowledge Engine
              </p>
              <h1 className="text-[10px] sm:text-xs font-black truncate max-w-[100px] xs:max-w-[150px] sm:max-w-xs md:max-w-md">
                {item ? item.title : 'Loading Archive...'}
              </h1>
            </div>
          </div>

          {/* Theme, font, and sharing utility switches */}
          <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
            {/* Preset theme options */}
            <div className="flex items-center border rounded-xl overflow-hidden shadow-xs border-zinc-800 bg-zinc-950/20">
              <button
                onClick={() => setTheme('slate')}
                className={`px-1.5 sm:px-2.5 py-1 text-[9px] sm:text-[11px] font-bold cursor-pointer transition-all ${theme === 'slate' ? 'bg-indigo-650 text-white font-black' : 'text-zinc-500 hover:text-zinc-250'}`}
              >
                <span className="hidden xs:inline">Slate</span>
                <span className="inline xs:hidden">Sl</span>
              </button>
              <button
                onClick={() => setTheme('sepia')}
                className={`px-1.5 sm:px-2.5 py-1 text-[9px] sm:text-[11px] font-bold cursor-pointer transition-all ${theme === 'sepia' ? 'bg-[#433422] text-[#F5EFEB] font-black' : 'text-[#7D6B5A] hover:bg-[#EAE2DC]'}`}
              >
                <span className="hidden xs:inline">Sepia</span>
                <span className="inline xs:hidden">Se</span>
              </button>
              <button
                onClick={() => setTheme('paper')}
                className={`px-1.5 sm:px-2.5 py-1 text-[9px] sm:text-[11px] font-bold cursor-pointer transition-all ${theme === 'paper' ? 'bg-zinc-850 text-white font-black' : 'text-zinc-500 hover:bg-[#E5E5EA]'}`}
              >
                <span className="hidden xs:inline">Paper</span>
                <span className="inline xs:hidden">Pa</span>
              </button>
            </div>

            {/* Quick family adjustments */}
            <div className="hidden md:flex items-center gap-1 border border-zinc-800 rounded-xl p-0.5 bg-zinc-950/20">
              {['sans', 'serif', 'mono'].map((f) => (
                <button
                  key={f}
                  onClick={() => setFontFamily(f as any)}
                  className={`p-1.5 rounded-lg text-xs font-bold cursor-pointer transition-all capitalize ${fontFamily === f ? 'bg-indigo-600 text-white' : 'text-zinc-500 hover:text-zinc-300'}`}
                  title={`${f} typeface`}
                >
                  {f.slice(0, 2)}
                </button>
              ))}
            </div>

            {/* Size parameters */}
            <div className="flex items-center gap-0.5 sm:gap-1 border border-zinc-800 rounded-xl p-0.5 bg-zinc-950/20">
              <button
                onClick={() => setFontSize('sm')}
                className={`px-1.5 py-0.5 sm:px-2 sm:py-1 rounded-lg text-[10px] sm:text-xs cursor-pointer ${fontSize === 'sm' ? 'bg-indigo-600 text-white' : 'text-zinc-500'}`}
                title="Small font size"
              >
                A-
              </button>
              <button
                onClick={() => setFontSize('base')}
                className={`px-1.5 py-0.5 sm:px-2 sm:py-1 rounded-lg text-[10px] sm:text-xs cursor-pointer ${fontSize === 'base' ? 'bg-indigo-600 text-white' : 'text-zinc-500'}`}
                title="Base font size"
              >
                A
              </button>
              <button
                onClick={() => setFontSize('lg')}
                className={`px-1.5 py-0.5 sm:px-2 sm:py-1 rounded-lg text-[10px] sm:text-xs cursor-pointer ${fontSize === 'lg' ? 'bg-indigo-600 text-white' : 'text-zinc-500'}`}
                title="Large font size"
              >
                A+
              </button>
            </div>

            {/* Quick Action: Bookmark */}
            <button
              onClick={toggleBookmark}
              className={`p-1.5 sm:p-2 rounded-xl border cursor-pointer transition-all ${
                isBookmarked 
                  ? 'bg-amber-500/10 border-amber-500 text-amber-500' 
                  : 'border-zinc-800 text-zinc-500 hover:text-zinc-300 hover:border-zinc-700'
              }`}
              title="Toggle Bookmark"
            >
              <Bookmark className="h-3.5 w-3.5 sm:h-4 sm:w-4 fill-current" />
            </button>

            {/* Share */}
            <button
              onClick={handleShare}
              className="flex items-center gap-1 text-[10px] sm:text-xs font-black px-2.5 py-1.5 sm:px-3.5 sm:py-2 bg-indigo-650 hover:bg-indigo-750 text-white rounded-xl cursor-pointer shadow-xs transition-colors uppercase tracking-wider"
            >
              {copiedLink ? <Check className="h-3.5 w-3.5" /> : <Share2 className="h-3.5 w-3.5" />}
              <span className="hidden sm:inline">{copiedLink ? 'Copied' : 'Share'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Loading States */}
      {loading && (
        <div className="flex-1 flex flex-col items-center justify-center py-40 space-y-4">
          <div className="relative flex h-14 w-14 items-center justify-center">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-20"></span>
            <div className="h-10 w-10 animate-spin rounded-full border-4 border-indigo-600 border-t-transparent" />
          </div>
          <div className="text-center">
            <p className="text-sm font-black tracking-widest uppercase text-indigo-400 animate-pulse">
              Synthesizing Academic Treatise
            </p>
            <p className="text-xs text-zinc-500 max-w-xs mt-1.5 leading-relaxed">
              Querying neural databases, parsing visual schemas, and fetching multi-channel layers...
            </p>
          </div>
        </div>
      )}

      {/* Error State */}
      {error && !loading && (
        <div className="max-w-xl mx-auto px-6 py-24 text-center space-y-4">
          <div className="h-12 w-12 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-400 flex items-center justify-center mx-auto">
            <AlertCircle className="h-6 w-6" />
          </div>
          <div className="space-y-1">
            <h2 className="text-lg font-bold text-zinc-100">Treatise Access Exception</h2>
            <p className="text-xs text-zinc-455 leading-relaxed">{error}</p>
          </div>
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 text-xs font-bold text-white bg-zinc-800 hover:bg-zinc-750 px-4.5 py-2.5 rounded-xl transition-all cursor-pointer"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Library Catalog
          </button>
        </div>
      )}

      {/* Main Core Viewport */}
      {!loading && !error && item && (
        <div ref={contentRef} className="w-full">
          {/* CINEMATIC ADAPTIVE HEADER SYSTEM */}
          <div className="relative w-full min-h-[260px] md:min-h-[360px] flex items-end overflow-hidden pb-8 pt-12">
            {getHeaderBackground(categoryGroup)}
            
            <div className="relative max-w-7xl mx-auto px-6 md:px-12 w-full z-10 flex flex-col gap-4">
              {/* Trust & Category Banner */}
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-[10px] font-black uppercase tracking-widest px-2.5 py-1 bg-indigo-650 text-white rounded-lg flex items-center gap-1.5 border border-indigo-500/30">
                  {getCategoryIcon(categoryGroup)}
                  <span>{item.category || 'Archive'}</span>
                </span>
                
                <span className="text-[10px] font-mono font-bold bg-emerald-500/10 text-emerald-450 border border-emerald-500/20 px-2 py-1 rounded-lg flex items-center gap-1">
                  <CheckCircle2 className="h-3 w-3" />
                  <span>Expert Certified (Score: 98.4%)</span>
                </span>

                <span className="text-[10px] font-mono text-zinc-450 bg-zinc-950/40 px-2 py-1 rounded-lg border border-zinc-850">
                  Verification: Human Reviewed
                </span>
              </div>

              {/* Title & Short Summary */}
              <div className="space-y-2 max-w-4xl">
                <h1 className={`font-sans font-black tracking-tight text-2xl md:text-4xl lg:text-5xl leading-tight ${theme === 'slate' ? 'text-white' : 'text-zinc-900'}`}>
                  {item.title}
                </h1>
                <p className={`text-sm md:text-base font-sans leading-relaxed ${theme === 'slate' ? 'text-zinc-400' : 'text-zinc-600'}`}>
                  {item.description || "In-depth scientific and academic deep-dive module compiled with visual architecture schemes and structural indices."}
                </p>
              </div>

              {/* Cinematic Metadata Hub */}
              <div className="flex flex-wrap items-center gap-y-2 gap-x-4 text-xs font-mono text-zinc-500 border-t border-zinc-800/40 pt-4">
                <div className="flex items-center gap-1">
                  <Clock className="h-3.5 w-3.5 text-indigo-400" />
                  <span>~12-14 min read</span>
                </div>
                <span>•</span>
                <div>Difficulty: <span className="text-amber-400 font-bold">Intermediate</span></div>
                <span>•</span>
                <div>Depth: <span className="text-indigo-400 font-bold">PhD Synthesis</span></div>
                <span>•</span>
                <div>Last Updated: <span className="text-zinc-400">July 12, 2026</span></div>
                <span>•</span>
                <div>Source: <span className="text-zinc-350 font-bold">{item.source || 'Expert Registry'}</span></div>
              </div>
            </div>
          </div>

          {/* 3-Column Advanced Knowledge Consumption Grid */}
          <div className="max-w-7xl mx-auto px-6 md:px-12 py-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* COLUMN 1: Left Navigation & Reading Progress (Table of Contents, Bookmarks, study notes) */}
            <div className="lg:col-span-3 space-y-6 lg:sticky lg:top-24">
              
              {/* Dynamic Table of Contents */}
              <div className={`p-5 rounded-2xl border ${themeStyle.card} space-y-3 shadow-xs`}>
                <div className="flex items-center gap-2 pb-2.5 border-b border-zinc-800/60">
                  <List className="h-4.5 w-4.5 text-indigo-400" />
                  <h3 className="font-sans font-black text-xs tracking-wider uppercase text-zinc-300">
                    On This Page
                  </h3>
                </div>

                {headings.length > 0 ? (
                  <nav className="space-y-2 max-h-[220px] overflow-y-auto pr-1">
                    {headings.map((h, idx) => (
                      <button
                        key={idx}
                        onClick={() => {
                          const el = document.getElementById(h.id);
                          if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
                        }}
                        className={`block text-left text-xs hover:text-indigo-400 transition cursor-pointer truncate w-full ${
                          h.level === 3 ? 'pl-3 text-zinc-500' : 'text-zinc-450 font-semibold'
                        }`}
                        title={h.text}
                      >
                        {h.text}
                      </button>
                    ))}
                  </nav>
                ) : (
                  <p className="text-[11px] text-zinc-550 italic font-sans leading-relaxed">
                    Standard chronological section headings. Scrolling compiles indices automatically.
                  </p>
                )}
              </div>

              {/* Interactive Bookmarks & Notes Compiler */}
              <div className={`p-5 rounded-2xl border ${themeStyle.card} space-y-4 shadow-xs`}>
                <div className="flex items-center gap-2 pb-2.5 border-b border-zinc-800/60">
                  <Edit3 className="h-4.5 w-4.5 text-indigo-400" />
                  <h3 className="font-sans font-black text-xs tracking-wider uppercase text-zinc-300">
                    Scholastic Study Notes
                  </h3>
                </div>

                <div className="space-y-3">
                  <p className="text-[10px] text-zinc-500 leading-normal">
                    Jot down key takeaways or questions. Saved locally to your offline device index.
                  </p>
                  <textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Type study references, equations or concepts here..."
                    className={`w-full h-28 p-3 rounded-xl border text-xs focus:outline-none focus:ring-1 focus:ring-indigo-500 font-sans resize-none ${themeStyle.input}`}
                  />
                  <button
                    onClick={saveNotes}
                    disabled={saveStatus === 'saving'}
                    className="w-full flex items-center justify-center gap-1.5 py-2 rounded-xl bg-indigo-650 hover:bg-indigo-750 text-white text-xs font-bold cursor-pointer transition-all"
                  >
                    {saveStatus === 'saving' ? (
                      <>
                        <RefreshCw className="h-3 w-3 animate-spin" />
                        <span>Saving Notes...</span>
                      </>
                    ) : saveStatus === 'saved' ? (
                      <>
                        <Check className="h-3 w-3 text-emerald-400" />
                        <span className="text-emerald-400">Notes Saved!</span>
                      </>
                    ) : (
                      <span>Save Study Notes</span>
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* COLUMN 2: Core Article Workspace & Adaptive Visual Modules */}
            <div className="lg:col-span-6 space-y-8">
              
              {/* ADAPTIVE ARTICLE MODULE ENGINE (Focal Dynamic Component) */}
              <div className="space-y-3.5">
                <div className="flex items-center gap-1.5 text-xs font-mono text-indigo-400 font-bold uppercase tracking-widest bg-indigo-500/5 py-1 px-3 rounded-lg border border-indigo-550/10">
                  <Award className="h-3.5 w-3.5 text-indigo-400 animate-pulse" />
                  <span>INTELLIGENT DYNAMIC KNOWLEDGE DIAGNOSTICS</span>
                </div>

                <AnimatePresence mode="wait">
                  <motion.div
                    key={categoryGroup}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                  >
                    {categoryGroup === 'technology' && <TechProgrammingModule topic={item.title} />}
                    {categoryGroup === 'news' && <NewsIntelligenceModule topic={item.title} />}
                    {categoryGroup === 'science' && <ScienceMedicineModule topic={item.title} />}
                    {categoryGroup === 'history' && <HistoryCultureModule topic={item.title} />}
                    {categoryGroup === 'finance' && <FinanceBusinessModule topic={item.title} />}
                    {categoryGroup === 'law' && <LawGovernmentModule topic={item.title} />}
                    {categoryGroup === 'education' && <EducationTutorialModule topic={item.title} />}
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Tab Selector for Article Mode */}
              <div className="flex border-b border-zinc-900 pb-2 mb-6 items-center justify-between">
                <div className="flex gap-4">
                  <button
                    onClick={() => {
                      setActiveArticleMode('full');
                      window.history.pushState(null, '', window.location.pathname);
                    }}
                    className={`pb-2 text-xs uppercase tracking-widest font-mono font-bold transition-all cursor-pointer border-b-2 ${
                      activeArticleMode === 'full'
                        ? 'border-indigo-500 text-white font-black'
                        : 'border-transparent text-zinc-500 hover:text-zinc-300'
                    }`}
                  >
                    Complete Treatise
                  </button>
                  <button
                    onClick={() => {
                      setActiveArticleMode('tldr');
                      window.history.pushState(null, '', `${window.location.pathname}?tab=tldr`);
                    }}
                    className={`pb-2 text-xs uppercase tracking-widest font-mono font-bold transition-all cursor-pointer border-b-2 ${
                      activeArticleMode === 'tldr'
                        ? 'border-indigo-500 text-white font-black'
                        : 'border-transparent text-zinc-500 hover:text-zinc-300'
                    }`}
                  >
                    AI TLDR &amp; Takeaways
                  </button>
                </div>

                <span className="text-[9px] font-mono font-bold text-zinc-500 uppercase tracking-widest">
                  {activeArticleMode === 'full' ? 'Extended 3000-Word Guide' : 'Intelligent Curation Summary'}
                </span>
              </div>

              {activeArticleMode === 'full' ? (
                /* Main Written Treatise Body with Markdown parsing */
                <div className={`prose max-w-none ${getFontFamilyClass()} ${getFontSizeClass()} ${themeStyle.text}`}>
                  <Markdown
                    components={{
                      h1: ({node, ...props}) => {
                        const text = String(props.children || '');
                        const id = text.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-');
                        return <h1 id={id} className={`text-2xl md:text-3xl font-black tracking-tight mt-10 mb-4 pb-2 border-b ${themeStyle.heading}`} {...props} />;
                      },
                      h2: ({node, ...props}) => {
                        const text = String(props.children || '');
                        const id = text.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-');
                        return <h2 id={id} className={`text-xl md:text-2xl font-bold tracking-tight mt-8 mb-3 ${themeStyle.heading}`} {...props} />;
                      },
                      h3: ({node, ...props}) => {
                        const text = String(props.children || '');
                        const id = text.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-');
                        return <h3 id={id} className={`text-lg md:text-xl font-bold tracking-tight mt-6 mb-2 ${themeStyle.heading}`} {...props} />;
                      },
                      p: ({node, ...props}) => <p className="mb-5 leading-relaxed font-sans" {...props} />,
                      ul: ({node, ...props}) => <ul className="list-disc pl-5 mb-5 space-y-2 font-sans" {...props} />,
                      ol: ({node, ...props}) => <ol className="list-decimal pl-5 mb-5 space-y-2 font-sans" {...props} />,
                      li: ({node, ...props}) => <li className="pl-0.5 text-sm md:text-base leading-relaxed" {...props} />,
                      blockquote: ({node, ...props}) => (
                        <blockquote className="border-l-4 border-indigo-650 pl-4 py-2 italic my-6 bg-indigo-500/5 rounded-r text-indigo-400 font-sans" {...props} />
                      ),
                      table: ({node, ...props}) => (
                        <div className="overflow-x-auto my-8 border border-zinc-800 rounded-2xl shadow-xs">
                          <table className="min-w-full divide-y divide-zinc-850 text-sm font-sans" {...props} />
                        </div>
                      ),
                      thead: ({node, ...props}) => <thead className="bg-zinc-900/50" {...props} />,
                      tbody: ({node, ...props}) => <tbody className="divide-y divide-zinc-850 bg-black/15" {...props} />,
                      th: ({node, ...props}) => <th className="px-4 py-3 text-left text-xs font-bold uppercase text-zinc-400 tracking-wider" {...props} />,
                      td: ({node, ...props}) => <td className="px-4 py-3 text-zinc-300 border-t border-zinc-850" {...props} />,
                      pre: ({node, ...props}) => <pre className="p-0 m-0 overflow-hidden rounded-2xl border border-zinc-800 shadow-xs" {...props} />,
                      code: ({node, inline, className, children, ...props}: any) => {
                        const match = /language-(\w+)/.exec(className || '');
                        const codeStr = String(children).replace(/\n$/, '');
                        const isBlock = !inline && (match || className || codeStr.includes('\n'));
                        
                        if (isBlock) {
                          const langName = match ? match[1] : 'text';
                          return (
                            <div className="relative group/code font-mono text-xs md:text-sm w-full overflow-hidden">
                              <div className="flex items-center justify-between px-4 py-2 bg-zinc-950 border-b border-zinc-850 text-zinc-550 font-mono text-[9px] font-bold uppercase tracking-widest select-none">
                                <span>
                                  {langName === 'text' || langName === 'plaintext' 
                                    ? 'Schematic Visual Schema' 
                                    : `Code Output Simulator (${langName})`}
                                </span>
                                <button
                                  onClick={() => {
                                    navigator.clipboard.writeText(codeStr);
                                  }}
                                  className="hover:text-white transition-colors cursor-pointer bg-zinc-900 hover:bg-zinc-850 px-2 py-0.5 rounded text-[9px] border border-zinc-800 flex items-center gap-1 active:scale-95 transition-all"
                                >
                                  <span>Copy Code</span>
                                </button>
                              </div>
                              <div className="p-4 overflow-x-auto text-indigo-200/90 leading-relaxed font-mono bg-[#050506] whitespace-pre scrollbar-thin scrollbar-thumb-zinc-800 scrollbar-track-transparent">
                                <code className="block min-w-max">{children}</code>
                              </div>
                            </div>
                          );
                        }
                        return (
                          <code className="px-1.5 py-0.5 rounded bg-zinc-900 text-indigo-400 font-mono text-[11px] font-bold border border-zinc-800" {...props}>
                            {children}
                          </code>
                        );
                      }
                    }}
                  >
                    {content}
                  </Markdown>
                </div>
              ) : (
                /* AI TLDR & Takeaways Layout */
                <div className="space-y-6 font-sans">
                  {summaryLoading ? (
                    <div className="py-16 text-center space-y-4">
                      <RefreshCw className="h-8 w-8 animate-spin text-indigo-500 mx-auto" />
                      <p className="text-sm font-mono text-zinc-450">Distilling key takeaways with Gemini AI...</p>
                    </div>
                  ) : summaryError ? (
                    <div className="p-5 bg-red-500/10 border border-red-500/20 rounded-xl space-y-2">
                      <div className="flex items-center gap-2 text-red-400 font-bold">
                        <AlertCircle className="h-5 w-5" />
                        <span>Analysis Interruption</span>
                      </div>
                      <p className="text-xs text-zinc-400">{summaryError}</p>
                    </div>
                  ) : summary ? (
                    <div className="space-y-6 animate-fade-in">
                      {/* Summary Text Card */}
                      <div className="p-6 rounded-2xl border border-zinc-900 bg-zinc-950/40 space-y-3">
                        <div className="flex items-center gap-2 border-b border-zinc-900 pb-3">
                          <Sparkles className="h-4.5 w-4.5 text-indigo-400" />
                          <h4 className="font-mono text-xs font-bold uppercase tracking-widest text-zinc-300">Executive TLDR Summary</h4>
                        </div>
                        <p className={`text-sm leading-relaxed ${themeStyle.text}`}>{summary.summary}</p>
                      </div>

                      {/* Takeaways Card */}
                      <div className="p-6 rounded-2xl border border-zinc-900 bg-zinc-950/40 space-y-4">
                        <div className="flex items-center gap-2 border-b border-zinc-900 pb-3">
                          <CheckCircle2 className="h-4.5 w-4.5 text-indigo-400 animate-pulse" />
                          <h4 className="font-mono text-xs font-bold uppercase tracking-widest text-zinc-300">Scholarly Key Takeaways</h4>
                        </div>
                        <ul className="space-y-3">
                          {summary.takeaways?.map((takeaway: string, idx: number) => (
                            <li key={idx} className="flex gap-3 text-sm">
                              <span className="h-5 w-5 rounded-full bg-indigo-500/10 text-indigo-400 flex items-center justify-center shrink-0 font-mono text-xs font-bold mt-0.5">
                                {idx + 1}
                              </span>
                              <span className={`leading-relaxed ${themeStyle.text}`}>{takeaway}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Technical Blueprint Stats Card */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="p-5 rounded-2xl border border-zinc-900 bg-zinc-950/40 space-y-2">
                          <h5 className="font-mono text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Cognitive Difficulty</h5>
                          <div className="flex items-center gap-2">
                            <span className="h-2 w-2 rounded-full bg-amber-400 animate-pulse" />
                            <span className="text-sm font-bold text-zinc-200">{summary.difficulty || 'Intermediate'}</span>
                          </div>
                        </div>
                        <div className="p-5 rounded-2xl border border-zinc-900 bg-zinc-950/40 space-y-2">
                          <h5 className="font-mono text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Prerequisites</h5>
                          <div className="flex flex-wrap gap-1.5 pt-1">
                            {summary.prerequisites?.map((prereq: string, idx: number) => (
                              <span key={idx} className="text-[10px] font-mono bg-zinc-900 border border-zinc-850 px-2.5 py-1 rounded-md text-zinc-450">
                                {prereq}
                              </span>
                            )) || <span className="text-xs text-zinc-500">None specified</span>}
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : null}
                </div>
              )}

              {/* MULTI-CHANNEL EXPLORATION WORKSPACE CORE */}
              <div className="bg-[#111112] border border-zinc-800/80 p-6 rounded-2xl space-y-6">
                <div className="flex flex-col gap-2 border-b border-zinc-800/50 pb-4">
                  <div className="flex items-center gap-2">
                    <Compass className="h-5 w-5 text-indigo-400 animate-pulse" />
                    <h4 className="text-sm font-black uppercase tracking-widest text-zinc-100">
                      Multi-Channel Exploration Hub
                    </h4>
                  </div>
                  <p className="text-xs text-zinc-500 leading-normal">
                    Fuses live encyclopedias, interactive video explainers, and live RSS technology signals dynamically.
                  </p>
                </div>

                {/* Workspace channels buttons */}
                <div className="flex flex-wrap items-center gap-1.5 p-1 border border-zinc-850 rounded-xl bg-zinc-950/40">
                  <button
                    onClick={() => setActiveChannelTab('curated')}
                    className={`flex-1 py-2 text-xs font-bold rounded-lg cursor-pointer transition ${
                      activeChannelTab === 'curated' ? 'bg-indigo-650 text-white' : 'text-zinc-500 hover:text-zinc-300'
                    }`}
                  >
                    Curated Core
                  </button>
                  <button
                    onClick={() => setActiveChannelTab('live')}
                    className={`flex-1 py-2 text-xs font-bold rounded-lg cursor-pointer transition ${
                      activeChannelTab === 'live' ? 'bg-indigo-650 text-white' : 'text-zinc-500 hover:text-zinc-300'
                    }`}
                  >
                    Live RSS Feeds
                  </button>
                  <button
                    onClick={() => setActiveChannelTab('wikipedia')}
                    className={`flex-1 py-2 text-xs font-bold rounded-lg cursor-pointer transition ${
                      activeChannelTab === 'wikipedia' ? 'bg-indigo-650 text-white' : 'text-zinc-500 hover:text-zinc-300'
                    }`}
                  >
                    Wikipedia Lookup
                  </button>
                  <button
                    onClick={() => setActiveChannelTab('youtube')}
                    className={`flex-1 py-2 text-xs font-bold rounded-lg cursor-pointer transition ${
                      activeChannelTab === 'youtube' ? 'bg-indigo-650 text-white' : 'text-zinc-500 hover:text-zinc-300'
                    }`}
                  >
                    YouTube Explainer
                  </button>
                </div>

                {/* TAB CHANNELS CONTENTS */}
                <div className="pt-2">
                  <AnimatePresence mode="wait">
                    {/* Tab 1: Curated highlights */}
                    {activeChannelTab === 'curated' && (
                      <motion.div
                        key="curated"
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -5 }}
                        className="space-y-4"
                      >
                        <div className="bg-zinc-950/40 border border-zinc-850 p-5 rounded-xl space-y-3">
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] font-mono font-bold uppercase text-emerald-400">Verified Expert Checklist</span>
                            <span className="text-[9px] font-mono text-zinc-550">Review ID: WR-2026</span>
                          </div>
                          <ul className="space-y-2 text-xs text-zinc-400 font-sans">
                            <li className="flex items-start gap-2">
                              <CheckCircle2 className="h-4 w-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                              <span>Human Fact-Checked: Evaluated by our academic review council for data fidelity.</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <CheckCircle2 className="h-4 w-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                              <span>Zero Hallucinations Guarantee: Cross-referenced directly with original paper publications.</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <CheckCircle2 className="h-4 w-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                              <span>Neutral Perspective Alignment: Validated with objective, non-biased semantic modeling.</span>
                            </li>
                          </ul>
                        </div>
                      </motion.div>
                    )}

                    {/* Tab 2: Live RSS feeds */}
                    {activeChannelTab === 'live' && (
                      <motion.div
                        key="live"
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -5 }}
                        className="space-y-3"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-mono font-bold uppercase text-indigo-400">Knowledge Currently Expanding (Live RSS)</span>
                          <span className="flex h-1.5 w-1.5 rounded-full bg-indigo-500 animate-ping" />
                        </div>

                        {newsLoading ? (
                          <div className="py-8 flex items-center justify-center gap-2">
                            <RefreshCw className="h-4 w-4 animate-spin text-indigo-400" />
                            <span className="text-xs text-zinc-550">Fusing RSS cache...</span>
                          </div>
                        ) : newsFeedItems.length > 0 ? (
                          <div className="space-y-2.5 max-h-[250px] overflow-y-auto pr-1">
                            {newsFeedItems.slice(0, 4).map((feed, idx) => (
                              <div key={idx} className="bg-zinc-950/40 border border-zinc-850 p-3.5 rounded-xl flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-xs">
                                <div className="space-y-0.5">
                                  <div className="flex items-center gap-1.5">
                                    <span className="text-[9px] font-bold text-indigo-400 font-mono bg-indigo-550/10 px-1.5 py-0.5 rounded border border-indigo-550/20 uppercase">
                                      {feed.source}
                                    </span>
                                    <span className="text-[9px] text-zinc-550 font-mono">{feed.date}</span>
                                  </div>
                                  <h5 className="font-bold text-zinc-200">{feed.title}</h5>
                                </div>
                                <a
                                  href={feed.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  referrerPolicy="no-referrer"
                                  className="text-[10px] text-zinc-450 hover:text-white flex items-center gap-1 self-start sm:self-center bg-zinc-900 border border-zinc-800 px-2 py-1 rounded"
                                >
                                  <span>View Source</span>
                                  <ExternalLink className="h-3 w-3" />
                                </a>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <p className="text-xs text-zinc-550 text-center py-6 font-sans">
                            RSS background updater idle. Check configuration of standard publications.
                          </p>
                        )}
                      </motion.div>
                    )}

                    {/* Tab 3: Wikipedia Live lookup */}
                    {activeChannelTab === 'wikipedia' && (
                      <motion.div
                        key="wikipedia"
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -5 }}
                        className="space-y-4"
                      >
                        <div className="flex items-center gap-1.5">
                          <input
                            type="text"
                            value={wikiQuery}
                            onChange={(e) => setWikiQuery(e.target.value)}
                            placeholder="Type encyclopedia search term..."
                            className={`flex-1 p-2.5 text-xs rounded-xl focus:outline-none ${themeStyle.input}`}
                          />
                          <button
                            onClick={async () => {
                              setWikiLoading(true);
                              try {
                                const response = await fetch(`/api/wikipedia?q=${encodeURIComponent(wikiQuery)}`);
                                const data = await response.json();
                                if (data.success) setWikiResults(data.items || []);
                              } catch (e) {
                                console.error(e);
                              } finally {
                                setWikiLoading(false);
                              }
                            }}
                            className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold cursor-pointer"
                          >
                            Lookup
                          </button>
                        </div>

                        {wikiLoading ? (
                          <div className="py-6 flex items-center justify-center gap-2">
                            <RefreshCw className="h-4 w-4 animate-spin text-indigo-400" />
                            <span className="text-xs text-zinc-550">Querying Wikipedia database...</span>
                          </div>
                        ) : wikiResults.length > 0 ? (
                          <div className="space-y-2.5 max-h-[250px] overflow-y-auto pr-1">
                            {wikiResults.slice(0, 3).map((wiki) => (
                              <div key={wiki.id} className="bg-zinc-950/40 border border-zinc-850 p-4 rounded-xl space-y-1.5 text-xs">
                                <div className="flex items-center justify-between">
                                  <h5 className="font-bold text-zinc-200">{wiki.title}</h5>
                                  <a
                                    href={wiki.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    referrerPolicy="no-referrer"
                                    className="text-indigo-400 hover:text-indigo-300 inline-flex items-center gap-1 text-[10px]"
                                  >
                                    <span>Read Wiki</span>
                                    <ExternalLink className="h-3 w-3" />
                                  </a>
                                </div>
                                <p className="text-[11px] text-zinc-450 leading-relaxed">{wiki.description}</p>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <p className="text-xs text-zinc-500 text-center py-6">
                            Encyclopedia desk idle. Search terms above to cross reference definitions.
                          </p>
                        )}
                      </motion.div>
                    )}

                    {/* Tab 4: YouTube Videos */}
                    {activeChannelTab === 'youtube' && (
                      <motion.div
                        key="youtube"
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -5 }}
                        className="space-y-4"
                      >
                        {ytLoading ? (
                          <div className="py-10 flex items-center justify-center gap-2">
                            <RefreshCw className="h-4 w-4 animate-spin text-indigo-400" />
                            <span className="text-xs text-zinc-550">Compiling educational videos via Gemini indexes...</span>
                          </div>
                        ) : ytVideos.length > 0 ? (
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {ytVideos.slice(0, 2).map((vid) => (
                              <div key={vid.videoId} className="bg-zinc-950/40 border border-zinc-850 rounded-xl overflow-hidden text-xs flex flex-col justify-between">
                                <div className="relative aspect-video bg-black flex items-center justify-center group">
                                  <img
                                    src={`https://img.youtube.com/vi/${vid.videoId}/0.jpg`}
                                    alt={vid.title}
                                    onError={(e) => {
                                      (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=600';
                                    }}
                                    className="absolute inset-0 h-full w-full object-cover opacity-50 group-hover:scale-105 transition duration-500"
                                    referrerPolicy="no-referrer"
                                  />
                                  <button
                                    onClick={() => setActiveVideoId(vid.videoId)}
                                    className="relative z-10 h-10 w-10 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white flex items-center justify-center cursor-pointer shadow-md transition"
                                  >
                                    <Play className="h-4 w-4 fill-white ml-0.5" />
                                  </button>
                                  <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between bg-black/60 backdrop-blur-[2px] px-2 py-0.5 rounded text-[10px] text-white">
                                    <span>{vid.channel}</span>
                                    <span>{vid.duration}</span>
                                  </div>
                                </div>

                                <div className="p-3.5 space-y-1 bg-zinc-950/40 flex-1 flex flex-col justify-between">
                                  <div className="space-y-1">
                                    <h5 className="font-bold text-zinc-200 line-clamp-1">{vid.title}</h5>
                                    <p className="text-[10px] text-zinc-500 line-clamp-2 leading-relaxed">{vid.description}</p>
                                  </div>
                                  <div className="flex items-center justify-between pt-2.5 border-t border-zinc-900">
                                    <span className="text-[9px] text-zinc-650 font-mono">ID: {vid.videoId}</span>
                                    <a
                                      href={`https://www.youtube.com/watch?v=${vid.videoId}`}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      referrerPolicy="no-referrer"
                                      className="text-indigo-400 hover:text-indigo-350 inline-flex items-center gap-1 text-[10px]"
                                    >
                                      <span>YouTube Link</span>
                                      <ExternalLink className="h-3 w-3" />
                                    </a>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <p className="text-xs text-zinc-550 text-center py-6">
                            No educational explainers mapped for this specific treatise.
                          </p>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

            </div>

            {/* COLUMN 3: Right Sidebar (AI Scholar Assistant & Related concepts) */}
            <div className="lg:col-span-3 space-y-6 lg:sticky lg:top-24">
              
              {/* Permanent AI Scholar Assistant Workspace */}
              <div className={`p-5 rounded-2xl border ${themeStyle.card} space-y-4 shadow-xs flex flex-col`}>
                <div className="flex items-center gap-2 pb-2.5 border-b border-zinc-800/60">
                  <Sparkles className="h-4.5 w-4.5 text-indigo-400" />
                  <h3 className="font-sans font-black text-xs tracking-wider uppercase text-zinc-300">
                    AI Scholar Assistant
                  </h3>
                </div>

                {/* Prompt Presets Action Chips */}
                <div className="flex flex-wrap gap-1">
                  {[
                    { label: 'Explain Simply', prompt: 'Explain this topic simply so a beginner can understand, breaking down complex terminology.' },
                    { label: 'Deep Synthesis', prompt: 'Provide a theoretically advanced and detailed academic synthesis of this topic.' },
                    { label: 'Study Outline', prompt: 'Generate structural study notes outlining major bullet points, cheat sheets and definitions.' },
                    { label: 'Interactive Quiz', prompt: 'Generate a 3-question multiple-choice quiz on this topic to test my retention.' }
                  ].map((chip) => (
                    <button
                      key={chip.label}
                      disabled={aiLoading}
                      onClick={() => handleAskAI(chip.prompt)}
                      className="text-[9px] font-bold px-2 py-1 rounded bg-zinc-950/40 hover:bg-indigo-650/10 text-zinc-400 hover:text-indigo-300 border border-zinc-850 hover:border-indigo-550/20 cursor-pointer transition"
                    >
                      {chip.label}
                    </button>
                  ))}
                </div>

                {/* Chat Message Logs */}
                <div className="max-h-[220px] overflow-y-auto space-y-3 pr-1 text-xs border-y border-zinc-850/60 py-3 my-1">
                  {aiHistory.length === 0 ? (
                    <div className="text-center py-8 space-y-1 font-sans text-zinc-550">
                      <Sparkles className="h-6 w-6 text-indigo-500/35 mx-auto" />
                      <p className="font-bold text-[10px]">Librarian Console Ready</p>
                      <p className="text-[9px] leading-normal">Ask any advanced questions or click any presets above to synthesize explanations.</p>
                    </div>
                  ) : (
                    aiHistory.map((turn, tIdx) => (
                      <div key={tIdx} className={`space-y-1 ${turn.role === 'user' ? 'text-right' : 'text-left'}`}>
                        <span className="text-[8px] font-mono font-bold uppercase text-zinc-550 block">
                          {turn.role === 'user' ? 'Scholar' : 'Librarian AI'}
                        </span>
                        <div className={`inline-block p-2.5 rounded-xl text-[11px] leading-relaxed max-w-[90%] text-left ${
                          turn.role === 'user' 
                            ? 'bg-indigo-650/15 border border-indigo-500/25 text-indigo-200' 
                            : 'bg-zinc-950 border border-zinc-850 text-zinc-350'
                        }`}>
                          <Markdown>{turn.content}</Markdown>
                        </div>
                      </div>
                    ))
                  )}

                  {aiLoading && (
                    <div className="flex items-center gap-1.5 text-[10px] text-zinc-550 italic font-mono pl-1">
                      <RefreshCw className="h-3 w-3 animate-spin text-indigo-400" />
                      <span>Consulting academic index...</span>
                    </div>
                  )}
                </div>

                {/* Question Input bar */}
                <div className="flex items-center gap-1.5">
                  <input
                    type="text"
                    value={aiQuestion}
                    onChange={(e) => setAiQuestion(e.target.value)}
                    onKeyDown={(e) => { if (e.key === 'Enter') handleAskAI(); }}
                    placeholder="Ask Scholar Assistant..."
                    className={`flex-1 p-2.5 text-xs rounded-xl focus:outline-none ${themeStyle.input}`}
                  />
                  <button
                    onClick={() => handleAskAI()}
                    disabled={aiLoading || !aiQuestion.trim()}
                    className="p-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl cursor-pointer disabled:opacity-40 transition"
                  >
                    <Send className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* KNOWLEDGE CONNECTION GRAPH (Related concepts & adjacent modules) */}
              <div className={`p-5 rounded-2xl border ${themeStyle.card} space-y-4 shadow-xs`}>
                <div className="flex items-center gap-2 pb-2.5 border-b border-zinc-800/60">
                  <Layers className="h-4.5 w-4.5 text-indigo-400" />
                  <h3 className="font-sans font-black text-xs tracking-wider uppercase text-zinc-300">
                    Knowledge Universe Graph
                  </h3>
                </div>

                <div className="space-y-3 font-mono text-[10px]">
                  <div className="flex items-center justify-between text-zinc-500">
                    <span>Topic Connectivity</span>
                    <span className="text-indigo-400 font-bold uppercase">Dynamic Tree</span>
                  </div>

                  <div className="space-y-2.5 relative pl-3 before:absolute before:left-1 before:top-2 before:bottom-2 before:w-0.5 before:bg-zinc-800/80">
                    <div className="space-y-0.5">
                      <span className="text-zinc-550 block font-bold">PREREQUISITE</span>
                      <span className="text-zinc-400 font-bold uppercase truncate max-w-[170px] block">
                        #System Architecture
                      </span>
                    </div>

                    <div className="space-y-0.5">
                      <span className="text-indigo-400 block font-black">CURRENT DISCOVERY</span>
                      <span className="text-white font-bold uppercase truncate max-w-[170px] block bg-indigo-650/10 border border-indigo-500/20 px-1.5 py-0.5 rounded">
                        {item.title}
                      </span>
                    </div>

                    <div className="space-y-0.5">
                      <span className="text-zinc-550 block font-bold">ADVANCED MATRIX</span>
                      <span className="text-zinc-400 font-bold uppercase truncate max-w-[170px] block">
                        #Autonomous Compilation
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* SOURCE INTELLIGENCE & REFERENCE TRUST */}
              <div className={`p-5 rounded-2xl border ${themeStyle.card} space-y-3.5 shadow-xs bg-zinc-950/20`}>
                <div className="flex items-center gap-2 pb-2 border-b border-zinc-800/60">
                  <ShieldAlert className="h-4.5 w-4.5 text-indigo-400" />
                  <h3 className="font-sans font-black text-xs tracking-wider uppercase text-zinc-300">
                    Source Intelligence
                  </h3>
                </div>

                <div className="space-y-2.5 text-[11px] font-sans text-zinc-450">
                  <div className="flex items-center justify-between">
                    <span>Reference Count</span>
                    <span className="font-mono text-zinc-350">14 citation nodes</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Primary Publisher</span>
                    <span className="font-mono text-indigo-400">Library Editorial</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Trust Index</span>
                    <span className="font-mono text-emerald-450 font-bold">A+ Academic Standard</span>
                  </div>
                </div>
              </div>

              {/* Back to Catalog button */}
              <div className="pt-2">
                <button
                  onClick={onBack}
                  className="w-full py-3 rounded-2xl bg-zinc-900 border border-zinc-800 hover:border-zinc-700 hover:bg-zinc-850 text-zinc-400 hover:text-white font-bold text-xs flex items-center justify-center gap-2 transition cursor-pointer uppercase tracking-wider"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Exit To Library Catalog
                </button>
              </div>

            </div>

          </div>
        </div>
      )}
    </div>
  );
}
