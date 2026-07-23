import React, { useMemo, useState } from 'react';
import { useApp } from '../../context/AppContext';
import { FilterState, Listing } from '../../types';
import { SUBCATEGORY_ALIASES } from '../../data/mockData';
import { ProductCard } from '../common/ProductCard';
import {
  ArrowLeft,
  SlidersHorizontal,
  ChevronDown,
  ChevronUp,
  X,
  Sparkles,
  Filter
} from 'lucide-react';

const ADDIS_SUBCITIES = [
  'All',
  'Bole',
  'Kazanchis',
  'Piazza',
  'CMC',
  'Lideta',
  'Summit',
  'Sarbet',
  'Old Airport'
];

const COLORS = [
  { name: 'Multi', hex: 'conic-gradient(red, yellow, green, blue, red)' },
  { name: 'Black', hex: '#111111' },
  { name: 'White', hex: '#ffffff' },
  { name: 'Pink', hex: '#f9a8d4' },
  { name: 'Blue', hex: '#3b82f6' },
  { name: 'Green', hex: '#22c55e' },
  { name: 'Red', hex: '#ef4444' },
  { name: 'Yellow', hex: '#eab308' },
  { name: 'Brown', hex: '#92400e' },
  { name: 'Purple', hex: '#a855f7' },
  { name: 'Orange', hex: '#f97316' }
];

const PRICE_PRESETS = [
  { id: 'under4k', label: 'Under 4,000 ETB', max: 4000 },
  { id: '4to15', label: '4,000 – 15,000 ETB', min: 4000, max: 15000 },
  { id: 'over15', label: 'Over 15,000 ETB', min: 15000 }
];

function listingMatchesSubcategory(listing: Listing, sub?: string): boolean {
  if (!sub) return true;
  const needle = sub.toLowerCase().trim();
  const listingSub = listing.subcategory.toLowerCase();

  if (listingSub === needle) return true;
  if (listingSub.includes(needle) || needle.includes(listingSub)) return true;
  if (listing.title.toLowerCase().includes(needle)) return true;

  const aliases = SUBCATEGORY_ALIASES[sub] || SUBCATEGORY_ALIASES[sub.replace(/\s+/g, ' ')];
  if (aliases && aliases.length === 0) return true; // Super Deals / Sale → all in category
  if (aliases?.some(a => listingSub === a.toLowerCase() || listingSub.includes(a.toLowerCase()))) {
    return true;
  }

  return false;
}

