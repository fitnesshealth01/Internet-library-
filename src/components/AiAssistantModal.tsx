import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageSquare, X, Send, Sparkles, RefreshCw, GraduationCap, ExternalLink } from 'lucide-react';
import { ChatMessage } from '../types';

interface AiAssistantModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialPrompt?: string | null;
}

export default function AiAssistantModal({ isOpen, onClose, initialPrompt }: AiAssistantModalProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'model',
      content: "Hello! I am the **Internet Library AI Assistant**, your expert research guide. \n\nAsk me anything! I can explain complex architectures (e.g. *What is a V8 compiling engine?*), draft study plans, or recommend research topics in our library.",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      setTimeout(scrollToBottom, 100);
    }
  }, [isOpen, messages, loading]);

  useEffect(() => {
    if (isOpen && initialPrompt) {
      const triggerInitialPrompt = async () => {
        const userMessage: ChatMessage = {
          id: `msg-${Date.now()}-initial-user`,
          role: 'user',
          content: initialPrompt,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };

        setMessages(prev => [...prev, userMessage]);
        setLoading(true);

        try {
          const response = await fetch('/api/ask-gemini', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              question: initialPrompt,
              history: []
            })
          });
          const data = await response.json();

          const aiMessage: ChatMessage = {
            id: `msg-${Date.now()}-initial-ai`,
            role: 'model',
            content: data.answer || "I couldn't generate a response. Please try again.",
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          };
          setMessages(prev => [...prev, aiMessage]);
        } catch (err) {
          console.error(err);
          const errorMessage: ChatMessage = {
            id: `msg-${Date.now()}-initial-err`,
            role: 'model',
            content: "Sorry, I'm experiencing connection drops. Please ensure your Gemini secret API key is loaded. I can still assist with standard local queries!",
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          };
          setMessages(prev => [...prev, errorMessage]);
        } finally {
          setLoading(false);
        }
      };
      
      triggerInitialPrompt();
    }
  }, [isOpen, initialPrompt]);

  const handleSend = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!input.trim() || loading) return;

    const userMessageText = input.trim();
    setInput('');
    
    const userMessage: ChatMessage = {
      id: `msg-${Date.now()}-user`,
      role: 'user',
      content: userMessageText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMessage]);
    setLoading(true);

    try {
      const historyPayload = messages.map(msg => ({
        role: msg.role,
        content: msg.content
      }));

      const response = await fetch('/api/ask-gemini', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question: userMessageText,
          history: historyPayload
        })
      });
      const data = await response.json();

      const aiMessage: ChatMessage = {
        id: `msg-${Date.now()}-ai`,
        role: 'model',
        content: data.answer || "I couldn't generate a response. Please try again.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, aiMessage]);
    } catch (err) {
      console.error(err);
      const errorMessage: ChatMessage = {
        id: `msg-${Date.now()}-err`,
        role: 'model',
        content: "Sorry, I'm experiencing connection drops. Please ensure your Gemini secret API key is loaded. I can still assist with standard local queries!",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  const clearChat = () => {
    setMessages([
      {
        id: 'welcome',
        role: 'model',
        content: "Hello! I am the **Internet Library AI Assistant**, your expert research guide. \n\nAsk me anything! I can explain complex architectures, draft study plans, or recommend research topics.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
  };

  const handleSuggestedPrompt = (prompt: string) => {
    setInput(prompt);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop (mobile only) */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-[2px] md:hidden"
            onClick={onClose}
          />

          {/* Drawer Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 20, stiffness: 120 }}
            className="fixed right-0 top-0 bottom-0 z-50 w-full max-w-md bg-[#0A0A0B] border-l border-zinc-800 shadow-2xl flex flex-col h-full"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-zinc-800 bg-[#111112] text-white p-4">
              <div className="flex items-center gap-2">
                <div className="rounded-lg bg-indigo-500/20 p-1.5 border border-indigo-400/20">
                  <Sparkles className="h-5 w-5 text-indigo-400 fill-indigo-400/20" />
                </div>
                <div>
                  <h3 className="font-sans font-bold text-sm leading-none">Research Assistant</h3>
                  <span className="text-[10px] text-zinc-500 font-mono">Gemini 3.5 Flash Active</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  id="clear-chat-btn"
                  onClick={clearChat}
                  title="Clear conversation"
                  className="rounded-full p-1.5 text-zinc-400 hover:bg-zinc-800 hover:text-white transition cursor-pointer"
                >
                  <RefreshCw className="h-4 w-4" />
                </button>
                <button
                  id="close-chat-btn"
                  onClick={onClose}
                  className="rounded-full p-1.5 text-zinc-400 hover:bg-zinc-800 hover:text-white transition cursor-pointer"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Chat History */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#0A0A0B]">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}
                >
                  <div className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                    msg.role === 'user'
                      ? 'bg-indigo-600 text-white rounded-br-none'
                      : 'bg-[#111112] border border-zinc-800 text-zinc-100 rounded-bl-none shadow-sm'
                  }`}>
                    {/* Render Markdown-like content simply */}
                    <div className="whitespace-pre-line prose prose-invert prose-sm max-w-none">
                      {msg.content.split('\n').map((para, i) => {
                        // Very basic bold replacement
                        const formattedText = para.replace(/\*\*(.*?)\*\*/g, '$1');
                        return (
                          <p key={i} className={i > 0 ? "mt-2" : ""}>
                            {formattedText}
                          </p>
                        );
                      })}
                    </div>
                  </div>
                  <span className="text-[9px] text-zinc-500 font-mono mt-1 px-1">
                    {msg.timestamp}
                  </span>
                </div>
              ))}

              {loading && (
                <div className="flex flex-col items-start">
                  <div className="bg-[#111112] border border-zinc-800 rounded-2xl rounded-bl-none px-4 py-3 shadow-sm flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-full bg-indigo-500 animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="h-2 w-2 rounded-full bg-indigo-500 animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="h-2 w-2 rounded-full bg-indigo-500 animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Suggested Prompts */}
            {messages.length === 1 && (
              <div className="p-3 bg-[#111112] border-t border-zinc-800">
                <p className="text-[10px] text-zinc-400 font-sans font-bold uppercase tracking-wider mb-2 px-1 flex items-center gap-1">
                  <GraduationCap className="h-3.5 w-3.5" /> Suggested Inquiries
                </p>
                <div className="grid grid-cols-2 gap-1.5">
                  {[
                    "What is a database index?",
                    "Explain WebAssembly simply",
                    "How does HTTP/3 speed up web?",
                    "React 19 Server Actions vs Client"
                  ].map((prompt, i) => (
                    <button
                      key={i}
                      onClick={() => handleSuggestedPrompt(prompt)}
                      className="text-left text-[11px] p-2 bg-[#1A1A1C] rounded-lg border border-zinc-800 text-zinc-400 hover:border-indigo-500/50 hover:text-white transition cursor-pointer"
                    >
                      {prompt}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Input Form */}
            <form onSubmit={handleSend} className="p-3 bg-[#111112] border-t border-zinc-800 flex gap-2">
              <input
                id="assistant-chat-input"
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask the AI Librarian..."
                className="flex-1 px-3.5 py-2 text-sm rounded-xl bg-[#1A1A1C] border border-zinc-800 text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-indigo-500 transition font-sans"
              />
              <button
                id="submit-question-btn"
                type="submit"
                disabled={!input.trim() || loading}
                className="rounded-xl bg-indigo-600 text-white p-2.5 hover:bg-indigo-700 disabled:opacity-40 transition shrink-0 cursor-pointer"
              >
                <Send className="h-4 w-4" />
              </button>
            </form>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
