import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CURATED_LIBRARY, ALL_TAGS } from './data/curatedLibrary';
import { LibraryItem, FeedSource } from './types';
import ItemCard from './components/ItemCard';
import ArticleReader from './components/ArticleReader';
import SummaryModal from './components/SummaryModal';
import AiAssistantModal from './components/AiAssistantModal';
import AdSenseComplianceModal from './components/AdSenseComplianceModal';
import CompliancePage from './components/CompliancePage';
import WikipediaLookup from './components/WikipediaLookup';
import YouTubeEmbedPanel from './components/YouTubeEmbedPanel';
import CookieConsent from './components/CookieConsent';

// High fidelity redesigned modular sub-components
import HolographicGlobe from './components/HolographicGlobe';
import KnowledgeUniverseGraph from './components/KnowledgeUniverseGraph';
import LearningPaths from './components/LearningPaths';
import CompareAnalyzer from './components/CompareAnalyzer';
import ResourcesCenter from './components/ResourcesCenter';
import CommunityHub from './components/CommunityHub';
import KnowledgeProfile from './components/KnowledgeProfile';
import ScrollToTopCompanion from './components/ScrollToTopCompanion';
import MaterialLab from './components/MaterialLab';
import ToolsHub from './components/ToolsHub';
import ClaimsVerificationModal from './components/ClaimsVerificationModal';

import {
  BookOpen,
  Rss,
  Search,
  Sparkles,
  HelpCircle,
  TrendingUp,
  Cpu,
  Globe,
  Tag,
  Loader2,
  RefreshCw,
  ExternalLink,
  ChevronRight,
  Info,
  Network,
  Brain,
  Compass,
  Users,
  Award,
  Shield,
  Activity,
  Clock,
  User,
  Heart,
  List,
  Wrench
} from 'lucide-react';

interface HelmetProps {
  title: string;
  description: string;
  jsonLd?: string;
}

function Helmet({ title, description, jsonLd }: HelmetProps) {
  useEffect(() => {
    document.title = title;
    
    const updateMeta = (name: string, content: string, isProperty = false) => {
      const selector = isProperty ? `meta[property="${name}"]` : `meta[name="${name}"]`;
      let el = document.querySelector(selector);
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute(isProperty ? 'property' : 'name', name);
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    };

    updateMeta('description', description);
    updateMeta('og:title', title, true);
    updateMeta('og:description', description, true);
    updateMeta('twitter:title', title);
    updateMeta('twitter:description', description);

    // Dynamic canonical link injection
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    const baseCanonical = window.location.origin;
    let cleanPath = window.location.pathname;
    if (cleanPath === '/index.html') {
      cleanPath = '';
    }
    if (cleanPath.endsWith('/') && cleanPath.length > 1) {
      cleanPath = cleanPath.slice(0, -1);
    }
    canonical.setAttribute('href', `${baseCanonical}${cleanPath}`);

    // Dynamic JSON-LD structured data injection for crawlers and rich search results
    let script = document.querySelector('script[type="application/ld+json"]#dynamic-seo-schema');
    if (jsonLd) {
      if (!script) {
        script = document.createElement('script');
        script.setAttribute('type', 'application/ld+json');
        script.setAttribute('id', 'dynamic-seo-schema');
        document.head.appendChild(script);
      }
      script.textContent = jsonLd;
    } else if (script) {
      script.remove();
    }
  }, [title, description, jsonLd]);

  return (
    <React.Fragment>
      <title>{title}</title>
      <meta name="description" content={description} />
      {jsonLd && (
        <script id="dynamic-seo-schema" type="application/ld+json">
          {jsonLd}
        </script>
      )}
    </React.Fragment>
  );
}

// Hydration state initialization helpers
const getInitialArticleId = () => {
  if (typeof window !== 'undefined') {
    const initialData = (window as any).__INITIAL_DATA__;
    if (initialData && initialData.article) {
      return initialData.article.id;
    }
    const pathname = window.location.pathname;
    if (pathname.startsWith('/article/')) {
      return pathname.substring(9);
    }
  }
  return null;
};

const getInitialArticleItem = () => {
  if (typeof window !== 'undefined') {
    const initialData = (window as any).__INITIAL_DATA__;
    if (initialData && initialData.article) {
      return initialData.article;
    }
    const pathname = window.location.pathname;
    if (pathname.startsWith('/article/')) {
      const articleId = pathname.substring(9);
      return CURATED_LIBRARY.find(i => i.id === articleId) || null;
    }
  }
  return null;
};