export const ListingResultsView: React.FC = () => {
  const { filters, setFilters, listings, categories, setActiveView, setMainTab, openPLP } =
    useApp();
  const [showFilterSheet, setShowFilterSheet] = useState(false);
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    subcategory: true,
    color: true,
    price: true,
    location: true
  });
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [pricePreset, setPricePreset] = useState<string | null>(null);
  const [minInput, setMinInput] = useState('');
  const [maxInput, setMaxInput] = useState('');

  const selectedCategory = categories.find(c => c.id === filters.categoryId);
  const subcategoryOptions = selectedCategory?.subcategories || [];

  const toggleSection = (key: string) =>
    setOpenSections(prev => ({ ...prev, [key]: !prev[key] }));

  const filteredListings = useMemo(() => {
    let result = listings.filter(l => {
      if (filters.categoryId && filters.categoryId !== 'all' && l.categoryId !== filters.categoryId) {
        return false;
      }
      if (filters.subcategory && !listingMatchesSubcategory(l, filters.subcategory)) {
        return false;
      }
      if (filters.subcity && filters.subcity !== 'All' && l.subcity !== filters.subcity) {
        return false;
      }
      if (filters.minPrice != null && l.price < filters.minPrice) return false;
      if (filters.maxPrice != null && l.price > filters.maxPrice) return false;
      if (filters.isNegotiable && !l.isNegotiable) return false;
      if (filters.isVerifiedSeller && !l.isVerifiedSeller) return false;
      if (selectedColors.length > 0) {
        const colorAttr = (l.attributes?.Color || l.availableColors?.join(' ') || '').toLowerCase();
        const title = l.title.toLowerCase();
        const hit = selectedColors.some(
          c => colorAttr.includes(c.toLowerCase()) || title.includes(c.toLowerCase())
        );
        if (!hit) return false;
      }
      if (filters.searchQuery) {
        const q = filters.searchQuery.toLowerCase();
        const match =
          l.title.toLowerCase().includes(q) ||
          (l.amharicTitle && l.amharicTitle.toLowerCase().includes(q)) ||
          l.subcity.toLowerCase().includes(q) ||
          l.subcategory.toLowerCase().includes(q);
        if (!match) return false;
      }
      return true;
    });

    // Soft fallback: if subcategory filter emptied the grid, show category catalog instead
    if (result.length === 0 && filters.subcategory && filters.categoryId && filters.categoryId !== 'all') {
      result = listings.filter(l => l.categoryId === filters.categoryId);
    }

    return [...result].sort((a, b) => {
      if (filters.sortBy === 'price_low') return a.price - b.price;
      if (filters.sortBy === 'price_high') return b.price - a.price;
      if (filters.sortBy === 'popular') return b.viewsCount - a.viewsCount;
      if (filters.sortBy === 'newest') return b.viewsCount - a.viewsCount;
      return (b.isBoosted ? 1 : 0) - (a.isBoosted ? 1 : 0) || b.viewsCount - a.viewsCount;
    });
  }, [listings, filters, selectedColors]);

  const pageTitle =
    filters.subcategory ||
    selectedCategory?.name ||
    (filters.searchQuery ? `“${filters.searchQuery}”` : 'All Categories');

  const applyPricePreset = (preset: (typeof PRICE_PRESETS)[0]) => {
    setPricePreset(preset.id);
    setFilters(prev => ({
      ...prev,
      minPrice: preset.min,
      maxPrice: preset.max
    }));
    setMinInput(preset.min != null ? String(preset.min) : '');
    setMaxInput(preset.max != null ? String(preset.max) : '');
  };

  const applyCustomPrice = () => {
    setPricePreset(null);
    setFilters(prev => ({
      ...prev,
      minPrice: minInput ? Number(minInput) : undefined,
      maxPrice: maxInput ? Number(maxInput) : undefined
    }));
  };

  const resetFilters = () => {
    setSelectedColors([]);
    setPricePreset(null);
    setMinInput('');
    setMaxInput('');
    setFilters({
      categoryId: filters.categoryId || 'all',
      subcategory: filters.subcategory,
      sortBy: 'recommended'
    });
  };

  const FilterSidebar = ({ mobile = false }: { mobile?: boolean }) => (
    <div className={`space-y-1 ${mobile ? '' : 'bg-white border border-gray-200 p-4 sticky top-24'}`}>
      <div className="flex items-center justify-between border-b border-gray-100 pb-3 mb-2">
        <h3 className="font-black text-sm uppercase tracking-wider text-gray-900 flex items-center gap-1.5">
          <Filter className="w-4 h-4" /> Filter
        </h3>
        <button onClick={resetFilters} className="text-xs font-bold text-gray-400 hover:text-black">
          Reset
        </button>
      </div>

      {/* Subcategories */}
      {subcategoryOptions.length > 0 && (
        <div className="border-b border-gray-100 py-3">
          <button
            type="button"
            onClick={() => toggleSection('subcategory')}
            className="w-full flex items-center justify-between text-xs font-black uppercase text-gray-900"
          >
            {selectedCategory?.name || 'Category'}
            {openSections.subcategory ? (
              <ChevronUp className="w-4 h-4" />
            ) : (
              <ChevronDown className="w-4 h-4" />
            )}
          </button>
          {openSections.subcategory && (
            <div className="mt-3 space-y-2 max-h-48 overflow-y-auto">
              <label className="flex items-center gap-2 text-xs font-semibold text-gray-700 cursor-pointer">
                <input
                  type="checkbox"
                  checked={!filters.subcategory}
                  onChange={() =>
                    setFilters(prev => ({ ...prev, subcategory: undefined }))
                  }
                  className="accent-black"
                />
                All {selectedCategory?.name}
              </label>
              {subcategoryOptions.map(sub => (
                <label
                  key={sub}
                  className="flex items-center gap-2 text-xs font-semibold text-gray-700 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={filters.subcategory === sub}
                    onChange={() =>
                      setFilters(prev => ({
                        ...prev,
                        subcategory: prev.subcategory === sub ? undefined : sub
                      }))
                    }
                    className="accent-black"
                  />
                  {sub}
                </label>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Color */}
      <div className="border-b border-gray-100 py-3">
        <button
          type="button"
          onClick={() => toggleSection('color')}
          className="w-full flex items-center justify-between text-xs font-black uppercase text-gray-900"
        >
          Color
          {openSections.color ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>
        {openSections.color && (
          <div className="mt-3 grid grid-cols-2 gap-2">
            {COLORS.map(c => {
              const active = selectedColors.includes(c.name);
              return (
                <button
                  key={c.name}
                  type="button"
                  onClick={() =>
                    setSelectedColors(prev =>
                      active ? prev.filter(x => x !== c.name) : [...prev, c.name]
                    )
                  }
                  className={`flex items-center gap-2 text-left text-xs font-semibold px-1 py-1 rounded ${
                    active ? 'bg-gray-100 text-black' : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <span
                    className="w-5 h-5 rounded-full border border-gray-300 shrink-0"
                    style={{
                      background: c.hex.startsWith('conic') ? undefined : c.hex,
                      backgroundImage: c.hex.startsWith('conic') ? c.hex : undefined
                    }}
                  />
                  {c.name}
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Price */}
      <div className="border-b border-gray-100 py-3">
        <button
          type="button"
          onClick={() => toggleSection('price')}
          className="w-full flex items-center justify-between text-xs font-black uppercase text-gray-900"
        >
          Price (ETB)
          {openSections.price ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>
        {openSections.price && (
          <div className="mt-3 space-y-2">
            {PRICE_PRESETS.map(p => (
              <label
                key={p.id}
                className="flex items-center gap-2 text-xs font-semibold text-gray-700 cursor-pointer"
              >
                <input
                  type="radio"
                  name={mobile ? 'price-m' : 'price-d'}
                  checked={pricePreset === p.id}
                  onChange={() => applyPricePreset(p)}
                  className="accent-black"
                />
                {p.label}
              </label>
            ))}
            <div className="flex items-center gap-2 pt-2">
              <input
                type="number"
                placeholder="Min"
                value={minInput}
                onChange={e => setMinInput(e.target.value)}
                className="w-full border border-gray-300 rounded px-2 py-1.5 text-xs"
              />
              <span className="text-gray-400 text-xs">—</span>
              <input
                type="number"
                placeholder="Max"
                value={maxInput}
                onChange={e => setMaxInput(e.target.value)}
                className="w-full border border-gray-300 rounded px-2 py-1.5 text-xs"
              />
              <button
                type="button"
                onClick={applyCustomPrice}
                className="shrink-0 px-2.5 py-1.5 bg-black text-white text-[10px] font-black rounded"
              >
                OK
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Location */}
      <div className="py-3">
        <button
          type="button"
          onClick={() => toggleSection('location')}
          className="w-full flex items-center justify-between text-xs font-black uppercase text-gray-900"
        >
          Addis Subcity
          {openSections.location ? (
            <ChevronUp className="w-4 h-4" />
          ) : (
            <ChevronDown className="w-4 h-4" />
          )}
        </button>
        {openSections.location && (
          <div className="mt-3 flex flex-wrap gap-1.5">
            {ADDIS_SUBCITIES.map(sc => (
              <button
                key={sc}
                type="button"
                onClick={() =>
                  setFilters(prev => ({ ...prev, subcity: sc === 'All' ? undefined : sc }))
                }
                className={`px-2.5 py-1 rounded-full text-[11px] font-bold border ${
                  filters.subcity === sc || (sc === 'All' && !filters.subcity)
                    ? 'bg-black text-white border-black'
                    : 'bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100'
                }`}
              >
                {sc}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="space-y-3 pt-3 border-t border-gray-100">
        <label className="flex items-center justify-between cursor-pointer text-xs font-bold text-gray-800">
          <span>Negotiable Prices</span>
          <input
            type="checkbox"
            checked={!!filters.isNegotiable}
            onChange={e => setFilters(prev => ({ ...prev, isNegotiable: e.target.checked }))}
            className="w-4 h-4 accent-black"
          />
        </label>
        <label className="flex items-center justify-between cursor-pointer text-xs font-bold text-gray-800">
          <span>Verified Sellers</span>
          <input
            type="checkbox"
            checked={!!filters.isVerifiedSeller}
            onChange={e => setFilters(prev => ({ ...prev, isVerifiedSeller: e.target.checked }))}
            className="w-4 h-4 accent-black"
          />
        </label>
      </div>
    </div>
  );

  return (
    <div className="bg-gray-50 min-h-screen pb-20">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-3 md:px-6 py-2.5 flex items-center gap-2 text-[11px] md:text-xs text-gray-500 font-medium overflow-x-auto scrollbar-none">
          <button
            onClick={() => {
              setActiveView('none');
              setMainTab('home');
            }}
            className="hover:text-black hover:underline shrink-0 flex items-center gap-1 font-bold text-gray-800"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Home
          </button>
          <span>/</span>
          {selectedCategory ? (
            <>
              <button
                onClick={() => openPLP(selectedCategory.id)}
                className="hover:text-black hover:underline shrink-0"
              >
                {selectedCategory.name}
              </button>
              {filters.subcategory && (
                <>
                  <span>/</span>
                  <span className="text-gray-900 font-bold shrink-0">{filters.subcategory}</span>
                </>
              )}
            </>
          ) : (
            <span className="text-gray-900 font-bold shrink-0">{pageTitle}</span>
          )}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-6 py-4">
        <div className="flex flex-col md:flex-row gap-5 items-start">
          {/* Desktop filters */}
          <aside className="hidden md:block w-56 lg:w-64 shrink-0">
            <FilterSidebar />
          </aside>

          {/* Results */}
          <div className="flex-1 w-full min-w-0 space-y-3">
            <div className="bg-white border border-gray-200 px-3 py-2.5 flex items-center justify-between gap-3 flex-wrap">
              <div>
                <h1 className="text-sm md:text-base font-black text-gray-900 leading-tight">
                  {pageTitle}
                </h1>
                <p className="text-[11px] text-gray-500 font-semibold mt-0.5">
                  {filteredListings.length} items
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setShowFilterSheet(true)}
                  className="md:hidden bg-black text-white px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5"
                >
                  <SlidersHorizontal className="w-3.5 h-3.5" />
                  Filter
                </button>

                <label className="hidden sm:flex items-center gap-2 text-xs font-bold text-gray-600">
                  Sort By
                  <select
                    value={filters.sortBy || 'recommended'}
                    onChange={e =>
                      setFilters(prev => ({
                        ...prev,
                        sortBy: e.target.value as FilterState['sortBy']
                      }))
                    }
                    className="border border-gray-300 rounded px-2 py-1.5 text-xs font-bold text-gray-900 bg-white"
                  >
                    <option value="recommended">Recommend</option>
                    <option value="newest">Newest</option>
                    <option value="popular">Most Popular</option>
                    <option value="price_low">Price: Low to High</option>
                    <option value="price_high">Price: High to Low</option>
                  </select>
                </label>
              </div>
            </div>

            {/* Quick subcategory chips */}
            {subcategoryOptions.length > 0 && (
              <div className="flex gap-2 overflow-x-auto scrollbar-none pb-1">
                <button
                  onClick={() => setFilters(prev => ({ ...prev, subcategory: undefined }))}
                  className={`shrink-0 px-3 py-1 rounded-full text-[11px] font-bold border ${
                    !filters.subcategory
                      ? 'bg-black text-white border-black'
                      : 'bg-white text-gray-700 border-gray-200'
                  }`}
                >
                  All
                </button>
                {subcategoryOptions.map(sub => (
                  <button
                    key={sub}
                    onClick={() =>
                      setFilters(prev => ({
                        ...prev,
                        subcategory: prev.subcategory === sub ? undefined : sub
                      }))
                    }
                    className={`shrink-0 px-3 py-1 rounded-full text-[11px] font-bold border ${
                      filters.subcategory === sub
                        ? 'bg-black text-white border-black'
                        : 'bg-white text-gray-700 border-gray-200'
                    }`}
                  >
                    {sub}
                  </button>
                ))}
              </div>
            )}

            {filteredListings.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2.5 md:gap-3">
                {filteredListings.map(listing => (
                  <ProductCard key={listing.id} listing={listing} />
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-2xl p-12 text-center border border-gray-200">
                <Sparkles className="w-10 h-10 text-gray-400 mx-auto mb-3" />
                <h3 className="text-base font-extrabold text-gray-900">No listings found</h3>
                <p className="text-xs text-gray-500 mt-1">Try clearing filters or browse another category.</p>
                <button
                  onClick={resetFilters}
                  className="mt-5 px-5 py-2.5 bg-black text-white font-extrabold text-xs rounded-full"
                >
                  Clear Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile filter sheet */}
      {showFilterSheet && (
        <div className="md:hidden fixed inset-0 z-50 bg-black/60 flex items-end justify-center">
          <div className="w-full max-w-md bg-white rounded-t-2xl max-h-[85vh] overflow-y-auto flex flex-col shadow-2xl">
            <div className="p-4 border-b border-gray-100 flex items-center justify-between sticky top-0 bg-white z-10">
              <h3 className="font-black text-sm uppercase text-gray-900">Filter & Sort</h3>
              <button
                onClick={() => setShowFilterSheet(false)}
                className="p-1 rounded-full text-gray-400 hover:bg-gray-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-4">
              <div className="mb-4">
                <label className="text-xs font-bold uppercase text-gray-500 block mb-2">Sort By</label>
                <div className="grid grid-cols-2 gap-2">
                  {(
                    [
                      ['recommended', 'Recommend'],
                      ['newest', 'Newest'],
                      ['price_low', 'Price ↑'],
                      ['price_high', 'Price ↓']
                    ] as const
                  ).map(([id, label]) => (
                    <button
                      key={id}
                      onClick={() =>
                        setFilters(prev => ({ ...prev, sortBy: id as FilterState['sortBy'] }))
                      }
                      className={`p-2.5 rounded-lg text-xs font-bold border ${
                        filters.sortBy === id
                          ? 'border-black bg-black text-white'
                          : 'border-gray-200 text-gray-700 bg-gray-50'
                      }`}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>
              <FilterSidebar mobile />
            </div>
            <div className="p-4 border-t border-gray-100 grid grid-cols-2 gap-3 sticky bottom-0 bg-white">
              <button
                onClick={() => {
                  resetFilters();
                  setShowFilterSheet(false);
                }}
                className="py-3 bg-gray-100 font-bold text-xs text-gray-700 rounded-xl"
              >
                Reset
              </button>
              <button
                onClick={() => setShowFilterSheet(false)}
                className="py-3 bg-black font-bold text-xs text-white rounded-xl"
              >
                Show {filteredListings.length} Results
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
