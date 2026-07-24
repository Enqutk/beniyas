'use client';

import React, { useMemo, useState } from 'react';
import { useApp } from '../../context/AppContext';
import { SafeImage } from '../common/SafeImage';
import {
  Search,
  Heart,
  Sparkles,
  ShoppingBag,
  Star,
  ChevronRight,
  SlidersHorizontal,
  ArrowLeft
} from 'lucide-react';

const TREND_COLLECTIONS = [
  {
    id: 'polished',
    tag: '#PolishedPieces',
    caption: 'Elevated essentials for everyday polish.',
    images: [
      'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=500&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=500&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=500&auto=format&fit=crop&q=80'
    ]
  },
  {
    id: 'cutout',
    tag: '#CutOutDetails',
    caption: 'Season silhouettes with bold cutouts.',
    images: [
      'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=500&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=500&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=500&auto=format&fit=crop&q=80'
    ]
  },
  {
    id: 'workwear',
    tag: '#WorkwearBasics',
    caption: 'Sharp layers that still feel easy.',
    images: [
      'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=500&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1487222477894-6973a9c3fd54?w=500&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=500&auto=format&fit=crop&q=80'
    ]
  },
  {
    id: 'cycling',
    tag: '#CyclingChic',
    caption: 'Sporty polish for city days.',
    images: [
      'https://images.unsplash.com/photo-1518310383802-640c2de311b2?w=500&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=500&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1475180098004-ca77a66827be?w=500&auto=format&fit=crop&q=80'
    ]
  },
  {
    id: 'leather',
    tag: '#LeatherTote',
    caption: 'Structured bags & leather accents.',
    images: [
      'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=500&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=500&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1590874103328-eac38a67478e?w=500&auto=format&fit=crop&q=80'
    ]
  },
  {
    id: 'clean',
    tag: '#CleanGirl',
    caption: 'Soft neutrals & quiet luxury.',
    images: [
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=500&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=500&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=500&auto=format&fit=crop&q=80'
    ]
  },
  {
    id: 'glam',
    tag: '#StatementGlam',
    caption: 'Shine, color, and night-out energy.',
    images: [
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=500&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=500&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=500&auto=format&fit=crop&q=80'
    ]
  }
];

const LOOK_IMAGES = [
  'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=500&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=500&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=500&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=500&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=500&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=500&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=500&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1487222477894-6973a9c3fd54?w=500&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=500&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=500&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=500&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=500&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=500&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=500&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=500&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=500&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=500&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1445205170230-053b83016050?w=500&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=500&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=500&auto=format&fit=crop&q=80'
];