export default function App() {
  // Navigation tabs
  const [activeTab, setActiveTab] = useState<'home' | 'explore' | 'materials' | 'tools' | 'paths' | 'compare' | 'resources' | 'community' | 'profile'>('home');

  // Unified Search State inside Explore tab
  const [exploreSubTab, setExploreSubTab] = useState<'curated' | 'live' | 'compiled' | 'wiki' | 'youtube'>('curated');
  const [curatedCategory, setCuratedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  // Visible curated limit state for high-performance lazy loading pagination
  const [visibleCuratedLimit, setVisibleCuratedLimit] = useState(24);

  // Reset pagination limit when filters change
  useEffect(() => {
    setVisibleCuratedLimit(24);
  }, [curatedCategory, searchQuery, selectedTag]);

  // Live Feeds State
  const [selectedLiveFeed, setSelectedLiveFeed] = useState<FeedSource>('rss');
  const [liveItems, setLiveItems] = useState<LibraryItem[]>([]);
  const [loadingLive, setLoadingLive] = useState(false);
  const [liveError, setLiveError] = useState<string | null>(null);

  // Compiled Articles State
  const [compiledArticles, setCompiledArticles] = useState<LibraryItem[]>([]);
  const [loadingCompiled, setLoadingCompiled] = useState(false);

  // Active Modals state
  const [summarizeItem, setSummarizeItem] = useState<{ item: LibraryItem; tab: 'tldr' | 'full' } | null>(null);
  const [isAiChatOpen, setIsAiChatOpen] = useState(false);
  const [aiChatInitialPrompt, setAiChatInitialPrompt] = useState<string | null>(null);
  const [isComplianceOpen, setIsComplianceOpen] = useState(false);
  const [complianceTab, setComplianceTab] = useState<'privacy' | 'terms' | 'about' | 'contact'>('about');
  
  // Claims Verification states
  const [isClaimsModalOpen, setIsClaimsModalOpen] = useState(false);
  const [claimsModalTab, setClaimsModalTab] = useState<'topics' | 'links' | 'scholars' | 'fields'>('topics');
  
  // Real URL Routing states
  const [currentCompliancePage, setCurrentCompliancePage] = useState<'privacy' | 'terms' | 'about' | 'contact' | null>(null);

  // Article Reader routing state
  const [currentArticleId, setCurrentArticleId] = useState<string | null>(getInitialArticleId);
  const [currentArticleItem, setCurrentArticleItem] = useState<LibraryItem | null>(getInitialArticleItem);

  // Global Scroll transparency for header
  const [scrolled, setScrolled] = useState(false);

  // Mobile menu open state
  const [isMobileMoreOpen, setIsMobileMoreOpen] = useState(false);

  // Helper for real reactive browser-history URL state transitions
  const navigateTo = (path: string) => {
    window.history.pushState(null, '', path);
    window.dispatchEvent(new PopStateEvent('popstate'));
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Always reset scroll on active tab switch
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [activeTab]);

  // Comprehensive path-based URL state sync engine (popstate router)
  useEffect(() => {
    const handleUrlChange = () => {
      const pathname = window.location.pathname;
      const params = new URLSearchParams(window.location.search);
      
      // Close mobile navigation drawer on any URL transit
      setIsMobileMoreOpen(false);

      // Clear secondary page state variables
      setCurrentArticleId(null);
      setCurrentArticleItem(null);
      setCurrentCompliancePage(null);
      
      if (pathname.startsWith('/article/')) {
        const articleId = pathname.substring(9);
        setCurrentArticleId(articleId);
        const found = CURATED_LIBRARY.find(i => i.id === articleId);
        if (found) {
          setCurrentArticleItem(found);
        }
      } else if (pathname.startsWith('/explore/')) {
        const sub = pathname.substring(9);
        setActiveTab('explore');
        if (['curated', 'live', 'compiled', 'wiki', 'youtube'].includes(sub)) {
          setExploreSubTab(sub as any);
        }
      } else if (pathname.startsWith('/category/')) {
        const category = decodeURIComponent(pathname.substring(10));
        setActiveTab('explore');
        setExploreSubTab('curated');
        setCuratedCategory(category);
      } else if (pathname.startsWith('/feed/')) {
        const feed = decodeURIComponent(pathname.substring(6)) as any;
        setActiveTab('explore');
        setExploreSubTab('live');
        setSelectedLiveFeed(feed);
      } else if (pathname.startsWith('/page/')) {
        const page = pathname.substring(6) as any;
        if (['about', 'privacy', 'terms', 'contact'].includes(page)) {
          setCurrentCompliancePage(page);
        }
      } else {
        // Fallback for search query parameters
        const articleId = params.get('article');
        const page = params.get('page') as any;
        const category = params.get('category');
        const feed = params.get('feed') as any;
        
        if (articleId) {
          setCurrentArticleId(articleId);
          const found = CURATED_LIBRARY.find(i => i.id === articleId);
          if (found) {
            setCurrentArticleItem(found);
          }
        } else if (page && ['about', 'privacy', 'terms', 'contact'].includes(page)) {
          setCurrentCompliancePage(page);
        } else if (category) {
          setActiveTab('explore');
          setExploreSubTab('curated');
          setCuratedCategory(category);
        } else if (feed) {
          setActiveTab('explore');
          setExploreSubTab('live');
          setSelectedLiveFeed(feed);
        } else {
          // Check standard tab route
          const tab = pathname.replace('/', '') as any;
          if (['explore', 'materials', 'paths', 'compare', 'resources', 'community', 'profile', 'tools'].includes(tab)) {
            setActiveTab(tab);
          } else {
            setActiveTab('home');
          }
        }
      }
      
      // Scroll smoothly back to top on any URL change
      window.scrollTo(0, 0);
    };

    handleUrlChange();
    window.addEventListener('popstate', handleUrlChange);
    return () => window.removeEventListener('popstate', handleUrlChange);
  }, []);

  const handleOpenSummarize = (item: LibraryItem, tab: 'tldr' | 'full' = 'tldr') => {
    if (tab === 'tldr') {
      navigateTo(`/article/${item.id}?tab=tldr`);
    } else {
      navigateTo(`/article/${item.id}`);
    }
  };

  const handleBackToLibrary = () => {
    navigateTo('/');
  };

  // Load live feed items on change
  useEffect(() => {
    if (activeTab !== 'explore' || exploreSubTab !== 'live') return;

    const fetchLiveFeed = async () => {
      setLoadingLive(true);
      setLiveError(null);
      setLiveItems([]);

      let endpoint = '/api/news-feeds';
      if (selectedLiveFeed === 'hackernews') endpoint = '/api/hackernews';
      else if (selectedLiveFeed === 'devto') endpoint = '/api/devto';
      else if (selectedLiveFeed === 'reddit') endpoint = '/api/reddit';

      try {
        const res = await fetch(endpoint);
        const data = await res.json();
        if (data.success) {
          const sorted = (data.items || []).sort((a: any, b: any) => {
            const dateA = a.date || '';
            const dateB = b.date || '';
            if (dateA !== dateB) {
              return dateB.localeCompare(dateA); // Date descending
            }
            return (b.popularity || 0) - (a.popularity || 0);
          });
          setLiveItems(sorted);
        } else {
          throw new Error(data.error || 'Failed to load feed items');
        }
      } catch (err: any) {
        console.error(err);
        setLiveError(`Failed to fetch live updates: ${err.message}. Please verify the backend container status.`);
      } finally {
        setLoadingLive(false);
      }
    };

    fetchLiveFeed();
  }, [exploreSubTab, selectedLiveFeed, activeTab]);

  // Load compiled articles on sub-tab activation
  useEffect(() => {
    if (activeTab !== 'explore' || exploreSubTab !== 'compiled') return;

    const fetchCompiledArticles = async () => {
      setLoadingCompiled(true);
      try {
        const res = await fetch('/api/compiled-articles');
        const data = await res.json();
        if (data.success) {
          const items = (data.articles || []).map((art: any) => ({
            id: art.id,
            title: art.title,
            description: art.description || 'No description provided.',
            category: art.category || 'Articles',
            source: art.source || 'Community Library',
            tags: art.tags || [],
            url: '#',
            date: art.generatedAt ? art.generatedAt.split('T')[0] : new Date().toISOString().split('T')[0],
            popularity: 150,
          }));
          // Sort compiled articles by generated date/time descending
          items.sort((a: any, b: any) => b.date.localeCompare(a.date));
          setCompiledArticles(items);
        }
      } catch (err) {
        console.error("Failed to fetch compiled articles:", err);
      } finally {
        setLoadingCompiled(false);
      }
    };

    fetchCompiledArticles();
  }, [exploreSubTab, activeTab]);

  // Filter curated library based on search query, category, and selected tag, then sort by date descending
  const filteredCurated = CURATED_LIBRARY.filter((item) => {
    const matchesCategory = curatedCategory === 'All' || item.category === curatedCategory;
    const matchesTag = !selectedTag || item.tags.includes(selectedTag);

    const matchText = `${item.title} ${item.description} ${item.source} ${item.tags.join(' ')}`.toLowerCase();
    const matchesSearch = matchText.includes(searchQuery.toLowerCase());

    return matchesCategory && matchesTag && matchesSearch;
  }).sort((a, b) => {
    const dateA = a.date || '';
    const dateB = b.date || '';
    if (dateA !== dateB) {
      return dateB.localeCompare(dateA); // Date descending (latest first)
    }
    // Secondary sort by popularity descending
    return (b.popularity || 0) - (a.popularity || 0);
  });

  const categories = ['All', 'Articles', 'News', 'Tech', 'APIs', 'Videos', 'Posts'];

  // Handle Suggested chip clicks to launch chatbot with prefilled question
  const handleSuggestedPromptClick = (prompt: string) => {
    setAiChatInitialPrompt(prompt);
    setIsAiChatOpen(true);
  };

  // Handle sphere tags or category cards selection to switch to Explore tab and pre-filter
  const handleSelectFieldCategory = (field: string) => {
    setActiveTab('explore');
    setExploreSubTab('curated');
    
    // Map human fields to curated categories if possible, or search query
    const lower = field.toLowerCase();
    if (lower.includes('tech')) {
      setCuratedCategory('Tech');
    } else if (lower.includes('science')) {
      setCuratedCategory('Articles');
      setSearchQuery('science');
    } else {
      setCuratedCategory('All');
      setSearchQuery(field);
    }
    // Scroll down to main main panels smoothly
    setTimeout(() => {
      const el = document.getElementById('main-workspace');
      el?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  // Define metadata and schema dynamically for SEO and rich snippets
  let helmetTitle = "Internet Library - Expert Curations & Technical Deep Dives";
  let helmetDescription = "Explore the Internet Library, a premier scholar-curated discovery hub for engineering, system architectures, and academic research. Syncing live feeds, deep-dives, and interactive learning paths.";
  let helmetJsonLd = "";

  if (currentArticleItem) {
    helmetTitle = `${currentArticleItem.title} - Internet Library Masterclass`;
    helmetDescription = currentArticleItem.description || helmetDescription;
    
    // Programmatic Article JSON-LD Schema
    const schema = {
      "@context": "https://schema.org",
      "@type": "NewsArticle",
      "headline": currentArticleItem.title,
      "description": currentArticleItem.description,
      "author": {
        "@type": "Person",
        "name": "Expert Editorial Board & Scholars"
      },
      "publisher": {
        "@type": "Organization",
        "name": "Internet Library Collective"
      },
      "datePublished": new Date().toISOString()
    };
    helmetJsonLd = JSON.stringify(schema);
  } else if (currentCompliancePage) {
    const cleanName = currentCompliancePage.charAt(0).toUpperCase() + currentCompliancePage.slice(1);
    helmetTitle = `${cleanName} - Compliance & E-E-A-T - Internet Library`;
    helmetDescription = `Official guidelines, legal frameworks, contact, and privacy protections for the Internet Library scholarly resource platform.`;
  } else if (activeTab === 'explore' && curatedCategory !== 'All') {
    helmetTitle = `${curatedCategory} Curation & Technical Guides - Internet Library`;
    helmetDescription = `Explore authoritative, peer-curated technical manuals, guides, and discovery resources for ${curatedCategory}.`;
  } else if (activeTab === 'explore' && exploreSubTab === 'live') {
    const feedName = selectedLiveFeed === 'devto' ? 'Dev.to Tech' : selectedLiveFeed === 'hackernews' ? 'Hacker News' : selectedLiveFeed === 'reddit' ? 'Reddit Tech' : 'Live Feeds';
    helmetTitle = `Live Updates: ${feedName} - Internet Library`;
    helmetDescription = `Real-time syndication, semantic categorization, and AI-powered reading paths for ${feedName}. Stay at the absolute cutting-edge.`;
  } else if (activeTab !== 'home') {
    const cleanTab = activeTab.charAt(0).toUpperCase() + activeTab.slice(1);
    helmetTitle = `${cleanTab} - Internet Library`;
  }

  if (currentCompliancePage) {
    return (
      <>
        <Helmet title={helmetTitle} description={helmetDescription} />
        <CompliancePage
          page={currentCompliancePage}
          onBack={handleBackToLibrary}
        />
      </>
    );
  }

  if (currentArticleId) {
    return (
      <>
        <Helmet title={helmetTitle} description={helmetDescription} jsonLd={helmetJsonLd} />
        <ArticleReader
          articleId={currentArticleId}
          initialItem={currentArticleItem}
          onBack={handleBackToLibrary}
        />
      </>
    );
  }

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-[#060907] text-[#FAF8F5] flex flex-col font-sans selection:bg-emerald-950 selection:text-emerald-200">
      <Helmet title={helmetTitle} description={helmetDescription} />
      {/* Background ambient stars particles and glows */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-[-10%] left-[-20%] w-[60%] aspect-square bg-emerald-950/20 rounded-full filter blur-[150px] opacity-75 animate-pulse" style={{ animationDuration: '10s' }} />
        <div className="absolute bottom-[-10%] right-[-20%] w-[60%] aspect-square bg-[#1B291F]/10 rounded-full filter blur-[150px] opacity-75 animate-pulse" style={{ animationDuration: '15s' }} />
      </div>

      {/* 1. FUTURISTIC GLOBAL NAVIGATION */}
      <header className={`sticky top-0 z-40 w-full transition-all duration-300 ${
        scrolled 
          ? 'border-b border-emerald-950/20 bg-[#060907]/90 backdrop-blur-md py-3' 
          : 'border-b border-transparent bg-transparent py-5'
      } px-6 md:px-12`}>
        <div className="max-w-7xl mx-auto w-full flex items-center justify-between gap-4">
          {/* Logo and holographic brand */}
          <div className="flex items-center gap-3 select-none cursor-pointer group animate-fade-in" onClick={() => navigateTo('/')}>
            <div className="relative h-10 w-10 flex items-center justify-center rounded-full bg-[#0E1310] border border-emerald-500/25 group-hover:border-emerald-400 transition-all duration-300">
              {/* Spinning orbital ring */}
              <span className="absolute inset-0.5 rounded-full border border-dashed border-emerald-400/40 animate-spin" style={{ animationDuration: '8s' }} />
              <span className="absolute h-4 w-4 rounded-full bg-gradient-to-tr from-emerald-400 via-emerald-500 to-yellow-250 animate-pulse" />
            </div>
            <div>
              <h1 className="font-display font-black text-sm tracking-widest text-white uppercase leading-none flex items-center gap-1.5">
                Internet Library
              </h1>
              <p className="hidden sm:block text-[9px] font-bold text-emerald-400 uppercase tracking-widest font-sans mt-0.5">
                Human Knowledge, Connected
              </p>
            </div>
          </div>

          {/* Cinematic Menu Items */}
          <nav className="hidden lg:flex items-center gap-1.5 bg-[#0E1310]/70 border border-[#1B281F]/30 rounded-full p-1 shadow-2xl backdrop-blur-md">
            {[
              { id: 'home', label: 'Home' },
              { id: 'explore', label: 'Explore' },
              { id: 'materials', label: 'Material Lab' },
              { id: 'tools', label: 'Tools' },
              { id: 'paths', label: 'Paths' },
              { id: 'compare', label: 'Compare' },
              { id: 'resources', label: 'Resources' },
              { id: 'community', label: 'Community' }
            ].map((tab) => {
              const active = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  id={`global-menu-${tab.id}`}
                  onClick={() => {
                    navigateTo(tab.id === 'home' ? '/' : `/${tab.id}`);
                  }}
                  className={`px-4 py-2 rounded-full text-xs font-bold tracking-wider uppercase transition-all cursor-pointer ${
                    active
                      ? 'bg-gradient-to-r from-emerald-600 via-emerald-700 to-teal-600 text-white shadow-lg shadow-emerald-500/10'
                      : 'text-zinc-400 hover:text-white hover:bg-emerald-950/30'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </nav>

          {/* Right side utilities */}
          <div className="flex items-center gap-1.5 sm:gap-3">
            {/* Ask AI Premium button */}
            <button
              id="global-ask-ai-btn"
              onClick={() => {
                setAiChatInitialPrompt(null);
                setIsAiChatOpen(true);
              }}
              className="inline-flex items-center gap-1.5 px-3 py-2 sm:px-4 rounded-full bg-gradient-to-r from-emerald-700 to-emerald-600 hover:opacity-90 text-white text-xs font-black uppercase tracking-wider shadow-lg hover:shadow-emerald-500/10 transition-all cursor-pointer"
            >
              <Sparkles className="h-3.5 w-3.5 fill-white" />
              <span className="hidden sm:inline">Ask AI</span>
            </button>

            {/* Quick Search trigger icon */}
            <button
              onClick={() => {
                navigateTo('/explore');
                setTimeout(() => {
                  const input = document.getElementById('explore-search-input');
                  input?.focus();
                }, 100);
              }}
              className="p-2 rounded-full border border-emerald-950/20 bg-[#0E1310]/80 text-zinc-400 hover:text-white hover:border-emerald-800 cursor-pointer transition"
              title="Unified search bar"
            >
              <Search className="h-4 w-4" />
            </button>

            {/* User profile avatar capsule */}
            <button
              onClick={() => activeTab === 'profile' ? navigateTo('/') : navigateTo('/profile')}
              className={`h-9 w-9 rounded-full border-2 flex items-center justify-center font-bold text-xs cursor-pointer transition-all ${
                activeTab === 'profile' ? 'border-emerald-500 ring-2 ring-emerald-500/20' : 'border-zinc-850 hover:border-zinc-700'
              }`}
              title="My Knowledge Universe Profile"
            >
              <div className="h-full w-full rounded-full bg-gradient-to-tr from-emerald-600 via-emerald-500 to-yellow-200 flex items-center justify-center text-zinc-950 font-black">
                AS
              </div>
            </button>
          </div>
        </div>
      </header>

      {/* 2. SUB-PANEL MAIN CONTENT VIEWPORTS */}
      <main className="flex-1 w-full z-10" id="main-workspace">

        {/* VIEW A: REDESIGNED CINEMATIC HOME */}
        {activeTab === 'home' && (
          <div className="space-y-16 pb-16">
            
            {/* EPIC CINEMATIC HERO SECTION */}
            <section className="max-w-7xl mx-auto px-6 md:px-12 pt-8 md:pt-16 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              
              {/* Hero Left side text & statistics */}
              <div className="lg:col-span-7 space-y-8 text-center lg:text-left">
                <div className="space-y-4">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-emerald-500/20 bg-emerald-950/20 text-sm font-mono font-black tracking-widest text-emerald-400 uppercase">
                    <span className="h-2 w-2 rounded-full bg-emerald-500 animate-ping" />
                    Global Knowledge Civilization v2.5
                  </span>
                  
                  <h2 className="font-display font-black text-4xl md:text-5xl lg:text-6xl tracking-tight text-white leading-none">
                    Explore Everything. <br />
                    <span className="bg-gradient-to-r from-emerald-400 via-[#E6C594] to-yellow-200 bg-clip-text text-transparent">
                      Understand Anything.
                    </span>
                  </h2>
                  
                  <p className="text-zinc-300 text-lg md:text-xl max-w-xl mx-auto lg:mx-0 leading-relaxed font-sans font-medium">
                    The world's most advanced AI-powered knowledge library that connects every idea, every field of science, and every technical discovery in a single fluid ecosystem.
                  </p>
                </div>

                {/* Hero CTA buttons */}
                <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4">
                  <button
                    onClick={() => {
                      setActiveTab('explore');
                      setTimeout(() => {
                        const input = document.getElementById('explore-search-input');
                        input?.focus();
                      }, 100);
                    }}
                    className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-emerald-700 via-emerald-800 to-teal-700 hover:opacity-95 text-white text-sm font-bold uppercase tracking-widest shadow-lg hover:shadow-emerald-500/10 flex items-center gap-2 cursor-pointer transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
                  >
                    <span>Start Exploring</span>
                    <ChevronRight className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => {
                      setAiChatInitialPrompt(null);
                      setIsAiChatOpen(true);
                    }}
                    className="inline-flex items-center justify-center h-12 px-6 rounded-xl border border-emerald-950/20 bg-[#0E1310]/80 text-zinc-300 hover:text-white hover:bg-emerald-950/40 text-sm font-bold uppercase tracking-widest cursor-pointer transition-all hover:scale-[1.02] active:scale-[0.98]"
                  >
                    Ask AI Anything
                  </button>
                  <button
                    onClick={() => {
                      setActiveTab('tools');
                    }}
                    className="inline-flex items-center justify-center h-12 px-6 rounded-xl border border-zinc-800 bg-[#0D0D0F]/80 text-zinc-300 hover:text-white hover:bg-zinc-900 text-sm font-bold uppercase tracking-widest cursor-pointer transition-all hover:scale-[1.02] active:scale-[0.98] gap-2 text-center"
                  >
                    <span>YouTube Transcriber ⚡</span>
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>

                {/* Core statistics tracker matching the exact design mockup */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-zinc-900/60 text-center lg:text-left max-w-xl mx-auto lg:mx-0">
                  {[
                    { value: '2.4M+', label: 'Topics Indexed', tab: 'topics' as const },
                    { value: '18.7M+', label: 'Stellar links', tab: 'links' as const },
                    { value: '92K+', label: 'Peer scholars', tab: 'scholars' as const },
                    { value: '100+', label: 'Active Fields', tab: 'fields' as const }
                  ].map((stat) => (
                    <button
                      key={stat.label}
                      onClick={() => {
                        setClaimsModalTab(stat.tab);
                        setIsClaimsModalOpen(true);
                      }}
                      className="group flex flex-col items-center lg:items-start text-center lg:text-left space-y-0.5 p-2 rounded-xl border border-transparent hover:border-emerald-950/40 hover:bg-[#0E1310]/60 hover:shadow-xl hover:scale-[1.03] transition-all cursor-pointer"
                      title={`Verify live ledger for ${stat.label}`}
                    >
                      <span className="text-xl md:text-2xl font-black text-white font-display leading-none group-hover:text-emerald-400 transition-colors">
                        {stat.value}
                      </span>
                      <span className="text-[10px] font-mono font-bold text-zinc-400 uppercase tracking-wider group-hover:text-zinc-200 transition-colors leading-tight">
                        {stat.label}
                      </span>
                      <span className="text-[8px] font-mono text-emerald-400/80 uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
                        verify index ↗
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Hero Right side: Spectacular 3D Interactive Globe */}
              <div className="lg:col-span-5 flex items-center justify-center">
                <HolographicGlobe onSelectCategory={handleSelectFieldCategory} />
              </div>

            </section>

            {/* FUTURISTIC GLASS AI SEARCH INTERFACE */}
            <section className="max-w-7xl mx-auto px-6 md:px-12">
              <div className="max-w-4xl mx-auto bg-gradient-to-r from-[#0E1310]/95 to-[#121A16]/90 border border-emerald-950/35 p-6 md:p-8 rounded-3xl shadow-2xl relative overflow-hidden space-y-4">
                
                <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-emerald-500/20 to-transparent" />
                
                <p className="text-xs font-mono font-black text-emerald-400 uppercase tracking-widest text-center">
                  Secure Intelligence Search Console
                </p>

                {/* Styled Search Bar */}
                <div className="relative">
                  <input
                    id="home-search-bar"
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && searchQuery.trim()) {
                        setActiveTab('explore');
                        setExploreSubTab('curated');
                      }
                    }}
                    placeholder="Search anything... topics, concepts, skills, resources..."
                    className="w-full pl-12 pr-32 py-4 rounded-2xl border border-emerald-950/40 bg-[#060907]/90 text-base focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/10 text-white placeholder-zinc-500 transition-all font-sans"
                  />
                  <Search className="absolute left-4.5 top-4.5 h-5 w-5 text-zinc-500" />
                  
                  <button
                    onClick={() => {
                      if (searchQuery.trim()) {
                        setActiveTab('explore');
                        setExploreSubTab('curated');
                      }
                    }}
                    className="absolute right-2.5 top-2.5 px-4 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white text-sm font-bold uppercase tracking-wider transition cursor-pointer"
                  >
                    AI Search
                  </button>
                </div>

                {/* Suggested prompt chips below bar */}
                <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
                  <span className="text-sm font-mono font-bold text-zinc-400 uppercase tracking-wider mr-1">Suggested inquiries:</span>
                  {[
                    'What is Quantum Computing?',
                    'How does Blockchain work?',
                    'Explain Photosynthesis',
                    'Best AI tools 2025'
                  ].map((chip) => (
                    <button
                      key={chip}
                      onClick={() => handleSuggestedPromptClick(chip)}
                      className="px-3.5 py-1.5 rounded-lg border border-emerald-950/30 bg-[#0E1310]/80 text-sm font-sans font-bold text-zinc-200 hover:text-white hover:border-emerald-800 transition cursor-pointer"
                    >
                      {chip}
                    </button>
                  ))}
                </div>

              </div>
            </section>



            {/* KNOWLEDGE DIMENSIONS GRID */}
            <section className="max-w-7xl mx-auto px-6 md:px-12 space-y-6">
              <div className="flex items-end justify-between border-b border-emerald-950/20 pb-3">
                <div className="space-y-1">
                  <span className="text-sm font-mono font-bold text-zinc-400 uppercase tracking-widest">Axiom Sectors</span>
                  <h3 className="text-2xl md:text-3xl font-black text-white tracking-tight">Explore by Dimension</h3>
                </div>
                <button
                  onClick={() => handleSelectFieldCategory('')}
                  className="text-sm font-mono font-bold text-emerald-400 hover:text-emerald-350 uppercase tracking-wider cursor-pointer"
                >
                  View All Dimensions
                </button>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
                {[
                  { label: 'Technology', count: '1,000+ SEO Articles', color: 'from-emerald-500/20 via-emerald-800/10 to-transparent', image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=400&h=500&q=80' },
                  { label: 'Science', count: '1,000+ SEO Articles', color: 'from-teal-500/20 via-emerald-800/10 to-transparent', image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=400&h=500&q=80' },
                  { label: 'Business', count: '1,000+ SEO Articles', color: 'from-amber-500/20 via-orange-850/10 to-transparent', image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=400&h=500&q=80' },
                  { label: 'Health', count: '1,000+ SEO Articles', color: 'from-emerald-400/20 via-teal-800/10 to-transparent', image: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=400&h=500&q=80' },
                  { label: 'Arts & Culture', count: '1,000+ SEO Articles', color: 'from-orange-500/20 via-rose-800/10 to-transparent', image: 'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?auto=format&fit=crop&w=400&h=500&q=80' },
                  { label: 'History', count: '1,000+ SEO Articles', color: 'from-yellow-500/20 via-[#C5A880]/10 to-transparent', image: 'https://images.unsplash.com/photo-1447069387593-a5de0862481e?auto=format&fit=crop&w=400&h=500&q=80' },
                  { label: 'More Fields', count: '1,000+ SEO Articles', color: 'from-zinc-500/20 via-zinc-800/10 to-transparent', image: 'https://images.unsplash.com/photo-1506318137071-a8e063b4bec0?auto=format&fit=crop&w=400&h=500&q=80' }
                ].map((dim) => {
                  return (
                    <button
                      key={dim.label}
                      onClick={() => handleSelectFieldCategory(dim.label)}
                      className="p-4 rounded-2xl border border-emerald-950/20 bg-[#0E1310]/20 hover:border-emerald-500/30 transition-all duration-300 flex flex-col justify-between text-left group cursor-pointer relative overflow-hidden aspect-[4/5] hover:scale-[1.02]"
                    >
                      {/* Image background with zoom on hover */}
                      <div className="absolute inset-0 z-0 overflow-hidden">
                        <img 
                          src={dim.image} 
                          alt={dim.label}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover opacity-45 group-hover:opacity-70 group-hover:scale-110 transition-all duration-500 filter brightness-[0.85] contrast-[1.1]"
                        />
                        <div className={`absolute inset-0 bg-gradient-to-b ${dim.color} mix-blend-multiply opacity-50`} />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#060907] via-[#060907]/20 to-transparent opacity-90" />
                      </div>
                      
                      <div className="relative z-10 space-y-1.5">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 inline-block" />
                        <h4 className="text-base font-black text-white uppercase tracking-wider group-hover:text-emerald-300 transition-colors">
                          {dim.label}
                        </h4>
                      </div>

                      <div className="relative z-10 pt-4 mt-auto">
                        <p className="text-xs font-mono font-bold text-zinc-200 leading-none">{dim.count}</p>
                        <span className="text-xs font-mono font-black text-emerald-300 uppercase tracking-widest mt-2 block opacity-0 group-hover:opacity-100 transition">
                          Access Portal
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </section>

            {/* TRENDING NOW: KNOWLEDGE EXPANDING CAROUSEL */}
            <section className="max-w-7xl mx-auto px-6 md:px-12 space-y-6">
              <div className="flex items-end justify-between border-b border-zinc-900 pb-3">
                <div className="space-y-1">
                  <span className="text-sm font-mono font-bold text-zinc-400 uppercase tracking-widest">Active Discoveries</span>
                  <h3 className="text-2xl md:text-3xl font-black text-white tracking-tight">Trending Now</h3>
                </div>
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
                  <span className="text-sm font-mono font-bold text-zinc-400 uppercase tracking-wider">Live Global Synclink</span>
                </div>
              </div>

              {/* Horizontal scroll cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                {[
                  { id: 'art-10', title: 'Claude 4 AI Model Breakthrough', category: 'Technology', label: 'HOT', learners: '2.4K', summary: 'Architectural analysis tracking neural pathways, sparse attention mechanisms, and sub-quadratic execution pipelines.' },
                  { id: 'art-11', title: 'Quantum Internet Explained', category: 'Science', label: 'NEW', learners: '1.8K', summary: 'Tracing entangled photons across standard fiber nodes for instantaneous cryptographically secured data frames.' },
                  { id: 'art-12', title: 'AI in Business 2025 Report', category: 'Business', label: 'TRENDING', learners: '3.2K', summary: 'Global analysis tracing transformer agency, business process automation maps, and local database synchronizations.' },
                  { id: 'art-13', title: 'Longevity Research Breakthrough', category: 'Health', label: 'RISING', learners: '1.2K', summary: 'Fleshing out enzyme synthesis equations that protect cellular chromatin matrices and slow decay limits.' },
                  { id: 'art-14', title: 'Lost Civilizations Revealed', category: 'History', label: 'VIRAL', learners: '2.1K', summary: 'Using satellite lidar diagnostics to chart massive Bronze Age megalopolis networks under rain forest canopies.' },
                ].map((tc) => {
                  return (
                    <div
                      key={tc.id}
                      onClick={() => handleOpenSummarize({
                        id: tc.id,
                        title: tc.title,
                        category: 'Articles',
                        description: tc.summary,
                        url: '#',
                        source: 'Global Publications',
                        tags: [tc.category.toLowerCase()],
                        date: '2026-07-11',
                        popularity: 980
                      }, 'full')}
                      className="bg-[#0E1310]/45 border border-emerald-950/25 rounded-2xl p-5 hover:border-emerald-500/30 transition-all duration-300 flex flex-col justify-between text-left group cursor-pointer relative overflow-hidden"
                    >
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-widest">
                            {tc.category}
                          </span>
                          <span className="text-[11px] font-mono font-black px-2 py-0.5 rounded bg-emerald-700 text-white tracking-widest uppercase">
                            {tc.label}
                          </span>
                        </div>

                        <div className="space-y-1">
                          <h4 className="text-base font-black text-white tracking-tight leading-snug group-hover:text-emerald-300 transition-colors">
                            {tc.title}
                          </h4>
                          <p className="text-sm text-zinc-300 leading-relaxed line-clamp-3">{tc.summary}</p>
                        </div>
                      </div>

                      <div className="pt-4 border-t border-zinc-900/60 mt-4 flex items-center justify-between text-xs text-zinc-300 font-mono font-bold">
                        <span>{tc.learners} learners active</span>
                        <ChevronRight className="h-3 w-3 text-zinc-400 group-hover:text-white transition" />
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>

            {/* SIGNATURE FEATURE: KNOWLEDGE UNIVERSE GALAXY GRAPH */}
            <section className="max-w-7xl mx-auto px-6 md:px-12 space-y-6">
              <div className="space-y-1">
                <span className="text-sm font-mono font-bold text-zinc-400 uppercase tracking-widest">The Celestial Matrix</span>
                <h3 className="text-2xl md:text-3xl font-black text-white tracking-tight">Interactive Knowledge Universe</h3>
              </div>
              
              <KnowledgeUniverseGraph onOpenArticle={(id) => {
                let item = CURATED_LIBRARY.find(i => i.id === id);
                if (!item) {
                  // Resilient fallback mechanism: if an item with this ID isn't found, build one dynamically.
                  // This is extremely robust and ensures that clicking on the graph nodes will always open a beautiful article.
                  item = {
                    id: id,
                    title: id.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase()),
                    description: "Holographic deep-dive research into the matrix foundations of computer science.",
                    category: 'Articles',
                    url: "https://ai.google.com/",
                    source: 'AI Network',
                    tags: ['technology', 'neural-networks'],
                    date: '2026-07-12',
                    popularity: 850
                  };
                }
                handleOpenSummarize(item, 'full');
              }} />
            </section>

            {/* PERSONALIZED PATH CTA HERO BANNER */}
            <section className="max-w-7xl mx-auto px-6 md:px-12">
              <div className="bg-gradient-to-br from-emerald-950/30 via-emerald-950/15 to-[#0E1310] border border-emerald-500/10 rounded-3xl p-6 md:p-10 relative overflow-hidden flex flex-col lg:flex-row lg:items-center justify-between gap-8">
                
                {/* Background flare */}
                <div className="absolute top-[-50%] right-[-20%] w-[50%] aspect-square bg-emerald-500/10 rounded-full filter blur-[100px] pointer-events-none" />

                <div className="space-y-4 max-w-2xl relative z-10">
                  <span className="inline-flex items-center gap-1 text-[9px] font-mono font-black text-emerald-400 uppercase tracking-widest">
                    <Sparkles className="h-3.5 w-3.5 fill-emerald-400/25" /> Custom AI Curriculum
                  </span>
                  
                  <h3 className="text-2xl md:text-3xl font-black text-white tracking-tight leading-none">
                    Personalized Technical Journeys
                  </h3>
                  
                  <p className="text-zinc-400 text-xs md:text-sm leading-relaxed">
                    Let our neural network parse your current background level and target competencies to construct a custom study path with planetary progress indicators.
                  </p>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-2 text-[10px] font-mono font-bold text-zinc-400 uppercase">
                    <div className="flex items-center gap-1.5">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                      <span>Smart Recs</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                      <span>Adaptive Paths</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                      <span>Progress tracker</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                      <span>Expert guidance</span>
                    </div>
                  </div>
                </div>

                <div className="shrink-0 relative z-10">
                  <button
                    onClick={() => setActiveTab('paths')}
                    className="px-6 py-3.5 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white text-xs font-bold uppercase tracking-widest shadow-lg hover:shadow-emerald-500/20 transition cursor-pointer"
                  >
                    Create Your Path
                  </button>
                </div>

              </div>
            </section>

          </div>
        )}

        {/* VIEW B: INTEGRATED EXPLORE / CORE KNOWLEDGE ENGINE */}
        {activeTab === 'explore' && (
          <div className="max-w-7xl mx-auto px-6 md:px-12 py-6 space-y-8 pb-16">
            
            {/* Exploration hub header */}
            <div className="max-w-2xl">
              <span className="text-[10px] font-mono font-bold tracking-widest text-emerald-400 uppercase">Unified Knowledge Engine</span>
              <h2 className="text-3xl font-black text-white tracking-tight mt-1">Multi-Channel Exploration</h2>
              <p className="text-zinc-400 text-xs md:text-sm mt-2 leading-relaxed">
                Connect directly to high-volume databases. Sift through <strong>Curated Core Library Modules</strong>, fetch <strong>Live RSS Tech feeds</strong>, run <strong>Wikipedia encyclopedic queries</strong>, or stream <strong>YouTube Educational video indexes</strong>.
              </p>
            </div>

            {/* Central Mainframe Navigation Selector */}
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-emerald-950/20 pb-3">
              <div className="flex flex-wrap gap-1.5">
                {[
                  { id: 'curated', label: 'Curated Index', icon: BookOpen },
                  { id: 'live', label: 'Live Feeds', icon: Rss },
                  { id: 'compiled', label: 'Compiled Archives', icon: Sparkles },
                  { id: 'wiki', label: 'Wikipedia Lookup', icon: Globe },
                  { id: 'youtube', label: 'YouTube Tutorials', icon: Cpu }
                ].map((subTab) => {
                  const Icon = subTab.icon;
                  const active = exploreSubTab === subTab.id;
                  return (
                    <button
                      key={subTab.id}
                      onClick={() => setExploreSubTab(subTab.id as any)}
                      className={`inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold tracking-wider uppercase transition cursor-pointer ${
                        active
                          ? 'bg-emerald-700 text-white font-black shadow-md'
                          : 'text-zinc-400 hover:text-white hover:bg-emerald-950/30'
                      }`}
                    >
                      <Icon className="h-3.5 w-3.5" />
                      <span>{subTab.label}</span>
                    </button>
                  );
                })}
              </div>

              <div className="text-[10px] font-mono text-zinc-500">
                Mainframe Online • Sync active
              </div>
            </div>

            {/* CONDITIONAL EXPLORE PANELS */}

            {/* PAN A: CURATED INDEX DATABASE */}
            {exploreSubTab === 'curated' && (
              <div className="space-y-6">
                {/* Search query input */}
                <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between">
                  <div className="relative flex-1 max-w-md">
                    <input
                      id="explore-search-input"
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search curated index by title, tags, or concepts..."
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-emerald-950/40 text-xs focus:outline-none focus:border-emerald-500 transition font-sans bg-[#0E1310]/80 text-zinc-100 placeholder-zinc-500"
                    />
                    <Search className="absolute left-3.5 top-3.5 h-4 w-4 text-zinc-500" />
                  </div>

                  {/* Category Filter selectors */}
                  <div className="flex flex-wrap gap-1 items-center">
                    {categories.map((cat) => (
                      <button
                        key={cat}
                        onClick={() => setCuratedCategory(cat)}
                        className={`px-3 py-1.5 rounded-lg text-[10px] font-mono font-bold uppercase border transition cursor-pointer ${
                          curatedCategory === cat
                            ? 'bg-emerald-700 text-white border-emerald-750'
                            : 'bg-[#0E1310]/80 text-zinc-400 border-emerald-950/25 hover:bg-emerald-950/40 hover:text-white'
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Tags Filter line */}
                <div className="flex flex-wrap items-center gap-1.5 pb-2 border-b border-emerald-950/15">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-zinc-500 mr-2 flex items-center gap-1">
                    <Tag className="h-3.5 w-3.5" /> Hot-tags:
                  </span>
                  <button
                    onClick={() => setSelectedTag(null)}
                    className={`px-2 py-1 rounded text-[10px] font-mono font-semibold border transition cursor-pointer ${
                      !selectedTag ? 'bg-emerald-500/15 text-emerald-300 border-emerald-500/25' : 'bg-emerald-950/15 text-zinc-400 border-emerald-950/25 hover:text-white'
                    }`}
                  >
                    All Tags
                  </button>
                  {ALL_TAGS.slice(0, 16).map((tag) => (
                    <button
                      key={tag}
                      onClick={() => setSelectedTag(tag)}
                      className={`px-2 py-1 rounded text-[10px] font-mono font-semibold border transition cursor-pointer ${
                        selectedTag === tag ? 'bg-emerald-500/15 text-emerald-300 border-emerald-500/25 font-bold' : 'bg-[#0E1310]/20 text-zinc-400 border-emerald-950/20 hover:text-white'
                      }`}
                    >
                      #{tag}
                    </button>
                  ))}
                </div>

                {/* Catalog Grid */}
                {filteredCurated.length > 0 ? (
                  <div className="space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {filteredCurated.slice(0, visibleCuratedLimit).map((item, index) => (
                        <ItemCard
                          key={item.id}
                          item={item}
                          onSummarize={handleOpenSummarize}
                          index={index}
                        />
                      ))}
                    </div>

                    {filteredCurated.length > visibleCuratedLimit && (
                      <div className="flex justify-center pt-4">
                        <button
                          onClick={() => setVisibleCuratedLimit((prev) => prev + 24)}
                          className="px-6 py-3 rounded-xl bg-zinc-950 border border-zinc-900 text-xs font-mono font-bold text-zinc-300 hover:border-indigo-500/40 hover:text-white transition cursor-pointer flex items-center gap-2"
                        >
                          Load More Articles (showing {Math.min(visibleCuratedLimit, filteredCurated.length)} of {filteredCurated.length})
                        </button>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="py-24 border border-zinc-900 rounded-2xl text-center space-y-3 bg-[#0c0c0e]/40">
                    <BookOpen className="h-10 w-10 text-zinc-600 mx-auto" />
                    <p className="text-xs font-bold text-zinc-300 uppercase">No nodes found matching filters</p>
                    <p className="text-[11px] text-zinc-500 max-w-xs mx-auto leading-normal">
                      Try altering your search keywords or select "All Tags" to reset core filters.
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* PAN B: LIVE RSS FEEDS */}
            {exploreSubTab === 'live' && (
              <div className="space-y-6">
                <div className="flex items-start gap-2.5 rounded-xl bg-indigo-950/15 border border-indigo-500/10 p-4 text-[11px] text-zinc-400 leading-relaxed max-w-2xl">
                  <Info className="h-4 w-4 text-indigo-400 shrink-0 mt-0.5" />
                  <p>
                    This console triggers backend API pipelines to query <strong>Hacker News</strong>, <strong>DEV.to</strong>, <strong>Reddit /r/technology</strong>, and major <strong>RSS feeds</strong>, bypass-cors directly.
                  </p>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-4 border-b border-zinc-900 pb-3">
                  <div className="flex gap-1">
                    {[
                      { id: 'rss', label: 'TechCrunch & BBC (RSS)', icon: Rss },
                      { id: 'hackernews', label: 'Hacker News Live', icon: TrendingUp },
                      { id: 'devto', label: 'DEV.to Articles', icon: Cpu },
                      { id: 'reddit', label: 'Reddit /r/technology', icon: Globe }
                    ].map((feed) => {
                      const Icon = feed.icon;
                      return (
                        <button
                          key={feed.id}
                          onClick={() => setSelectedLiveFeed(feed.id as any)}
                          className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-[10px] font-mono font-bold uppercase transition border cursor-pointer ${
                            selectedLiveFeed === feed.id
                              ? 'bg-indigo-600 text-white border-indigo-600 shadow-md'
                              : 'bg-zinc-950/60 text-zinc-400 border-zinc-900 hover:text-white'
                          }`}
                        >
                          <Icon className="h-3.5 w-3.5" />
                          <span>{feed.label}</span>
                        </button>
                      );
                    })}
                  </div>

                  <button
                    onClick={() => setSelectedLiveFeed(prev => prev)}
                    disabled={loadingLive}
                    className="p-2 rounded-lg bg-[#0D0D0F] hover:bg-zinc-900 border border-zinc-900 text-zinc-400 hover:text-white cursor-pointer"
                    title="Reload live feeds"
                  >
                    <RefreshCw className={`h-4 w-4 ${loadingLive ? 'animate-spin' : ''}`} />
                  </button>
                </div>

                {loadingLive ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {Array.from({ length: 6 }).map((_, idx) => (
                      <div key={idx} className="bg-zinc-950/20 p-5 rounded-2xl border border-zinc-900 animate-pulse space-y-4">
                        <div className="flex justify-between items-center">
                          <div className="h-4 w-20 bg-zinc-800 rounded-full" />
                          <div className="h-3 w-10 bg-zinc-800 rounded" />
                        </div>
                        <div className="space-y-2">
                          <div className="h-5 w-full bg-zinc-800/80 rounded" />
                          <div className="h-4 w-3/4 bg-zinc-800/80 rounded" />
                        </div>
                        <div className="h-16 w-full bg-zinc-900/60 rounded-xl" />
                      </div>
                    ))}
                  </div>
                ) : liveError ? (
                  <div className="rounded-xl border border-indigo-500/10 bg-[#0C0C0E] p-6 text-center space-y-3 max-w-lg mx-auto">
                    <p className="text-xs font-semibold text-zinc-400 leading-normal">{liveError}</p>
                    <button
                      onClick={() => setSelectedLiveFeed('rss')}
                      className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-[10px] font-bold uppercase transition cursor-pointer"
                    >
                      Retry Link
                    </button>
                  </div>
                ) : liveItems.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {liveItems.map((item, index) => (
                      <ItemCard
                        key={item.id}
                        item={item}
                        onSummarize={handleOpenSummarize}
                        index={index}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="py-24 text-center space-y-2 bg-zinc-950/40 border border-zinc-900 rounded-2xl">
                    <Rss className="h-10 w-10 text-zinc-600 mx-auto" />
                    <p className="text-xs font-bold text-zinc-300 uppercase">No live feeds loaded</p>
                    <p className="text-[10px] text-zinc-500">Hit the refresh icon to query live channels.</p>
                  </div>
                )}
              </div>
            )}

            {/* PAN E: COMPILED ARCHIVES */}
            {exploreSubTab === 'compiled' && (
              <div className="space-y-6">
                <div className="flex items-start gap-2.5 rounded-xl bg-indigo-950/15 border border-indigo-500/10 p-4 text-[11px] text-zinc-400 leading-relaxed max-w-2xl">
                  <Sparkles className="h-4 w-4 text-indigo-400 shrink-0 mt-0.5" />
                  <p>
                    These are masterclass-level study manuals and technical guides dynamically compiled on-demand using Google Gemini by scholars of our global research collective. Once generated, they remain permanent and accessible to all users forever.
                  </p>
                </div>

                {loadingCompiled ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {Array.from({ length: 6 }).map((_, idx) => (
                      <div key={idx} className="bg-zinc-950/20 p-5 rounded-2xl border border-zinc-900 animate-pulse space-y-4">
                        <div className="flex justify-between items-center">
                          <div className="h-4 w-20 bg-zinc-800 rounded-full" />
                          <div className="h-3 w-10 bg-zinc-800 rounded" />
                        </div>
                        <div className="space-y-2">
                          <div className="h-5 w-full bg-zinc-800/80 rounded" />
                          <div className="h-4 w-3/4 bg-zinc-800/80 rounded" />
                        </div>
                        <div className="h-16 w-full bg-zinc-900/60 rounded-xl" />
                      </div>
                    ))}
                  </div>
                ) : compiledArticles.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {compiledArticles.map((item, index) => (
                      <ItemCard
                        key={item.id}
                        item={item}
                        onSummarize={handleOpenSummarize}
                        index={index}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="py-24 text-center space-y-2 bg-zinc-950/40 border border-zinc-900 rounded-2xl">
                    <BookOpen className="h-10 w-10 text-zinc-600 mx-auto" />
                    <p className="text-xs font-bold text-zinc-300 uppercase">No compiled articles yet</p>
                    <p className="text-[10px] text-zinc-500">
                      Explore the live feeds or look up topics on Wikipedia, then click "Read Article" to start compiling the permanent archives.
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* PAN C: WIKIPEDIA RESEARCH PORTAL */}
            {exploreSubTab === 'wiki' && (
              <div className="space-y-6">
                <WikipediaLookup />
              </div>
            )}

            {/* PAN D: YOUTUBE EDUCATION SEARCH */}
            {exploreSubTab === 'youtube' && (
              <div className="space-y-6">
                <YouTubeEmbedPanel />
              </div>
            )}

          </div>
        )}

        {/* VIEW H: MATERIAL LAB (OPENAI SHOWCASE STYLE) */}
        {activeTab === 'materials' && (
          <div className="pb-16 animate-fade-in">
            <MaterialLab onOpenAiAssistant={handleSuggestedPromptClick} />
          </div>
        )}

        {/* VIEW TOOLS: INTERACTIVE UTILITY FORGE */}
        {activeTab === 'tools' && (
          <div className="pb-16 animate-fade-in">
            <ToolsHub />
          </div>
        )}

        {/* VIEW C: GAMIFIED LEARNING PLANETS */}
        {activeTab === 'paths' && (
          <div className="max-w-7xl mx-auto px-6 md:px-12 py-6 pb-16">
            <LearningPaths />
          </div>
        )}

        {/* VIEW D: COMPARATIVE ANALYZER */}
        {activeTab === 'compare' && (
          <div className="max-w-7xl mx-auto px-6 md:px-12 py-6 pb-16">
            <CompareAnalyzer />
          </div>
        )}

        {/* VIEW E: RESOURCES CATALOG */}
        {activeTab === 'resources' && (
          <div className="max-w-7xl mx-auto px-6 md:px-12 py-6 pb-16">
            <ResourcesCenter />
          </div>
        )}

        {/* VIEW F: RESEARCH COMMUNITY NETWORK */}
        {activeTab === 'community' && (
          <div className="max-w-7xl mx-auto px-6 md:px-12 py-6 pb-16">
            <CommunityHub />
          </div>
        )}

        {/* VIEW G: MY KNOWLEDGE UNIVERSE PROFILE */}
        {activeTab === 'profile' && (
          <div className="max-w-7xl mx-auto px-6 md:px-12 py-6 pb-16">
            <KnowledgeProfile />
          </div>
        )}

      </main>

      {/* 3. CORE ADAPTIVE COMPLIANCE MODALS & DRAWERS */}

      {/* TLDR Quick Summary Modal */}
      <SummaryModal
        item={summarizeItem ? summarizeItem.item : null}
        initialTab={summarizeItem ? summarizeItem.tab : 'tldr'}
        onClose={() => setSummarizeItem(null)}
        onOpenFullArticle={(item) => handleOpenSummarize(item, 'full')}
      />

      {/* Floating full-screen AI Assistant companion panel */}
      <AiAssistantModal
        isOpen={isAiChatOpen}
        onClose={() => {
          setIsAiChatOpen(false);
          setAiChatInitialPrompt(null);
        }}
        initialPrompt={aiChatInitialPrompt}
      />

      {/* Editorial and E-E-A-T compliance policies */}
      <AdSenseComplianceModal
        isOpen={isComplianceOpen}
        onClose={() => setIsComplianceOpen(false)}
        initialTab={complianceTab}
      />

      {/* Dynamic Claims Verification & Index ledger */}
      <ClaimsVerificationModal
        isOpen={isClaimsModalOpen}
        onClose={() => setIsClaimsModalOpen(false)}
        initialTab={claimsModalTab}
      />

      {/* 4. PREMIUM COMPRESSED FOOTER */}
      <footer className="border-t border-zinc-900 bg-[#020203] pt-12 pb-32 lg:pb-12 text-zinc-500 z-10 relative">
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-8">
          
          <div className="flex flex-col gap-1 text-center md:text-left">
            <div className="flex items-center gap-2 justify-center md:justify-start">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse"></span>
              <p className="text-xs font-sans font-black uppercase tracking-widest text-zinc-400">
                Internet Library Publications
              </p>
            </div>
            <p className="text-[11px] font-mono text-zinc-500 mt-1">
              © 2026 Curation &amp; Discovery Hub. Designed for the Future of Human Knowledge. All rights reserved.
            </p>
          </div>

          {/* AdSense compliance navigation links */}
          <div className="flex flex-wrap gap-x-6 gap-y-2 justify-center text-xs font-sans font-bold uppercase tracking-wider text-zinc-400">
            <button
              onClick={() => navigateTo('/page/about')}
              className="hover:text-indigo-400 transition-colors cursor-pointer"
            >
              About &amp; E-E-A-T Editorial
            </button>
            <button
              onClick={() => navigateTo('/page/privacy')}
              className="hover:text-indigo-400 transition-colors cursor-pointer"
            >
              Privacy Policy
            </button>
            <button
              onClick={() => navigateTo('/page/terms')}
              className="hover:text-indigo-400 transition-colors cursor-pointer"
            >
              Terms of Service
            </button>
            <button
              onClick={() => navigateTo('/page/contact')}
              className="hover:text-indigo-400 transition-colors cursor-pointer"
            >
              Editorial Feedback
            </button>
          </div>

          {/* External feeds indexes mapping */}
          <div className="flex gap-3 text-xs font-mono">
            <a href="/sitemap.xml" target="_blank" className="text-zinc-600 hover:text-emerald-400 transition-colors border border-zinc-900 px-2 py-1 rounded bg-[#0A0E17]">XML Sitemap</a>
            <a href="/rss.xml" target="_blank" className="text-zinc-600 hover:text-amber-500 transition-colors border border-zinc-900 px-2 py-1 rounded bg-[#0A0E17]">RSS News Feed</a>
          </div>

        </div>
      </footer>

      {/* GDPR & CCPA Compliant AdSense Consent Banner */}
      <CookieConsent />

      {/* 5. GORGEOUS FLOATING MOBILE BOTTOM NAVIGATION DOCK */}
      <div className="lg:hidden fixed bottom-4 left-4 right-4 z-40 bg-[#0A0E17]/90 backdrop-blur-xl border border-zinc-800/60 rounded-2xl py-2 px-4 shadow-[0_10px_30px_rgba(0,0,0,0.85)] flex items-center justify-around pointer-events-auto">
        {[
          { id: 'home', label: 'Home', icon: Compass, path: '/' },
          { id: 'explore', label: 'Explore', icon: BookOpen, path: '/explore' },
          { id: 'materials', label: 'Lab', icon: Cpu, path: '/materials' },
          { id: 'paths', label: 'Paths', icon: Brain, path: '/paths' },
        ].map((tab) => {
          const active = activeTab === tab.id && !currentArticleId && !currentCompliancePage;
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => navigateTo(tab.path)}
              className={`flex flex-col items-center justify-center gap-1 p-2 rounded-xl transition-all cursor-pointer ${
                active 
                  ? 'text-teal-400 font-bold scale-105' 
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              <Icon className={`h-5 w-5 ${active ? 'text-teal-400' : 'text-zinc-400'}`} />
              <span className="text-[10px] tracking-wide uppercase font-black">{tab.label}</span>
            </button>
          );
        })}
        {/* More Tab Trigger */}
        <button
          onClick={() => setIsMobileMoreOpen(true)}
          className={`flex flex-col items-center justify-center gap-1 p-2 rounded-xl transition-all cursor-pointer ${
            isMobileMoreOpen 
              ? 'text-teal-400 font-bold scale-105' 
              : 'text-zinc-400 hover:text-zinc-200'
          }`}
        >
          <List className={`h-5 w-5 ${isMobileMoreOpen ? 'text-teal-400' : 'text-zinc-400'}`} />
          <span className="text-[10px] tracking-wide uppercase font-black">More</span>
        </button>
      </div>

      {/* 6. SLIDE-UP GLASSMORPHIC MOBILE OVERLAY DRAWER */}
      <AnimatePresence>
        {isMobileMoreOpen && (
          <>
            {/* Backdrop filter blur */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMoreOpen(false)}
              className="lg:hidden fixed inset-0 z-40 bg-black/70 backdrop-blur-sm pointer-events-auto"
            />
            {/* Slide up sheet */}
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 220 }}
              className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-[#060810] border-t border-zinc-800/80 rounded-t-3xl max-h-[85vh] overflow-y-auto px-6 pt-6 pb-28 shadow-2xl flex flex-col gap-6 pointer-events-auto"
            >
              {/* Top Handle bar decoration */}
              <div className="w-12 h-1.5 bg-zinc-800 rounded-full mx-auto cursor-pointer" onClick={() => setIsMobileMoreOpen(false)} />
              
              <div className="flex items-center justify-between border-b border-zinc-900 pb-3">
                <h3 className="font-display text-sm font-black text-zinc-300 uppercase tracking-widest flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-teal-400 animate-pulse" />
                  Internet Library Portal
                </h3>
                <button 
                  onClick={() => setIsMobileMoreOpen(false)}
                  className="text-xs font-bold text-zinc-500 uppercase tracking-wider hover:text-white cursor-pointer"
                >
                  Close
                </button>
              </div>

              {/* Grid of other main tabs */}
              <div className="grid grid-cols-2 gap-3">
                {[
                  { id: 'tools', label: 'Axiom Tools', icon: Wrench, path: '/tools', desc: 'Interactive utility forge' },
                  { id: 'compare', label: 'Compare Engine', icon: Activity, path: '/compare', desc: 'Cross-analyze models' },
                  { id: 'resources', label: 'Resources', icon: Network, path: '/resources', desc: 'Reference databases' },
                  { id: 'community', label: 'Community', icon: Users, path: '/community', desc: 'Connect with builders' },
                  { id: 'profile', label: 'My Profile', icon: User, path: '/profile', desc: 'AS Space Profile' },
                ].map((item) => {
                  const Icon = item.icon;
                  const active = activeTab === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => navigateTo(item.path)}
                      className={`flex flex-col items-start text-left p-4 rounded-2xl border transition-all cursor-pointer ${
                        active 
                          ? 'bg-teal-950/20 border-teal-500/30 text-teal-300' 
                          : 'bg-zinc-950/50 border-zinc-900 text-zinc-300 hover:border-zinc-850'
                      }`}
                    >
                      <Icon className={`h-5 w-5 mb-2 ${active ? 'text-teal-400' : 'text-zinc-400'}`} />
                      <span className="text-xs font-bold uppercase tracking-wider block">{item.label}</span>
                      <span className="text-[10px] text-zinc-500 font-medium leading-none mt-1">{item.desc}</span>
                    </button>
                  );
                })}
              </div>

              {/* Utility / Compliance Links section */}
              <div className="flex flex-col gap-2 mt-2 bg-zinc-950/40 rounded-2xl p-4 border border-zinc-900">
                <p className="text-[9px] font-bold font-mono text-zinc-500 uppercase tracking-widest mb-2 border-b border-zinc-900 pb-1.5">Compliance &amp; Editorial Information</p>
                {[
                  { label: 'About & E-E-A-T Editorial', path: '/page/about' },
                  { label: 'Privacy Policy', path: '/page/privacy' },
                  { label: 'Terms of Service', path: '/page/terms' },
                  { label: 'Editorial Feedback', path: '/page/contact' },
                ].map((link, idx) => (
                  <button
                    key={idx}
                    onClick={() => navigateTo(link.path)}
                    className="w-full text-left py-2 text-xs font-bold text-zinc-400 uppercase tracking-wider hover:text-teal-400 transition-colors cursor-pointer flex items-center justify-between"
                  >
                    <span>{link.label}</span>
                    <ChevronRight className="h-3 w-3 text-zinc-600" />
                  </button>
                ))}
              </div>

              {/* Footer details */}
              <div className="text-center space-y-2 mt-4">
                <p className="text-[10px] font-sans font-black text-zinc-500 uppercase tracking-widest">
                  © 2026 Internet Library Publications
                </p>
                <p className="text-[9px] font-mono text-zinc-600">
                  Global Knowledge Civilization v2.5
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Floating 3D Scroll Companion Character */}
      <ScrollToTopCompanion />
    </div>
  );
}
