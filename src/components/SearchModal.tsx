import React, { useState, useEffect, useRef, useMemo } from 'react';
import {
  Search,
  X,
  Clock,
  ArrowRight,
  BookOpen,
  GraduationCap,
  Calendar,
  Award,
  Users,
  User,
  ExternalLink,
  ChevronRight,
  Sparkles,
  Info,
  CheckCircle2,
  AlertCircle,
  Tag,
  Eye,
  CornerDownLeft,
} from 'lucide-react';
import { ScreenType } from '../types';
import { SearchCategory, SearchResultItem } from '../types/search';
import { executeSearch, getCategoryCounts } from '../utils/searchEngine';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (screen: ScreenType) => void;
  initialQuery?: string;
}

const CATEGORY_TABS: { id: SearchCategory; label: string; icon: React.ReactNode }[] = [
  { id: 'all', label: 'All', icon: <Sparkles className="w-3.5 h-3.5" /> },
  { id: 'academics', label: 'Academics', icon: <GraduationCap className="w-3.5 h-3.5" /> },
  { id: 'homework', label: 'Homework', icon: <BookOpen className="w-3.5 h-3.5" /> },
  { id: 'teachers', label: 'Teachers', icon: <Users className="w-3.5 h-3.5" /> },
  { id: 'timetable', label: 'Timetable', icon: <Calendar className="w-3.5 h-3.5" /> },
  { id: 'sports', label: 'Sports', icon: <Award className="w-3.5 h-3.5" /> },
  { id: 'certificates', label: 'Certificates', icon: <Award className="w-3.5 h-3.5" /> },
  { id: 'ptm', label: 'PTM', icon: <Calendar className="w-3.5 h-3.5" /> },
  { id: 'student', label: 'Student', icon: <User className="w-3.5 h-3.5" /> },
];