const TAGS = ['For You', ...TREND_COLLECTIONS.map(c => c.tag)];
const BRANDS = ['Firerie', 'RosyDaze', 'BizChic', 'Lumen', 'Noir'];

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
    const seen = new Set<string>();
    const unique = pool.filter(l => {
      if (seen.has(l.id)) return false;
      seen.add(l.id);
      return true;
    });

    return unique.slice(0, 20).map((listing, i) => ({
      ...listing,
      // Cap display price into fashion-friendly range for Trends
      displayPrice: Math.min(listing.price, 450 + ((i * 173) % 4200)),
      cover: LOOK_IMAGES[i % LOOK_IMAGES.length],
      brand: BRANDS[i % BRANDS.length],
      tag:
        selectedTag !== 'For You'
          ? selectedTag
          : TREND_COLLECTIONS[i % TREND_COLLECTIONS.length].tag
    }));
  }, [listings, selectedTag]);

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
    <div className="bg-[#F5F5F5] min-h-screen pb-24">
      {/* Compact header */}
      <header className="bg-zinc-900 text-white px-3 py-2.5 flex items-center justify-between sticky top-0 z-30">
        <div className="flex items-center gap-1 min-w-0">
          <button
            type="button"
            onClick={() => {
              setMainTab('home');
              setActiveView('none');
            }}
            className="md:hidden p-1.5 rounded-full hover:bg-zinc-800 shrink-0"
            aria-label="Back to shop"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <span className="font-serif italic text-lg font-black tracking-tight flex items-center gap-1">
            <Sparkles className="w-4 h-4 text-amber-300" />
            Trends
          </span>
        </div>
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => setActiveView('search')}
            className="p-1.5 hover:bg-zinc-800 rounded-full"
            aria-label="Search"
          >
            <Search className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => setActiveView('saved')}
            className="p-1.5 hover:bg-zinc-800 rounded-full"
            aria-label="Saved"
          >
            <Heart className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Compact editorial strip — short fixed-height tiles */}
      <section className="bg-zinc-900 px-3 pt-2 pb-3 max-w-3xl mx-auto md:rounded-b-2xl">
        <div className="flex items-center justify-between gap-2 mb-1.5">
          <button
            type="button"
            onClick={() => goToCollection((collectionIndex + 1) % TREND_COLLECTIONS.length)}
            className="flex items-center gap-0.5 text-sm font-black text-white truncate"
          >
            {collection.tag}
            <ChevronRight className="w-4 h-4 shrink-0 opacity-70" />
          </button>
          <span className="text-[10px] font-mono text-white/60 shrink-0">
            {collectionIndex + 1}/{TREND_COLLECTIONS.length}
          </span>
        </div>
        <p className="text-[11px] text-white/70 mb-2 line-clamp-1">{collection.caption}</p>

        <div className="grid grid-cols-3 gap-1.5">
          {collection.images.map((src, idx) => {
            const listing = trendListings[idx];
            const price = listing
              ? Math.max(390, Math.round(listing.displayPrice / 4))
              : 450 + idx * 120;
            return (
              <button
                key={`${collection.id}-${idx}`}
                type="button"
                onClick={() => listing && openPDP(listing.id)}
                className="relative rounded-lg overflow-hidden bg-zinc-800 text-left active:opacity-90 h-28 sm:h-32 md:h-36"
              >
                <SafeImage
                  src={src}
                  alt=""
                  fallbackSeed={`${collection.id}-${idx}`}
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-x-0 bottom-0 p-1.5 bg-gradient-to-t from-black/85 to-transparent">
                  <span className="inline-block bg-white text-black text-[9px] font-black px-1.5 py-0.5 rounded-sm">
                    {price.toLocaleString()} ETB
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        <div className="flex items-center justify-center gap-1 mt-2">
          {TREND_COLLECTIONS.map((c, i) => (
            <button
              key={c.id}
              type="button"
              onClick={() => goToCollection(i)}
              className={`h-1 rounded-full transition-all ${
                i === collectionIndex ? 'w-4 bg-brand' : 'w-1 bg-white/35'
              }`}
              aria-label={c.tag}
            />
          ))}
        </div>
      </section>

      {/* Tabs */}
      <div className="bg-white grid grid-cols-2 text-xs font-black border-b border-gray-200 sticky top-[44px] z-20">
        <button
          type="button"
          onClick={() => setActiveTab('picks')}
          className={`py-2.5 text-center border-b-2 ${
            activeTab === 'picks' ? 'border-ink text-ink' : 'border-transparent text-gray-400'
          }`}
        >
          Trending Picks
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('store')}
          className={`py-2.5 text-center border-b-2 ${
            activeTab === 'store' ? 'border-ink text-ink' : 'border-transparent text-gray-400'
          }`}
        >
          Trends Store
        </button>
      </div>

      {/* Tags */}
      <div className="px-2.5 py-2 bg-white flex items-center gap-1.5 overflow-x-auto scrollbar-none border-b border-gray-100">
        {TAGS.map(tag => (
          <button
            key={tag}
            type="button"
            onClick={() => onSelectTag(tag)}
            className={`shrink-0 text-[11px] font-bold px-2.5 py-1 rounded-md transition-colors ${
              selectedTag === tag
                ? 'bg-brand text-white'
                : 'bg-gray-100 text-gray-600'
            }`}
          >
            {tag}
          </button>
        ))}
        <button type="button" className="shrink-0 p-1.5 bg-gray-100 text-gray-500 rounded-md" aria-label="Filters">
          <SlidersHorizontal className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Dense compact product grid */}
      <div className="p-2 max-w-5xl mx-auto">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
          {trendListings.map((listing, index) => {
            const fav = isFavorite(listing.id);
            const discount = listing.discountPercentage || 10 + (index % 25);
            return (
              <article
                key={listing.id}
                className="bg-white rounded-lg overflow-hidden border border-gray-100 shadow-sm flex flex-col"
              >
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => openPDP(listing.id)}
                    className="block w-full text-left"
                  >
                    <div className="aspect-square bg-gray-100 overflow-hidden">
                      <SafeImage
                        src={listing.cover}
                        alt={listing.title}
                        fallbackSeed={listing.id}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </button>

                  <span className="pointer-events-none absolute top-1.5 left-1.5 text-[8px] font-black uppercase tracking-wide bg-white/95 text-ink px-1.5 py-0.5 rounded-sm">
                    {listing.brand}
                  </span>

                  <span className="pointer-events-none absolute top-1.5 right-8 text-[8px] font-black bg-red-500 text-white px-1 py-0.5 rounded-sm">
                    -{discount}%
                  </span>

                  <button
                    type="button"
                    onClick={() => toggleFavorite(listing.id)}
                    className="absolute top-1 right-1 w-6 h-6 rounded-full bg-white/95 shadow flex items-center justify-center"
                    aria-label="Save"
                  >
                    <Heart className={`w-3 h-3 ${fav ? 'fill-red-500 text-red-500' : 'text-gray-600'}`} />
                  </button>

                  <span className="pointer-events-none absolute bottom-1.5 left-1.5 max-w-[90%] truncate text-[8px] font-bold bg-brand text-white px-1.5 py-0.5 rounded-sm">
                    {listing.tag}
                  </span>
                </div>

                <div className="p-2 flex flex-col gap-1 flex-1">
                  <button type="button" onClick={() => openPDP(listing.id)} className="text-left">
                    <h3 className="text-[11px] font-semibold text-ink leading-snug line-clamp-2 min-h-[2.2em]">
                      {listing.title}
                    </h3>
                    <div className="flex items-center gap-1 mt-0.5 text-[9px] text-gray-500">
                      <Star className="w-2.5 h-2.5 fill-amber-400 text-amber-400" />
                      <span className="font-bold text-gray-700">4.{8 + (index % 2)}</span>
                      <span>·</span>
                      <span>{80 + index * 11}+ sold</span>
                    </div>
                  </button>

                  <div className="mt-auto flex items-center justify-between gap-1 pt-0.5">
                    <p className="text-sm font-black text-brand leading-none truncate">
                      {listing.displayPrice.toLocaleString()}
                      <span className="text-[9px] font-bold text-gray-500 ml-0.5">ETB</span>
                    </p>
                    <button
                      type="button"
                      onClick={() =>
                        addToCart(
                          listing,
                          listing.availableSizes?.[0] || 'M',
                          listing.availableColors?.[0] || 'Black',
                          1
                        )
                      }
                      className="shrink-0 w-7 h-7 rounded-md bg-brand-soft text-ink flex items-center justify-center hover:bg-brand hover:text-white transition-colors"
                      aria-label="Add to bag"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </div>
  );
};
