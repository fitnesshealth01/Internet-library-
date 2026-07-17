export interface LibraryItem {
  id: string;
  title: string;
  category: 'Articles' | 'News' | 'Tech' | 'APIs' | 'Videos' | 'Posts';
  description: string;
  url: string;
  source: string;
  tags: string[];
  date: string;
  readTime?: string;
  duration?: string;
  popularity: number;
  coverImage?: string;
}

export interface AISummary {
  summary: string;
  takeaways: string[];
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  prerequisites: string[];
}

export interface YouTubeVideo {
  title: string;
  videoId: string;
  channel: string;
  description: string;
  duration: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  content: string;
  timestamp: string;
}

export type FeedSource = 'curated' | 'hackernews' | 'devto' | 'reddit' | 'rss';
