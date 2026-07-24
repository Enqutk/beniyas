import React, { useMemo, useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ProductCard } from '../common/ProductCard';
import { SafeImage } from '../common/SafeImage';
import {
  Search,
  Heart,
  Sparkles,
  ChevronRight,
  SlidersHorizontal,
  ArrowLeft
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

/** Extra unique looks so the grid doesn’t recycle the same 4 fashion catalog shots */
const TREND_LOOK_IMAGES = [
  'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=600&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=600&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=600&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=600&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=600&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=600&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1487222477894-6973a9c3fd54?w=600&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=600&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=600&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=600&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=600&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=600&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=600&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=600&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=600&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1518310383802-640c2de311b2?w=600&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=600&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1475180098004-ca77a66827be?w=600&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1590874103328-eac38a67478e?w=600&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=600&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=600&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1445205170230-053b83016050?w=600&auto=format&fit=crop&q=80'
];

const TAGS = ['For You', ...TREND_COLLECTIONS.map(c => c.tag)];

export const TrendsView: React.FC = () => {
  const { listings, openPDP, setActiveView, setMainTab } = useApp();

  const [activeTab, setActiveTab] = useState<'picks' | 'store'>('picks');
  const [selectedTag, setSelectedTag] = useState('For You');
  const [collectionIndex, setCollectionIndex] = useState(0);

  const collection = TREND_COLLECTIONS[collectionIndex] || TREND_COLLECTIONS[0];

  const trendListings = useMemo(() => {
    const fashion = listings.filter(l => l.categoryId === 'fashion');
    const pool = fashion.length > 0 ? fashion : listings;
    // Deduplicate by id, then remap images so the grid doesn’t show the same 4 shots
    const seen = new Set<string>();
    const unique = pool.filter(l => {
      if (seen.has(l.id)) return false;
      seen.add(l.id);
      return true;
    });

    return unique.slice(0, 24).map((listing, i) => ({
      ...listing,
      images: [TREND_LOOK_IMAGES[i % TREND_LOOK_IMAGES.length], ...listing.images.slice(1)]
    }));
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
      <div className="bg-zinc-900 text-white px-3 md:px-4 py-3 flex items-center justify-between sticky top-0 z-30 shadow-md">
        <div className="flex items-center gap-1.5 min-w-0">
          <button
            type="button"
            onClick={() => {
              setMainTab('home');
              setActiveView('none');
            }}
            className="md:hidden p-1.5 -ml-0.5 rounded-full hover:bg-zinc-800 shrink-0"
            aria-label="Back to shop"
          >
            <ArrowLeft className="w-5 h-5 text-white" />
          </button>
          <span className="font-serif italic text-xl md:text-2xl font-black tracking-tight text-white flex items-center gap-1">
            <Sparkles className="w-5 h-5 text-amber-300 shrink-0" />
            Trends
          </span>
        </div>
        <div className="flex items-center gap-2 md:gap-3 shrink-0">
          <button
            type="button"
            onClick={() => setActiveView('search')}
            className="p-1.5 hover:bg-zinc-800 rounded-full"
            aria-label="Search"
          >
            <Search className="w-5 h-5 text-white" />
          </button>
          <button
            type="button"
            onClick={() => setActiveView('saved')}
            className="p-1.5 hover:bg-zinc-800 rounded-full"
            aria-label="Saved"
          >
            <Heart className="w-5 h-5 text-white" />
          </button>
        </div>
      </div>

      {/* Editorial hero */}
      <div className="relative overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center scale-105"
          style={{ backgroundImage: `url(${collection.images[0]})` }}
        />
        <div className="absolute inset-0 bg-black/55" />

        <div className="relative max-w-7xl mx-auto px-3 md:px-6 py-4 md:py-6">
          <div className="flex items-start justify-between gap-3 mb-3">
            <div className="min-w-0">
              <button
                type="button"
                onClick={() => goToCollection((collectionIndex + 1) % TREND_COLLECTIONS.length)}
                className="flex items-center gap-1 text-lg md:text-2xl font-black text-white hover:opacity-90 text-left"
              >
                <span className="truncate">{collection.tag}</span>
                <ChevronRight className="w-5 h-5 shrink-0 opacity-80" />
              </button>
              <p className="text-[11px] md:text-sm text-white/85 mt-1 max-w-xl leading-relaxed">
                {collection.caption}
              </p>
            </div>
            <span className="text-[10px] font-mono text-white/80 bg-white/10 px-2 py-0.5 rounded-full shrink-0">
              {collectionIndex + 1} / {TREND_COLLECTIONS.length}
            </span>
          </div>

          <div className="grid grid-cols-3 gap-2 md:gap-3">
            {collection.images.map((src, idx) => {
              const listing = trendListings[idx];
              return (
                <button
                  key={`${collection.id}-${idx}`}
                  type="button"
                  onClick={() => listing && openPDP(listing.id)}
                  className="relative rounded-lg md:rounded-xl overflow-hidden bg-gray-800 text-left isolate"
                >
                  <div className="aspect-[3/4] w-full">
                    <SafeImage
                      src={src}
                      alt={`${collection.tag} look ${idx + 1}`}
                      fallbackSeed={`${collection.id}-${idx}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute bottom-0 inset-x-0 p-1.5 md:p-2 bg-gradient-to-t from-black/75 to-transparent">
                    <span className="inline-block bg-white text-black text-[10px] md:text-xs font-black px-1.5 py-0.5 rounded-sm">
                      {listing
                        ? `${Math.max(450, Math.round(listing.price / 80)).toLocaleString()} ETB`
                        : `${(idx + 1) * 450} ETB`}
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
                  i === collectionIndex ? 'w-5 bg-white' : 'w-1.5 bg-white/40'
                }`}
                aria-label={`Show ${c.tag}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Section Tabs */}
      <div className="bg-white border-b border-gray-200 grid grid-cols-2 text-xs font-black sticky top-[52px] z-20">
        <button
          type="button"
          onClick={() => setActiveTab('picks')}
          className={`py-3 text-center border-b-2 ${
            activeTab === 'picks' ? 'border-black text-black' : 'border-transparent text-gray-400'
          }`}
        >
          Trending Picks
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('store')}
          className={`py-3 text-center border-b-2 ${
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
                ? 'bg-brand-muted text-ink border border-brand-ring'
                : 'bg-paper-soft text-ink/60 hover:bg-brand-soft'
            }`}
          >
            {tag}
          </button>
        ))}
        <button type="button" className="shrink-0 p-1.5 bg-gray-100 text-gray-600 rounded-md" aria-label="Filters">
          <SlidersHorizontal className="w-4 h-4" />
        </button>
      </div>

      {/* Product grid — stable CSS grid, shared ProductCard */}
      <div className="p-2.5 md:p-4 max-w-7xl mx-auto">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2.5 md:gap-3 items-start">
          {trendListings.map(listing => (
            <div key={listing.id} className="min-w-0 w-full">
              <ProductCard listing={listing} />
            </div>
          ))}
        </div>

        {trendListings.length === 0 && (
          <p className="text-center text-sm text-gray-500 py-16">No trend picks yet — check back soon.</p>
        )}

        {activeTab === 'store' && (
          <p className="text-center text-xs text-gray-500 mt-6 pb-4">
            Trends Store picks from verified Addis vendors · meetup or ask about vendor delivery
          </p>
        )}
      </div>
    </div>
  );
};
