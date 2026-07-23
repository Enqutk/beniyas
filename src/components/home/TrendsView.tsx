import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Search, Heart, Sparkles, ShoppingBag, Star, ChevronRight, SlidersHorizontal } from 'lucide-react';

export const TrendsView: React.FC = () => {
  const { listings, openPDP, openPLP, toggleFavorite, isFavorite } = useApp();
  const [activeTab, setActiveTab] = useState<'picks' | 'store'>('picks');
  const [selectedTag, setSelectedTag] = useState<string>('For You');

  const tags = ['For You', '#LeatherTote', '#CleanGirl', '#WorkwearBasics', '#PolishedPieces', '#CyclingChic'];

  // Banner products mockup
  const heroProducts = [
    { id: 'h1', price: '$7.00', brand: 'Firerie', image: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=400&auto=format&fit=crop&q=80' },
    { id: 'h2', price: '$8.30', brand: 'RosyDaze', image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400&auto=format&fit=crop&q=80' },
    { id: 'h3', price: '$7.30', brand: 'BizChic', image: 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=400&auto=format&fit=crop&q=80' }
  ];

  return (
    <div className="bg-gray-50 min-h-screen pb-24">
      {/* Top Header */}
      <div className="bg-zinc-900 text-white px-4 py-3 flex items-center justify-between sticky top-0 z-30 shadow-md">
        <div className="flex items-center gap-2">
          <span className="font-serif italic text-2xl font-black tracking-tight text-white flex items-center gap-1">
            <Sparkles className="w-5 h-5 text-amber-300" />
            Trends
          </span>
        </div>
        <div className="flex items-center gap-3">
          <button className="p-1 hover:bg-zinc-800 rounded-full">
            <Search className="w-5 h-5 text-white" />
          </button>
          <button className="p-1 hover:bg-zinc-800 rounded-full">
            <Heart className="w-5 h-5 text-white" />
          </button>
        </div>
      </div>

      {/* Hero Glassmorphic Banner */}
      <div className="p-3">
        <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-neutral-800 via-stone-800 to-amber-950 text-white p-4 shadow-lg border border-white/10">
          <div className="flex items-center justify-between mb-1">
            <div className="flex items-center gap-1.5 text-lg font-black text-white">
              <span className="text-purple-400">#</span> PolishedPieces
              <ChevronRight className="w-5 h-5 text-gray-300" />
            </div>
            <span className="text-[10px] font-mono text-gray-300 bg-white/10 px-2 py-0.5 rounded-full">1 / 7</span>
          </div>
          <p className="text-xs text-gray-300 mb-3 opacity-90">
            The key to any polished look: it's all in the details.
          </p>

          {/* Mini product preview cards */}
          <div className="grid grid-cols-3 gap-2">
            {heroProducts.map((item, idx) => (
              <div
                key={idx}
                onClick={() => openPDP(listings[idx]?.id || '1')}
                className="bg-white text-gray-900 rounded-xl p-1.5 shadow-md flex flex-col items-center cursor-pointer hover:scale-105 transition-transform"
              >
                <div className="w-full aspect-square rounded-lg overflow-hidden bg-gray-100 mb-1">
                  <img src={item.image} alt={item.brand} className="w-full h-full object-cover" />
                </div>
                <span className="text-xs font-black text-black">{item.price}</span>
                <span className="text-[9px] font-bold text-gray-400">{item.brand}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Section Tabs */}
      <div className="bg-white border-b border-gray-200 flex items-center justify-around text-xs font-black text-gray-600">
        <button
          onClick={() => setActiveTab('picks')}
          className={`py-3 px-4 border-b-2 ${
            activeTab === 'picks'
              ? 'border-black text-black font-black'
              : 'border-transparent text-gray-400'
          }`}
        >
          Trending Picks
        </button>
        <button
          onClick={() => setActiveTab('store')}
          className={`py-3 px-4 border-b-2 ${
            activeTab === 'store'
              ? 'border-black text-black font-black'
              : 'border-transparent text-gray-400'
          }`}
        >
          Trends Store
        </button>
      </div>

      {/* Horizontal Pill Filters */}
      <div className="px-3 py-2 bg-white flex items-center gap-2 overflow-x-auto scrollbar-none border-b border-gray-100">
        {tags.map((tag) => (
          <button
            key={tag}
            onClick={() => setSelectedTag(tag)}
            className={`shrink-0 text-xs font-bold px-3 py-1.5 rounded-md transition-all ${
              selectedTag === tag
                ? 'bg-purple-100 text-purple-900 font-black border border-purple-300'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {tag}
          </button>
        ))}
        <button className="shrink-0 p-1.5 bg-gray-100 text-gray-600 rounded-md">
          <SlidersHorizontal className="w-4 h-4" />
        </button>
      </div>

      {/* Dense 2-Column Trends Product Grid */}
      <div className="p-3 grid grid-cols-2 gap-2.5">
        {listings.map((listing, index) => {
          const discount = listing.discountPercentage || 25;
          const tagLabel = index % 2 === 0 ? '#PolishedPieces' : '#CyclingChic';
          const isFav = isFavorite(listing.id);

          return (
            <div
              key={listing.id}
              onClick={() => openPDP(listing.id)}
              className="bg-white rounded-xl overflow-hidden border border-gray-200/80 shadow-2xs group flex flex-col justify-between cursor-pointer"
            >
              <div className="relative aspect-3/4 overflow-hidden bg-gray-100">
                <img
                  src={listing.images[0]}
                  alt={listing.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />

                {/* Brand name top left */}
                <span className="absolute top-2 left-2 text-[10px] font-extrabold uppercase text-gray-900 bg-white/80 backdrop-blur-xs px-1.5 py-0.5 rounded-xs">
                  {listing.sellerName.split(' ')[0]}
                </span>

                {/* Favorite Heart top right */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleFavorite(listing.id);
                  }}
                  className="absolute top-2 right-2 p-1.5 rounded-full bg-white/80 text-gray-700 hover:text-red-600 shadow-xs"
                >
                  <Heart className={`w-3.5 h-3.5 ${isFav ? 'fill-red-500 text-red-500' : ''}`} />
                </button>

                {/* Bottom left Trend Tag Pill */}
                <div className="absolute bottom-2 left-2 bg-[#8B5CF6] text-white text-[9px] font-black px-2 py-0.5 rounded-sm flex items-center gap-1 shadow-sm">
                  <span>Trends</span>
                  <span>{tagLabel}</span>
                  <ChevronRight className="w-3 h-3" />
                </div>
              </div>

              {/* Details */}
              <div className="p-2.5 flex-1 flex flex-col justify-between space-y-1">
                <div>
                  <h4 className="text-xs font-bold text-gray-900 line-clamp-1 leading-snug">
                    {listing.title}
                  </h4>
                  <p className="text-[10px] font-semibold text-amber-600 line-clamp-1 mt-0.5">
                    #{(index % 9) + 1} Bestseller in {listing.subcategory}
                  </p>
                </div>

                {/* Rating & Sold count */}
                <div className="flex items-center gap-1 text-[10px] text-gray-500">
                  <span className="font-bold text-gray-800">100+ sold</span>
                  <span>|</span>
                  <div className="flex items-center text-amber-400">
                    <Star className="w-3 h-3 fill-amber-400" />
                    <span className="ml-0.5 text-gray-700 font-bold">4.9</span>
                  </div>
                </div>

                {/* Price row */}
                <div className="flex items-center justify-between pt-1">
                  <div>
                    <div className="flex items-baseline gap-1">
                      <span className="text-sm font-black text-[#FF3F6C]">
                        ${listing.price}
                      </span>
                      <span className="text-[10px] font-bold text-[#FF3F6C] bg-pink-50 px-1 rounded-xs">
                        -{discount}%
                      </span>
                    </div>
                    <span className="text-[9px] font-medium text-gray-400 block">Estimated Price</span>
                  </div>

                  <button className="p-1.5 bg-gray-100 hover:bg-black hover:text-white text-gray-900 rounded-lg transition-colors">
                    <ShoppingBag className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
