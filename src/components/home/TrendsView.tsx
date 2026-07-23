import React, { useMemo, useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Search,
  Heart,
  Sparkles,
  ShoppingBag,
  Star,
  ChevronRight,
  SlidersHorizontal
} from 'lucide-react';

const TREND_COLLECTIONS = [
  {
    id: 'polished',
    tag: '#PolishedPieces',
    caption: "The key to any polished look; it's all in the details.",
    images: [
      'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=600&auto=format&fit=crop&q=80'
    ]
  },
  {
    id: 'cutout',
    tag: '#CutOutDetails',
    caption: 'Unveil the season’s most sought-after silhouettes and elevated essentials.',
    images: [
      'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=600&auto=format&fit=crop&q=80'
    ]
  },
  {
    id: 'workwear',
    tag: '#WorkwearBasics',
    caption: 'Sharp office-ready layers that still feel effortless.',
    images: [
      'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1487222477894-6973a9c3fd54?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=600&auto=format&fit=crop&q=80'
    ]
  },
  {
    id: 'cycling',
    tag: '#CyclingChic',
    caption: 'Sporty polish for city rides and weekend runs.',
    images: [
      'https://images.unsplash.com/photo-1518310383802-640c2de311b2?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1475180098004-ca77a66827be?w=600&auto=format&fit=crop&q=80'
    ]
  },
  {
    id: 'leather',
    tag: '#LeatherTote',
    caption: 'Carry the look — structured bags and leather accents.',
    images: [
      'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1590874103328-eac38a67478e?w=600&auto=format&fit=crop&q=80'
    ]
  },
  {
    id: 'clean',
    tag: '#CleanGirl',
    caption: 'Soft neutrals, fresh skin, quiet luxury vibes.',
    images: [
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=600&auto=format&fit=crop&q=80'
    ]
  },
  {
    id: 'glam',
    tag: '#StatementGlam',
    caption: 'Bold nights out — shine, color, and attitude.',
    images: [
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=600&auto=format&fit=crop&q=80'
    ]
  }
];

const TAGS = ['For You', ...TREND_COLLECTIONS.map(c => c.tag)];

