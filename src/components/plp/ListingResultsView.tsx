import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { FilterState } from '../../types';
import { ProductCard } from '../common/ProductCard';
import { ArrowLeft, SlidersHorizontal, ChevronDown, X, Sparkles, Filter } from 'lucide-react';

const ADDIS_SUBCITIES = ['All', 'Bole', 'Kazanchis', 'Piazza', 'CMC', 'Lideta', 'Summit', 'Sarbet', 'Old Airport'];

export const ListingResultsView: React.FC = () => {
  const { filters, setFilters, listings, categories, setActiveView, setMainTab, language } = useApp();
  const [showFilterSheet, setShowFilterSheet] = useState(false);

  const selectedCategory = categories.find(c => c.id === filters.categoryId);

  // Apply filtering
  let filteredListings = listings.filter(l => {
    if (filters.categoryId && filters.categoryId !== 'all' && l.categoryId !== filters.categoryId) {
      return false;
    }
    if (filters.subcategory && l.subcategory !== filters.subcategory) {
      return false;
    }
    if (filters.subcity && filters.subcity !== 'All' && l.subcity !== filters.subcity) {
      return false;
    }
    if (filters.minPrice && l.price < filters.minPrice) return false;
    if (filters.maxPrice && l.price > filters.maxPrice) return false;
    if (filters.isNegotiable && !l.isNegotiable) return false;
    if (filters.isVerifiedSeller && !l.isVerifiedSeller) return false;
    if (filters.searchQuery) {
      const q = filters.searchQuery.toLowerCase();
      const match =
        l.title.toLowerCase().includes(q) ||
        (l.amharicTitle && l.amharicTitle.includes(q)) ||
        l.subcity.toLowerCase().includes(q) ||
        l.subcategory.toLowerCase().includes(q);
      if (!match) return false;
    }
    return true;
  });

  // Sorting
  filteredListings = [...filteredListings].sort((a, b) => {
    if (filters.sortBy === 'price_low') return a.price - b.price;
    if (filters.sortBy === 'price_high') return b.price - a.price;
    if (filters.sortBy === 'popular') return b.viewsCount - a.viewsCount;
    return 0; // recommended / newest
  });

  return (
    <div className="bg-gray-50 min-h-screen pb-20">
      {/* PLP Sticky Top Header */}
      <div className="sticky top-0 z-30 bg-white border-b border-gray-200 p-3 md:p-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setActiveView('none')}
              className="p-1.5 rounded-full text-gray-700 hover:bg-gray-100"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h2 className="text-base md:text-lg font-black text-gray-900 leading-tight">
                {selectedCategory ? selectedCategory.name : 'Search Results'}
                {filters.subcategory ? ` • ${filters.subcategory}` : ''}
              </h2>
              <span className="text-xs text-gray-500 font-semibold">
                {filteredListings.length} verified items found
              </span>
            </div>
          </div>

          <button
            onClick={() => setActiveView('search')}
            className="text-xs font-bold text-white px-3 py-1.5 bg-black hover:bg-zinc-800 rounded-full shadow-xs"
          >
            Search
          </button>
        </div>
      </div>

      {/* Main Responsive Grid Container */}
      <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8 py-4">
        <div className="flex flex-col md:flex-row gap-6 items-start">
          
          {/* DESKTOP SIDEBAR FILTERS (Visible on md+ screens) */}
          <div className="hidden md:block w-64 shrink-0 bg-white p-5 rounded-2xl border border-gray-200 shadow-2xs space-y-6 sticky top-24">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <h3 className="font-black text-sm uppercase tracking-wider text-gray-900 flex items-center gap-1.5">
                <Filter className="w-4 h-4 text-black" /> Filters & Sort
              </h3>
              <button
                onClick={() => setFilters({ categoryId: 'all', sortBy: 'recommended' })}
                className="text-xs font-bold text-gray-400 hover:text-black"
              >
                Reset
              </button>
            </div>

            {/* Sort Options */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase text-gray-500 block">Sort By</label>
              <select
                value={filters.sortBy || 'recommended'}
                onChange={e => setFilters(prev => ({ ...prev, sortBy: e.target.value as any }))}
                className="w-full bg-gray-50 border border-gray-300 rounded-xl p-2.5 text-xs font-bold text-gray-800 focus:outline-none"
              >
                <option value="recommended">Recommended</option>
                <option value="newest">Newest First</option>
                <option value="price_low">Price: Low to High</option>
                <option value="price_high">Price: High to Low</option>
              </select>
            </div>

            {/* Subcity Selector */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase text-gray-500 block">Addis Subcity</label>
              <div className="flex flex-wrap gap-1.5">
                {ADDIS_SUBCITIES.map(sc => (
                  <button
                    key={sc}
                    onClick={() => setFilters(prev => ({ ...prev, subcity: sc === 'All' ? undefined : sc }))}
                    className={`px-3 py-1 rounded-full text-xs font-bold transition-all border ${
                      (filters.subcity === sc || (sc === 'All' && !filters.subcity))
                        ? 'bg-black text-white border-black'
                        : 'bg-gray-100 text-gray-700 border-gray-200 hover:bg-gray-200'
                    }`}
                  >
                    {sc}
                  </button>
                ))}
              </div>
            </div>

            {/* Toggles */}
            <div className="space-y-3 pt-2 border-t border-gray-100">
              <label className="flex items-center justify-between cursor-pointer text-xs font-bold text-gray-800">
                <span>Negotiable Prices</span>
                <input
                  type="checkbox"
                  checked={!!filters.isNegotiable}
                  onChange={e => setFilters(prev => ({ ...prev, isNegotiable: e.target.checked }))}
                  className="w-4 h-4 accent-black rounded-xs"
                />
              </label>

              <label className="flex items-center justify-between cursor-pointer text-xs font-bold text-gray-800">
                <span>Verified Sellers</span>
                <input
                  type="checkbox"
                  checked={!!filters.isVerifiedSeller}
                  onChange={e => setFilters(prev => ({ ...prev, isVerifiedSeller: e.target.checked }))}
                  className="w-4 h-4 accent-black rounded-xs"
                />
              </label>
            </div>
          </div>

          {/* MAIN RESULTS CONTENT AREA */}
          <div className="flex-1 w-full space-y-4">
            
            {/* Mobile Filter Quick Bar (SHEIN Style) */}
            <div className="md:hidden bg-white border border-gray-200 rounded-xl p-2 flex items-center justify-between gap-2 overflow-x-auto scrollbar-none">
              <button
                onClick={() => setShowFilterSheet(true)}
                className="bg-black text-white px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5 shrink-0 shadow-2xs"
              >
                <SlidersHorizontal className="w-3.5 h-3.5" />
                Filter
              </button>

              <div className="flex items-center gap-1.5 shrink-0">
                {ADDIS_SUBCITIES.slice(0, 5).map(sc => (
                  <button
                    key={sc}
                    onClick={() =>
                      setFilters(prev => ({ ...prev, subcity: sc === 'All' ? undefined : sc }))
                    }
                    className={`px-2.5 py-1 rounded-full text-xs font-semibold transition-all border shrink-0 ${
                      (filters.subcity === sc || (sc === 'All' && !filters.subcity))
                        ? 'bg-black text-white border-black'
                        : 'bg-gray-100 text-gray-700 border-gray-200'
                    }`}
                  >
                    {sc}
                  </button>
                ))}
              </div>
            </div>

            {/* Results Grid */}
            {filteredListings.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
                {filteredListings.map(listing => (
                  <ProductCard key={listing.id} listing={listing} />
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-2xl p-12 text-center border border-gray-200 shadow-2xs">
                <Sparkles className="w-10 h-10 text-gray-400 mx-auto mb-3" />
                <h3 className="text-base font-extrabold text-gray-900">No listings found</h3>
                <p className="text-xs text-gray-500 mt-1">
                  Try adjusting your subcity or category filters.
                </p>
                <button
                  onClick={() => setMainTab('sell')}
                  className="mt-5 px-5 py-2.5 bg-black hover:bg-zinc-800 text-white font-extrabold text-xs rounded-full shadow-md transition-transform active:scale-95"
                >
                  Post First Ad Here
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Filter Bottom Sheet for Mobile */}
      {showFilterSheet && (
        <div className="md:hidden fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-end justify-center animate-in fade-in duration-200">
          <div className="w-full max-w-md bg-white rounded-t-2xl max-h-[85vh] overflow-y-auto flex flex-col shadow-2xl">
            {/* Sheet Header */}
            <div className="p-4 border-b border-gray-100 flex items-center justify-between sticky top-0 bg-white z-10">
              <h3 className="font-black text-sm uppercase text-gray-900 tracking-wider">
                Filter & Sort Listings
              </h3>
              <button
                onClick={() => setShowFilterSheet(false)}
                className="p-1 rounded-full text-gray-400 hover:bg-gray-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Sheet Body */}
            <div className="p-4 space-y-5 flex-1">
              {/* Sort By */}
              <div>
                <label className="text-xs font-bold uppercase text-gray-500 block mb-2">
                  Sort By
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { id: 'recommended', label: 'Recommended' },
                    { id: 'newest', label: 'Newest First' },
                    { id: 'price_low', label: 'Price: Low to High' },
                    { id: 'price_high', label: 'Price: High to Low' }
                  ].map(opt => (
                    <button
                      key={opt.id}
                      onClick={() =>
                        setFilters(prev => ({
                          ...prev,
                          sortBy: opt.id as FilterState['sortBy']
                        }))
                      }
                      className={`p-2.5 rounded-lg text-xs font-bold text-center border transition-all ${
                        filters.sortBy === opt.id
                          ? 'border-black bg-black text-white'
                          : 'border-gray-200 text-gray-700 bg-gray-50'
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Subcity Selector */}
              <div>
                <label className="text-xs font-bold uppercase text-gray-500 block mb-2">
                  Addis Ababa Location (Subcity)
                </label>
                <div className="flex flex-wrap gap-1.5">
                  {ADDIS_SUBCITIES.map(sc => (
                    <button
                      key={sc}
                      onClick={() =>
                        setFilters(prev => ({
                          ...prev,
                          subcity: sc === 'All' ? undefined : sc
                        }))
                      }
                      className={`px-3 py-1.5 rounded-full text-xs font-semibold border ${
                        (filters.subcity === sc || (sc === 'All' && !filters.subcity))
                          ? 'bg-black text-white border-black'
                          : 'bg-gray-100 text-gray-700 border-gray-200'
                      }`}
                    >
                      {sc}
                    </button>
                  ))}
                </div>
              </div>

              {/* Negotiable & Verified Toggles */}
              <div className="space-y-3 pt-2 border-t border-gray-100">
                <label className="flex items-center justify-between cursor-pointer">
                  <span className="text-xs font-bold text-gray-800">
                    Negotiable Prices Only
                  </span>
                  <input
                    type="checkbox"
                    checked={!!filters.isNegotiable}
                    onChange={e =>
                      setFilters(prev => ({ ...prev, isNegotiable: e.target.checked }))
                    }
                    className="w-4 h-4 accent-black rounded-xs"
                  />
                </label>

                <label className="flex items-center justify-between cursor-pointer">
                  <span className="text-xs font-bold text-gray-800">
                    Verified Sellers Only
                  </span>
                  <input
                    type="checkbox"
                    checked={!!filters.isVerifiedSeller}
                    onChange={e =>
                      setFilters(prev => ({ ...prev, isVerifiedSeller: e.target.checked }))
                    }
                    className="w-4 h-4 accent-black rounded-xs"
                  />
                </label>
              </div>
            </div>

            {/* Sheet Footer */}
            <div className="p-4 border-t border-gray-100 grid grid-cols-2 gap-3 sticky bottom-0 bg-white">
              <button
                onClick={() => {
                  setFilters({ categoryId: 'all', sortBy: 'recommended' });
                  setShowFilterSheet(false);
                }}
                className="py-3 bg-gray-100 font-bold text-xs text-gray-700 rounded-xl"
              >
                Reset
              </button>
              <button
                onClick={() => setShowFilterSheet(false)}
                className="py-3 bg-black font-bold text-xs text-white rounded-xl shadow-md"
              >
                Show Results
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

