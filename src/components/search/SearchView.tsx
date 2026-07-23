import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ProductCard } from '../common/ProductCard';
import { TRENDING_SEARCHES } from '../../data/mockData';
import { Search, X, ArrowLeft, Trash2, TrendingUp, Sparkles } from 'lucide-react';

export const SearchView: React.FC = () => {
  const {
    listings,
    searchHistory,
    addSearchHistory,
    clearSearchHistory,
    openPLP,
    setActiveView,
    language
  } = useApp();

  const [query, setQuery] = useState('');

  const handleSearchSubmit = (term: string) => {
    if (!term.trim()) return;
    addSearchHistory(term);
    openPLP('all', undefined, term);
  };

  const filtered = query.trim()
    ? listings.filter(
        l =>
          l.title.toLowerCase().includes(query.toLowerCase()) ||
          (l.amharicTitle && l.amharicTitle.includes(query)) ||
          l.subcity.toLowerCase().includes(query.toLowerCase()) ||
          l.subcategory.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  return (
    <div className="fixed inset-0 z-50 bg-white flex flex-col max-w-md mx-auto animate-in fade-in duration-200">
      {/* Top Search Bar */}
      <div className="p-3 border-b border-gray-100 flex items-center gap-2 bg-white sticky top-0 z-10">
        <button
          onClick={() => setActiveView('none')}
          className="p-1.5 rounded-full text-gray-600 hover:bg-gray-100"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>

        <div className="flex-1 bg-gray-100 rounded-full py-1.5 px-3 flex items-center gap-2 border border-brand-muted">
          <Search className="w-4 h-4 text-brand shrink-0" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleSearchSubmit(query);
            }}
            placeholder="Search dresses, earrings, tops, shoes, electronics..."
            className="w-full bg-transparent text-xs text-gray-900 focus:outline-none"
            autoFocus
          />
          {query && (
            <button onClick={() => setQuery('')} className="p-0.5 text-gray-400">
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        <button
          onClick={() => handleSearchSubmit(query)}
          className="text-xs font-bold text-brand px-2 py-1"
        >
          Search
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {/* As-you-type live results */}
        {query.trim() !== '' ? (
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-xs font-black uppercase text-gray-900 tracking-wider flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-brand" />
                Results for "{query}"
              </h3>
              <span className="text-[10px] text-gray-400">{filtered.length} found</span>
            </div>

            {filtered.length > 0 ? (
              <div className="grid grid-cols-2 gap-2.5">
                {filtered.map(listing => (
                  <ProductCard key={listing.id} listing={listing} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12 text-gray-400 text-xs">
                No items found for "{query}". Try searching for iPhone, Bole, or Toyota.
              </div>
            )}
          </div>
        ) : (
          <>
            {/* Recent Searches */}
            {searchHistory.length > 0 && (
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xs font-black uppercase text-gray-900 tracking-wider">
                    Recent Searches
                  </h3>
                  <button
                    onClick={clearSearchHistory}
                    className="text-[10px] text-gray-400 hover:text-red-500 flex items-center gap-1"
                  >
                    <Trash2 className="w-3 h-3" /> Clear
                  </button>
                </div>

                <div className="flex flex-wrap gap-2">
                  {searchHistory.map((term, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSearchSubmit(term)}
                      className="bg-gray-100 hover:bg-brand-soft text-gray-700 hover:text-brand text-xs font-medium px-3 py-1.5 rounded-full border border-gray-200/80 transition-colors"
                    >
                      {term}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Trending Searches in Addis */}
            <div>
              <h3 className="text-xs font-black uppercase text-gray-900 tracking-wider mb-2.5 flex items-center gap-1">
                <TrendingUp className="w-3.5 h-3.5 text-brand" />
                Trending Searches in Addis
              </h3>

              <div className="flex flex-wrap gap-2">
                {TRENDING_SEARCHES.map((term, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSearchSubmit(term)}
                    className="bg-white hover:bg-brand-soft text-gray-800 hover:text-brand text-xs font-bold px-3 py-1.5 rounded-full border border-gray-200 shadow-2xs transition-colors flex items-center gap-1"
                  >
                    <span className="text-[10px] text-brand font-mono">#{idx + 1}</span>
                    {term}
                  </button>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