export const TrendsView: React.FC = () => {
  const {
    listings,
    openPDP,
    toggleFavorite,
    isFavorite,
    addToCart,
    setActiveView,
    setMainTab
  } = useApp();

  const [activeTab, setActiveTab] = useState<'picks' | 'store'>('picks');
  const [selectedTag, setSelectedTag] = useState('For You');
  const [collectionIndex, setCollectionIndex] = useState(0);

  const collection = TREND_COLLECTIONS[collectionIndex] || TREND_COLLECTIONS[0];

  const trendListings = useMemo(() => {
    const fashion = listings.filter(l => l.categoryId === 'fashion');
    const pool = fashion.length > 0 ? fashion : listings;
    return pool.slice(0, 24);
  }, [listings]);

  const goToCollection = (index: number) => {
    setCollectionIndex(index);
    setSelectedTag(TREND_COLLECTIONS[index]?.tag || 'For You');
  };

  const onSelectTag = (tag: string) => {
    setSelectedTag(tag);
    if (tag === 'For You') return;
    const idx = TREND_COLLECTIONS.findIndex(c => c.tag === tag);
    if (idx >= 0) setCollectionIndex(idx);
  };

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
          <button
            type="button"
            onClick={() => setActiveView('search')}
            className="p-1 hover:bg-zinc-800 rounded-full"
            aria-label="Search"
          >
            <Search className="w-5 h-5 text-white" />
          </button>
          <button
            type="button"
            onClick={() => setActiveView('saved')}
            className="p-1 hover:bg-zinc-800 rounded-full"
            aria-label="Saved"
          >
            <Heart className="w-5 h-5 text-white" />
          </button>
        </div>
      </div>

      {/* Editorial hero — Shein mobile glass card with product tiles */}
      <div className="relative">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-40"
          style={{ backgroundImage: `url(${collection.images[0]})` }}
        />
        <div className="relative p-3 md:p-4">
          <div className="rounded-2xl overflow-hidden bg-black/45 backdrop-blur-md text-white p-3.5 md:p-5 shadow-lg border border-white/15">
            <div className="flex items-start justify-between gap-3 mb-1">
              <button
                type="button"
                onClick={() => goToCollection((collectionIndex + 1) % TREND_COLLECTIONS.length)}
                className="flex items-center gap-1 text-base md:text-xl font-black text-white hover:opacity-90 text-left"
              >
                <span>{collection.tag}</span>
                <ChevronRight className="w-5 h-5 text-gray-200 shrink-0" />
              </button>
              <span className="text-[10px] font-mono text-gray-200 bg-white/10 px-2 py-0.5 rounded-full shrink-0">
                {collectionIndex + 1} / {TREND_COLLECTIONS.length}
              </span>
            </div>

            <p className="text-[11px] md:text-sm text-gray-200 mb-3 opacity-95 max-w-xl">
              {collection.caption}
            </p>

            {/* Mobile: product price tiles | Desktop: tall editorial images */}
            <div className="grid grid-cols-3 gap-2 md:gap-3">
              {collection.images.map((src, idx) => {
                const listing = trendListings[idx] || trendListings[0];
                const brands = ['Firerie', 'RosyDaze', 'BizChic'];
                return (
                  <button
                    key={`${collection.id}-${idx}`}
                    type="button"
                    onClick={() => listing && openPDP(listing.id)}
                    className="relative rounded-xl overflow-hidden bg-white text-left group"
                  >
                    <div className="aspect-3/4 overflow-hidden bg-gray-200">
                      <img
                        src={src}
                        alt={`${collection.tag} look ${idx + 1}`}
                        className="w-full h-full object-cover group-active:scale-105 transition-transform"
                      />
                    </div>
                    <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/70 to-transparent p-1.5 pt-6">
                      <span className="inline-block bg-white text-black text-[10px] font-black px-1.5 py-0.5 rounded-sm mb-0.5">
                        {listing
                          ? `${Math.max(450, Math.round(listing.price / 100)).toLocaleString()} ETB`
                          : `${7 + idx}.00`}
                      </span>
                      <span className="block text-[9px] font-bold text-white/90 truncate">
                        {brands[idx % brands.length]}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="flex items-center justify-center gap-1.5 mt-3">
              {TREND_COLLECTIONS.map((c, i) => (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => goToCollection(i)}
                  className={`h-1.5 rounded-full transition-all ${
                    i === collectionIndex ? 'w-5 bg-white' : 'w-1.5 bg-white/35'
                  }`}
                  aria-label={`Show ${c.tag}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Section Tabs */}
      <div className="bg-white border-b border-gray-200 flex items-center justify-around text-xs font-black text-gray-600">
        <button
          type="button"
          onClick={() => setActiveTab('picks')}
          className={`py-3 px-4 border-b-2 ${
            activeTab === 'picks' ? 'border-black text-black' : 'border-transparent text-gray-400'
          }`}
        >
          Trending Picks
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('store')}
          className={`py-3 px-4 border-b-2 ${
            activeTab === 'store' ? 'border-black text-black' : 'border-transparent text-gray-400'
          }`}
        >
          Trends Store
        </button>
      </div>

      {/* Tag pills */}
      <div className="px-3 py-2 bg-white flex items-center gap-2 overflow-x-auto scrollbar-none border-b border-gray-100">
        {TAGS.map(tag => (
          <button
            key={tag}
            type="button"
            onClick={() => onSelectTag(tag)}
            className={`shrink-0 text-xs font-bold px-3 py-1.5 rounded-md transition-all ${
              selectedTag === tag
                ? 'bg-purple-100 text-purple-900 border border-purple-300'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {tag}
          </button>
        ))}
        <button type="button" className="shrink-0 p-1.5 bg-gray-100 text-gray-600 rounded-md">
          <SlidersHorizontal className="w-4 h-4" />
        </button>
      </div>

      {/* Product grid — 2 cols mobile (Shein), denser on desktop */}
      <div className="p-2.5 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 max-w-7xl mx-auto">
        {trendListings.map((listing, index) => {
          const discount = listing.discountPercentage || 15 + (index % 10);
          const tagLabel =
            selectedTag !== 'For You'
              ? selectedTag
              : index % 2 === 0
                ? '#PolishedPieces'
                : '#CyclingChic';
          const isFav = isFavorite(listing.id);

          return (
            <div
              key={listing.id}
              onClick={() => openPDP(listing.id)}
              className="bg-white rounded-xl overflow-hidden border border-gray-200/80 shadow-2xs group flex flex-col cursor-pointer"
            >
              <div className="relative aspect-3/4 overflow-hidden bg-gray-100">
                <img
                  src={listing.images[0]}
                  alt={listing.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <span className="absolute top-2 left-2 text-[10px] font-extrabold uppercase text-gray-900 bg-white/80 backdrop-blur-xs px-1.5 py-0.5 rounded-xs">
                  {listing.sellerName.split(' ')[0]}
                </span>
                <button
                  type="button"
                  onClick={e => {
                    e.stopPropagation();
                    toggleFavorite(listing.id);
                  }}
                  className="absolute top-2 right-2 p-1.5 rounded-full bg-white/80 text-gray-700 hover:text-red-600 shadow-xs"
                >
                  <Heart className={`w-3.5 h-3.5 ${isFav ? 'fill-red-500 text-red-500' : ''}`} />
                </button>
                <button
                  type="button"
                  onClick={e => {
                    e.stopPropagation();
                    setMainTab('trends');
                    setActiveView('none');
                    onSelectTag(tagLabel.startsWith('#') ? tagLabel : `#${tagLabel}`);
                  }}
                  className="absolute bottom-2 left-2 bg-[#8B5CF6] text-white text-[9px] font-black px-2 py-0.5 rounded-sm flex items-center gap-1 shadow-sm hover:bg-purple-700"
                >
                  <span>Trends</span>
                  <span>{tagLabel}</span>
                  <ChevronRight className="w-3 h-3" />
                </button>
              </div>

              <div className="p-2.5 flex-1 flex flex-col justify-between space-y-1">
                <div>
                  <h4 className="text-xs font-bold text-gray-900 line-clamp-1 leading-snug">
                    {listing.title}
                  </h4>
                  <p className="text-[10px] font-semibold text-amber-600 line-clamp-1 mt-0.5">
                    #{(index % 9) + 1} Bestseller in {listing.subcategory}
                  </p>
                </div>

                <div className="flex items-center gap-1 text-[10px] text-gray-500">
                  <span className="font-bold text-gray-800">
                    {100 + index * 37}+ sold
                  </span>
                  <span>|</span>
                  <div className="flex items-center text-amber-400">
                    <Star className="w-3 h-3 fill-amber-400" />
                    <span className="ml-0.5 text-gray-700 font-bold">4.9</span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-1">
                  <div>
                    <div className="flex items-baseline gap-1">
                      <span className="text-sm font-black text-[#FF3F6C]">
                        {listing.price.toLocaleString()} ETB
                      </span>
                      <span className="text-[10px] font-bold text-[#FF3F6C] bg-pink-50 px-1 rounded-xs">
                        -{discount}%
                      </span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={e => {
                      e.stopPropagation();
                      addToCart(
                        listing,
                        listing.availableSizes?.[0] || 'M',
                        listing.availableColors?.[0] || 'Black',
                        1
                      );
                    }}
                    className="p-1.5 bg-gray-100 hover:bg-black hover:text-white text-gray-900 rounded-lg transition-colors"
                  >
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