const POPULAR_SEARCHES = [
  'Maths homework',
  'Vidhya mam',
  'Science 92',
  'Monday timetable',
  'Football tournament',
  'Gold medal',
  'Unit test marks',
  'Upcoming PTM',
  'Attendance 85%',
  'Ashok Verma',
];

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  onNavigate,
  initialQuery = '',
}) => {
  const [query, setQuery] = useState(initialQuery);
  const [activeCategory, setActiveCategory] = useState<SearchCategory>('all');
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const [expandedItemId, setExpandedItemId] = useState<string | null>(null);
  const [recentSearches, setRecentSearches] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('attendx_recent_searches');
      return saved ? JSON.parse(saved) : ['Science score', 'Vidhya mam', 'Maths homework'];
    } catch {
      return ['Science score', 'Vidhya mam', 'Maths homework'];
    }
  });

  const inputRef = useRef<HTMLInputElement>(null);
  const resultsContainerRef = useRef<HTMLDivElement>(null);

  // Sync initial query if provided
  useEffect(() => {
    if (isOpen) {
      if (initialQuery) {
        setQuery(initialQuery);
      }
      setTimeout(() => {
        inputRef.current?.focus();
        inputRef.current?.select();
      }, 50);
    }
  }, [isOpen, initialQuery]);

  // Execute query search
  const results = useMemo(() => {
    return executeSearch(query, activeCategory, 25);
  }, [query, activeCategory]);

  // Category counts
  const categoryCounts = useMemo(() => {
    return getCategoryCounts(query);
  }, [query]);

  // Save to recent searches
  const saveRecentSearch = (text: string) => {
    const trimmed = text.trim();
    if (!trimmed) return;
    setRecentSearches((prev) => {
      const filtered = prev.filter((s) => s.toLowerCase() !== trimmed.toLowerCase());
      const updated = [trimmed, ...filtered].slice(0, 8);
      try {
        localStorage.setItem('attendx_recent_searches', JSON.stringify(updated));
      } catch {
        // ignore storage errors
      }
      return updated;
    });
  };

  const clearRecentSearches = () => {
    setRecentSearches([]);
    try {
      localStorage.removeItem('attendx_recent_searches');
    } catch {
      // ignore
    }
  };

  // Handle click on item
  const handleSelectItem = (item: SearchResultItem) => {
    if (query.trim()) {
      saveRecentSearch(query.trim());
    }
    onNavigate(item.targetScreen);
    onClose();
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex((prev) => (results.length > 0 ? (prev + 1) % results.length : 0));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex((prev) =>
          results.length > 0 ? (prev - 1 + results.length) % results.length : 0
        );
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (results.length > 0 && results[selectedIndex]) {
          handleSelectItem(results[selectedIndex]);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, results, selectedIndex]);

  // Scroll active item into view
  useEffect(() => {
    if (!resultsContainerRef.current) return;
    const activeEl = resultsContainerRef.current.querySelector(
      `[data-index="${selectedIndex}"]`
    ) as HTMLElement;
    if (activeEl) {
      activeEl.scrollIntoView({ block: 'nearest' });
    }
  }, [selectedIndex]);

  // Highlight matched search letters helper
  const highlightText = (text: string, highlight: string) => {
    if (!highlight.trim()) return text;
    const terms = highlight
      .trim()
      .split(/\s+/)
      .filter(Boolean)
      .map((t) => t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
    if (terms.length === 0) return text;
    const regex = new RegExp(`(${terms.join('|')})`, 'gi');
    const parts = text.split(regex);
    return parts.map((part, i) =>
      regex.test(part) ? (
        <mark key={i} className="bg-red-100 text-[#FF3644] font-black rounded-xs px-0.5">
          {part}
        </mark>
      ) : (
        part
      )
    );
  };

  // Category Icon helper
  const getCategoryIcon = (category: SearchCategory) => {
    switch (category) {
      case 'academics':
        return <GraduationCap className="w-4 h-4 text-emerald-600" />;
      case 'homework':
        return <BookOpen className="w-4 h-4 text-amber-600" />;
      case 'teachers':
        return <Users className="w-4 h-4 text-indigo-600" />;
      case 'timetable':
        return <Calendar className="w-4 h-4 text-sky-600" />;
      case 'sports':
      case 'certificates':
        return <Award className="w-4 h-4 text-[#FF3644]" />;
      case 'student':
        return <User className="w-4 h-4 text-purple-600" />;
      default:
        return <Sparkles className="w-4 h-4 text-rose-500" />;
    }
  };

  // Badge style helper
  const getBadgeClass = (variant?: string) => {
    switch (variant) {
      case 'green':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'red':
        return 'bg-rose-50 text-[#FF3644] border-rose-200';
      case 'amber':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'purple':
        return 'bg-purple-50 text-purple-700 border-purple-200';
      case 'blue':
        return 'bg-sky-50 text-sky-700 border-sky-200';
      default:
        return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-start sm:items-center justify-center p-0 sm:p-4 bg-slate-900/60 backdrop-blur-xs transition-opacity animate-fadeIn"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="bg-[#F8FAFC] w-full max-w-2xl sm:rounded-[28px] shadow-2xl border border-slate-200/90 overflow-hidden flex flex-col h-[100dvh] sm:h-auto sm:max-h-[88vh] animate-slideUp"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Search Box */}
        <div className="bg-white p-3.5 sm:p-5 border-b border-slate-200/80 shadow-xs">
          <div className="flex items-center gap-2.5">
            {/* Input Container */}
            <div className="flex-1 relative flex items-center bg-[#F1F5F9] rounded-2xl px-3.5 py-2.5 border border-slate-200/80 shadow-inner focus-within:border-slate-300 transition-all">
              <Search className="w-5 h-5 text-[#FF3644] stroke-[2.5] shrink-0 mr-2" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setSelectedIndex(0);
                }}
                placeholder="Search subjects, homework, teachers, timetable, sports..."
                className="w-full bg-transparent text-sm sm:text-base font-bold text-slate-800 focus:outline-none focus:ring-0 focus:border-none border-none placeholder:text-slate-400 placeholder:font-medium"
              />
              {query && (
                <button
                  onClick={() => {
                    setQuery('');
                    setSelectedIndex(0);
                    inputRef.current?.focus();
                  }}
                  className="p-1 rounded-full hover:bg-slate-200/80 text-slate-400 hover:text-slate-600 transition-colors"
                  title="Clear input"
                  aria-label="Clear search query"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Close Button */}
            <button
              onClick={onClose}
              className="p-2.5 rounded-2xl bg-white hover:bg-slate-100 text-slate-500 hover:text-slate-700 border border-slate-200/80 shadow-neu-sm active:scale-95 transition-all text-xs font-bold"
              aria-label="Close search"
            >
              <span className="hidden sm:inline">Esc</span>
              <X className="w-5 h-5 sm:hidden" />
            </button>
          </div>

          {/* Category Filter Pills with Counter Badges */}
          <div className="flex items-center gap-1.5 overflow-x-auto pt-3 pb-0.5 scrollbar-none no-scrollbar">
            {CATEGORY_TABS.map((tab) => {
              const count = categoryCounts[tab.id] || 0;
              const isActive = activeCategory === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveCategory(tab.id);
                    setSelectedIndex(0);
                  }}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-extrabold whitespace-nowrap transition-all duration-200 cursor-pointer active:scale-95 ${
                    isActive
                      ? 'bg-[#FF3644] text-white shadow-sm ring-2 ring-[#FF3644]/20'
                      : 'bg-[#F1F5F9] hover:bg-slate-200/80 text-slate-600 border border-slate-200/70'
                  }`}
                >
                  {tab.icon}
                  <span>{tab.label}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                      isActive ? 'bg-white/25 text-white' : 'bg-white text-slate-500 shadow-xs'
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Body Content Area */}
        <div
          ref={resultsContainerRef}
          className="flex-1 overflow-y-auto p-3 sm:p-5 space-y-4 divide-y divide-slate-100"
        >
          {/* Query Results */}
          {query.trim() ? (
            results.length > 0 ? (
              <div className="space-y-2.5">
                <div className="flex items-center justify-between px-1 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  <span>
                    Found {results.length} results for &ldquo;{query}&rdquo;
                  </span>
                  <span className="hidden sm:inline">Use ↑ ↓ arrows &amp; Enter to select</span>
                </div>

                {results.map((item, idx) => {
                  const isSelected = selectedIndex === idx;
                  const isExpanded = expandedItemId === item.id;

                  return (
                    <div
                      key={item.id}
                      data-index={idx}
                      onClick={() => handleSelectItem(item)}
                      className={`group rounded-2xl p-3 sm:p-3.5 transition-all duration-150 border cursor-pointer ${
                        isSelected
                          ? 'bg-white border-[#FF3644] shadow-md ring-2 ring-[#FF3644]/10'
                          : 'bg-white hover:bg-slate-50 border-slate-200/80 shadow-neu-sm'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        {/* Category Avatar */}
                        <div className="w-9 h-9 rounded-xl bg-slate-100 flex items-center justify-center shrink-0 mt-0.5 border border-slate-200/60 shadow-xs group-hover:scale-105 transition-transform">
                          {getCategoryIcon(item.category)}
                        </div>

                        {/* Middle Text Details */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                              {item.categoryLabel}
                            </span>
                            {item.badge && (
                              <span
                                className={`text-[10px] font-extrabold px-2 py-0.5 rounded-md border ${getBadgeClass(
                                  item.badge.variant
                                )}`}
                              >
                                {item.badge.text}
                              </span>
                            )}
                          </div>

                          <h4 className="text-sm sm:text-base font-extrabold text-slate-800 leading-snug mt-0.5">
                            {highlightText(item.title, query)}
                          </h4>

                          <p className="text-xs font-semibold text-slate-500 mt-0.5 line-clamp-1">
                            {highlightText(item.subtitle, query)}
                          </p>

                          {/* Quick Expanded Details */}
                          {isExpanded && item.description && (
                            <div
                              onClick={(e) => e.stopPropagation()}
                              className="mt-2.5 p-2.5 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-600 font-medium space-y-1.5 animate-fadeIn"
                            >
                              <p>{item.description}</p>
                              {item.metadata && (
                                <div className="flex flex-wrap gap-2 pt-1 border-t border-slate-200/60 text-[11px] font-bold text-slate-500">
                                  {item.metadata.subject && (
                                    <span>Subject: {item.metadata.subject}</span>
                                  )}
                                  {item.metadata.teacher && (
                                    <span>Teacher: {item.metadata.teacher}</span>
                                  )}
                                  {item.metadata.time && <span>Time: {item.metadata.time}</span>}
                                  {item.metadata.location && (
                                    <span>Venue: {item.metadata.location}</span>
                                  )}
                                </div>
                              )}
                            </div>
                          )}
                        </div>

                        {/* Actions */}
                        <div className="flex items-center gap-1.5 shrink-0 self-center">
                          {/* Quick Inspect Details Toggle */}
                          {item.description && (
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                setExpandedItemId(isExpanded ? null : item.id);
                              }}
                              className={`p-1.5 rounded-xl border text-xs font-bold transition-colors ${
                                isExpanded
                                  ? 'bg-slate-800 text-white border-slate-800'
                                  : 'bg-slate-50 hover:bg-slate-100 text-slate-500 border-slate-200'
                              }`}
                              title={isExpanded ? 'Hide info' : 'Inspect details'}
                            >
                              <Eye className="w-3.5 h-3.5" />
                            </button>
                          )}

                          {/* Direct Navigation Button */}
                          <div
                            className={`flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-xs font-extrabold transition-all ${
                              isSelected
                                ? 'bg-[#FF3644] text-white shadow-xs'
                                : 'bg-slate-100 group-hover:bg-[#FF3644] text-slate-700 group-hover:text-white'
                            }`}
                          >
                            <span className="hidden sm:inline">{item.actionLabel}</span>
                            <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              /* Empty Query Result */
              <div className="py-12 text-center space-y-3">
                <div className="w-14 h-14 bg-red-50 text-[#FF3644] rounded-full flex items-center justify-center mx-auto">
                  <AlertCircle className="w-7 h-7" />
                </div>
                <div className="space-y-1">
                  <h4 className="text-base font-extrabold text-slate-800">
                    No results found for &ldquo;{query}&rdquo;
                  </h4>
                  <p className="text-xs text-slate-500 max-w-sm mx-auto">
                    Try checking your spelling, using fewer keywords, or browse one of the suggested
                    topics below.
                  </p>
                </div>
                <div className="flex flex-wrap items-center justify-center gap-1.5 pt-2">
                  {POPULAR_SEARCHES.slice(0, 5).map((pop) => (
                    <button
                      key={pop}
                      onClick={() => setQuery(pop)}
                      className="px-2.5 py-1 bg-white hover:bg-slate-100 text-slate-700 text-xs font-bold rounded-lg border border-slate-200 shadow-xs"
                    >
                      {pop}
                    </button>
                  ))}
                </div>
              </div>
            )
          ) : (
            /* Default Landing View when no query is typed yet */
            <div className="space-y-5 pt-1">
              {/* Recent Searches */}
              {recentSearches.length > 0 && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between px-1">
                    <span className="text-[11px] font-black tracking-wider text-slate-400 uppercase flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5" /> Recent Searches
                    </span>
                    <button
                      onClick={clearRecentSearches}
                      className="text-[11px] font-bold text-slate-400 hover:text-[#FF3644] transition-colors"
                    >
                      Clear History
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {recentSearches.map((term) => (
                      <button
                        key={term}
                        onClick={() => {
                          setQuery(term);
                          inputRef.current?.focus();
                        }}
                        className="flex items-center gap-1.5 px-3 py-1.5 bg-white hover:bg-slate-100 text-slate-700 text-xs font-bold rounded-xl border border-slate-200 shadow-neu-sm active:scale-95 transition-all"
                      >
                        <Clock className="w-3 h-3 text-slate-400" />
                        <span>{term}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Popular / Recommended Searches */}
              <div className="space-y-2">
                <span className="text-[11px] font-black tracking-wider text-slate-400 uppercase flex items-center gap-1.5 px-1">
                  <Sparkles className="w-3.5 h-3.5 text-amber-500" /> Suggested &amp; Trending
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {POPULAR_SEARCHES.map((pop) => (
                    <button
                      key={pop}
                      onClick={() => {
                        setQuery(pop);
                        inputRef.current?.focus();
                      }}
                      className="px-3 py-1.5 bg-white hover:bg-red-50 hover:border-red-200 hover:text-[#FF3644] text-slate-700 text-xs font-bold rounded-xl border border-slate-200/90 shadow-neu-sm active:scale-95 transition-all"
                    >
                      {pop}
                    </button>
                  ))}
                </div>
              </div>

              {/* Browse Category Shortcuts */}
              <div className="space-y-2">
                <span className="text-[11px] font-black tracking-wider text-slate-400 uppercase px-1">
                  Browse by Category
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {[
                    {
                      cat: 'academics' as SearchCategory,
                      title: 'Academics & Tests',
                      count: categoryCounts.academics,
                      icon: <GraduationCap className="w-4 h-4 text-emerald-600" />,
                    },
                    {
                      cat: 'homework' as SearchCategory,
                      title: 'Assignments & HW',
                      count: categoryCounts.homework,
                      icon: <BookOpen className="w-4 h-4 text-amber-600" />,
                    },
                    {
                      cat: 'teachers' as SearchCategory,
                      title: 'Faculty Directory',
                      count: categoryCounts.teachers,
                      icon: <Users className="w-4 h-4 text-indigo-600" />,
                    },
                    {
                      cat: 'timetable' as SearchCategory,
                      title: 'Daily Timetable',
                      count: categoryCounts.timetable,
                      icon: <Calendar className="w-4 h-4 text-sky-600" />,
                    },
                    {
                      cat: 'sports' as SearchCategory,
                      title: 'Sports & Medals',
                      count: (categoryCounts.sports || 0) + (categoryCounts.certificates || 0),
                      icon: <Award className="w-4 h-4 text-[#FF3644]" />,
                    },
                    {
                      cat: 'ptm' as SearchCategory,
                      title: 'PTM Meetings',
                      count: categoryCounts.ptm,
                      icon: <Calendar className="w-4 h-4 text-purple-600" />,
                    },
                  ].map((card) => (
                    <div
                      key={card.cat}
                      onClick={() => {
                        setActiveCategory(card.cat);
                        setQuery(' ');
                      }}
                      className="p-3 bg-white hover:bg-slate-50 rounded-2xl border border-slate-200/80 shadow-neu-sm cursor-pointer active:scale-95 transition-all space-y-1 group"
                    >
                      <div className="flex items-center justify-between">
                        <div className="p-1.5 rounded-lg bg-slate-50 group-hover:scale-110 transition-transform">
                          {card.icon}
                        </div>
                        <span className="text-[10px] font-black text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded-full">
                          {card.count}
                        </span>
                      </div>
                      <p className="text-xs font-extrabold text-slate-800 leading-tight">
                        {card.title}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer info banner with keyboard shortcuts */}
        <div className="bg-slate-100/90 px-4 py-2.5 border-t border-slate-200 text-[11px] text-slate-500 font-semibold flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 bg-white border border-slate-300 rounded-md shadow-xs text-[10px] font-black text-slate-700">
                ↑
              </kbd>
              <kbd className="px-1.5 py-0.5 bg-white border border-slate-300 rounded-md shadow-xs text-[10px] font-black text-slate-700">
                ↓
              </kbd>{' '}
              Navigate
            </span>
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 bg-white border border-slate-300 rounded-md shadow-xs text-[10px] font-black text-slate-700">
                ↵
              </kbd>{' '}
              Open
            </span>
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 bg-white border border-slate-300 rounded-md shadow-xs text-[10px] font-black text-slate-700">
                Esc
              </kbd>{' '}
              Close
            </span>
          </div>
          <span className="text-[#FF3644] font-bold">Attendx Intelligent Search</span>
        </div>
      </div>
    </div>
  );
};
