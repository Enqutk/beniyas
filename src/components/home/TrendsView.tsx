'use client';

import React, { useMemo, useState } from 'react';
import { useApp } from '../../context/AppContext';
import { SafeImage } from '../common/SafeImage';
import {
  Search,
  Heart,
  Sparkles,
  MapPin,
  ChevronRight,
  ChevronLeft,
  ArrowLeft
} from 'lucide-react';

type Collection = {
  id: string;
  tag: string;
  caption: string;
  images: string[];
};

const COLLECTIONS: Collection[] = [
  {
    id: 'polished',
    tag: '#PolishedPieces',
    caption: "The key to any polished look — it's all in the details.",
    images: [
      'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=480&h=640&fit=crop&q=80',
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=480&h=640&fit=crop&q=80',
      'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=480&h=640&fit=crop&q=80'
    ]
  },
  {
    id: 'cutout',
    tag: '#CutOutDetails',
    caption: 'Sought-after silhouettes and elevated essentials.',
    images: [
      'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=480&h=640&fit=crop&q=80',
      'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=480&h=640&fit=crop&q=80',
      'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=480&h=640&fit=crop&q=80'
    ]
  },
  {
    id: 'workwear',
    tag: '#WorkwearBasics',
    caption: 'Sharp office-ready layers that still feel effortless.',
    images: [
      'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=480&h=640&fit=crop&q=80',
      'https://images.unsplash.com/photo-1487222477894-6973a9c3fd54?w=480&h=640&fit=crop&q=80',
      'https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=480&h=640&fit=crop&q=80'
    ]
  },
  {
    id: 'cycling',
    tag: '#CyclingChic',
    caption: 'Sporty polish for city rides and weekends.',
    images: [
      'https://images.unsplash.com/photo-1518310383802-640c2de311b2?w=480&h=640&fit=crop&q=80',
      'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=480&h=640&fit=crop&q=80',
      'https://images.unsplash.com/photo-1475180098004-ca77a66827be?w=480&h=640&fit=crop&q=80'
    ]
  },
  {
    id: 'leather',
    tag: '#LeatherTote',
    caption: 'Structured bags and leather accents.',
    images: [
      'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=480&h=640&fit=crop&q=80',
      'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=480&h=640&fit=crop&q=80',
      'https://images.unsplash.com/photo-1590874103328-eac38a67478e?w=480&h=640&fit=crop&q=80'
    ]
  },
  {
    id: 'clean',
    tag: '#CleanGirl',
    caption: 'Soft neutrals, fresh skin, quiet luxury.',
    images: [
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=480&h=640&fit=crop&q=80',
      'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=480&h=640&fit=crop&q=80',
      'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=480&h=640&fit=crop&q=80'
    ]
  },
  {
    id: 'glam',
    tag: '#StatementGlam',
    caption: 'Bold nights out — shine, color, attitude.',
    images: [
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=480&h=640&fit=crop&q=80',
      'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=480&h=640&fit=crop&q=80',
      'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=480&h=640&fit=crop&q=80'
    ]
  }
];

const GRID_LOOKS = [
  'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=500&h=625&fit=crop&q=80',
  'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=500&h=625&fit=crop&q=80',
  'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=500&h=625&fit=crop&q=80',
  'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=500&h=625&fit=crop&q=80',
  'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=500&h=625&fit=crop&q=80',
  'https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=500&h=625&fit=crop&q=80',
  'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=500&h=625&fit=crop&q=80',
  'https://images.unsplash.com/photo-1487222477894-6973a9c3fd54?w=500&h=625&fit=crop&q=80',
  'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=500&h=625&fit=crop&q=80',
  'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=500&h=625&fit=crop&q=80',
  'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=500&h=625&fit=crop&q=80',
  'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=500&h=625&fit=crop&q=80',
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=500&h=625&fit=crop&q=80',
  'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=500&h=625&fit=crop&q=80',
  'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=500&h=625&fit=crop&q=80',
  'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=500&h=625&fit=crop&q=80'
];

const BRANDS = ['Firerie', 'RosyDaze', 'BizChic', 'Lumen', 'Noir', 'Atelier'];
const HERO_PRICES = [1850, 2400, 1950];

export const TrendsView: React.FC = () => {
  const {
    listings,
    openPDP,
    toggleFavorite,
    isFavorite,
    setActiveView,
    setMainTab
  } = useApp();

  const showLocation = (subcity: string, location: string) => {
    const query = encodeURIComponent(`${subcity}, ${location}`);
    window.open(`https://www.google.com/maps/search/?api=1&query=${query}`, '_blank', 'noopener,noreferrer');
  };

  const [idx, setIdx] = useState(0);
  const [tag, setTag] = useState('For You');
  const collection = COLLECTIONS[idx];

  const products = useMemo(() => {
    const fashion = listings.filter(l => l.categoryId === 'fashion');
    const pool = fashion.length ? fashion : listings;
    const seen = new Set<string>();
    return pool
      .filter(l => {
        if (seen.has(l.id)) return false;
        seen.add(l.id);
        return true;
      })
      .slice(0, 24)
      .map((l, i) => ({
        ...l,
        cover: GRID_LOOKS[i % GRID_LOOKS.length],
        brand: BRANDS[i % BRANDS.length],
        priceShown: 890 + ((i * 211) % 3600),
        trendTag: COLLECTIONS[i % COLLECTIONS.length].tag
      }));
  }, [listings]);

  /** 3 look tiles for the active collection → unique products */
  const heroLooks = useMemo(() => {
    return collection.images.map((src, i) => {
      const product = products[(idx * 3 + i) % Math.max(products.length, 1)] || products[i];
      return {
        src,
        price: HERO_PRICES[i] ?? product?.priceShown ?? product?.price ?? 0,
        product
      };
    });
  }, [collection.images, products, idx]);

  const openLook = (look: (typeof heroLooks)[number]) => {
    if (!look.product) return;
    openPDP(look.product.id, { cover: look.src, price: look.price });
  };

  const go = (next: number) => {
    const n = (next + COLLECTIONS.length) % COLLECTIONS.length;
    setIdx(n);
    setTag(COLLECTIONS[n].tag);
  };

  const tags = ['For You', ...COLLECTIONS.map(c => c.tag)];

  return (
    <div className="min-h-screen bg-[#F3F3F3] pb-24">
      {/* Top bar */}
      <header className="sticky top-0 z-30 flex items-center justify-between bg-zinc-950 px-3 py-2.5 text-white">
        <div className="flex items-center gap-1">
          <button
            type="button"
            aria-label="Back to shop"
            onClick={() => {
              setMainTab('home');
              setActiveView('none');
            }}
            className="rounded-full p-1.5 hover:bg-white/10 md:hidden"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <span className="flex items-center gap-1.5 font-serif text-lg font-black italic tracking-tight">
            <Sparkles className="h-4 w-4 text-amber-300" />
            Trends
          </span>
        </div>
        <div className="flex items-center gap-0.5">
          <button
            type="button"
            aria-label="Search"
            onClick={() => setActiveView('search')}
            className="rounded-full p-1.5 hover:bg-white/10"
          >
            <Search className="h-4 w-4" />
          </button>
          <button
            type="button"
            aria-label="Saved"
            onClick={() => setActiveView('saved')}
            className="rounded-full p-1.5 hover:bg-white/10"
          >
            <Heart className="h-4 w-4" />
          </button>
        </div>
      </header>

      {/* Editorial hero — Shein glass card */}
      <div className="relative overflow-hidden">
        <SafeImage
          src={collection.images[0]}
          alt=""
          fallbackSeed={collection.id}
          className="absolute inset-0 h-full w-full scale-110 object-cover opacity-50 blur-[2px]"
        />
        <div className="absolute inset-0 bg-zinc-950/55" />

        <div className="relative mx-auto max-w-lg px-3 py-3">
          <div className="overflow-hidden rounded-2xl border border-white/20 bg-black/35 p-3 shadow-xl backdrop-blur-md">
            <div className="mb-2 flex items-start justify-between gap-2">
              <div className="min-w-0">
                <button
                  type="button"
                  onClick={() => go(idx + 1)}
                  className="flex items-center gap-0.5 text-left text-[15px] font-black text-white"
                >
                  <span className="truncate">{collection.tag}</span>
                  <ChevronRight className="h-4 w-4 shrink-0 opacity-80" />
                </button>
                <p className="mt-0.5 line-clamp-2 text-[11px] leading-snug text-white/75">
                  {collection.caption}
                </p>
              </div>
              <span className="shrink-0 rounded-full bg-white/15 px-2 py-0.5 font-mono text-[10px] text-white/80">
                {idx + 1} / {COLLECTIONS.length}
              </span>
            </div>

            {/* 3 looks — each opens that look’s product detail */}
            <div className="grid grid-cols-3 gap-1.5">
              {heroLooks.map((look, i) => (
                <button
                  key={`${collection.id}-${i}`}
                  type="button"
                  onClick={() => openLook(look)}
                  className="group relative h-[132px] overflow-hidden rounded-xl bg-zinc-800 text-left"
                >
                  <SafeImage
                    src={look.src}
                    alt={look.product?.title || collection.tag}
                    fallbackSeed={`${collection.id}-${i}`}
                    className="h-full w-full object-cover transition-transform duration-300 group-active:scale-105"
                  />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent px-1.5 pb-1.5 pt-5">
                    <span className="inline-block rounded-sm bg-white px-1.5 py-0.5 text-[10px] font-black text-black">
                      {look.price.toLocaleString()} ETB
                    </span>
                  </div>
                </button>
              ))}
            </div>

            <div className="mt-2.5 flex items-center justify-between">
              <button
                type="button"
                aria-label="Previous collection"
                onClick={() => go(idx - 1)}
                className="rounded-full bg-white/10 p-1.5 text-white hover:bg-white/20"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <div className="flex items-center gap-1">
                {COLLECTIONS.map((c, i) => (
                  <button
                    key={c.id}
                    type="button"
                    aria-label={c.tag}
                    onClick={() => go(i)}
                    className={`h-1 rounded-full transition-all ${
                      i === idx ? 'w-4 bg-brand' : 'w-1 bg-white/35'
                    }`}
                  />
                ))}
              </div>
              <button
                type="button"
                aria-label="Next collection"
                onClick={() => go(idx + 1)}
                className="rounded-full bg-white/10 p-1.5 text-white hover:bg-white/20"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Tag row */}
      <div className="sticky top-[44px] z-20 flex gap-1.5 overflow-x-auto border-b border-gray-200 bg-white px-3 py-2 scrollbar-none">
        {tags.map(t => (
          <button
            key={t}
            type="button"
            onClick={() => {
              setTag(t);
              if (t !== 'For You') {
                const i = COLLECTIONS.findIndex(c => c.tag === t);
                if (i >= 0) setIdx(i);
              }
            }}
            className={`shrink-0 rounded-full px-3 py-1 text-[11px] font-bold transition-colors ${
              tag === t ? 'bg-ink text-white' : 'bg-gray-100 text-gray-600'
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Product mosaic — image-led, light chrome */}
      <div className="mx-auto grid max-w-lg grid-cols-2 gap-px bg-gray-200 sm:max-w-3xl sm:grid-cols-3 lg:max-w-5xl lg:grid-cols-4">
        {products.map(p => {
          const fav = isFavorite(p.id);
          return (
            <article key={p.id} className="group relative bg-white">
              <div
                role="button"
                tabIndex={0}
                onClick={() => openPDP(p.id, { cover: p.cover, price: p.priceShown })}
                onKeyDown={e => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    openPDP(p.id, { cover: p.cover, price: p.priceShown });
                  }
                }}
                className="cursor-pointer text-left"
              >
                <div className="relative aspect-[3/4] overflow-hidden bg-gray-100">
                  <SafeImage
                    src={p.cover}
                    alt={p.title}
                    fallbackSeed={p.id}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                  <span className="absolute left-2 top-2 rounded-sm bg-white/95 px-1.5 py-0.5 text-[9px] font-black uppercase tracking-wide text-ink">
                    {p.brand}
                  </span>
                  <span className="absolute bottom-2 left-2 rounded-sm bg-brand px-1.5 py-0.5 text-[9px] font-bold text-white">
                    {tag === 'For You' ? p.trendTag : tag}
                  </span>
                </div>
                <div className="space-y-1 p-2.5 pr-10">
                  <h3 className="line-clamp-2 min-h-[2.4em] text-[12px] font-medium leading-snug text-ink">
                    {p.title}
                  </h3>
                  <p className="text-[15px] font-black tracking-tight text-brand">
                    {p.priceShown.toLocaleString()}
                    <span className="ml-0.5 text-[10px] font-bold text-gray-500">ETB</span>
                  </p>
                </div>
              </div>

              <button
                type="button"
                aria-label="Save"
                onClick={() => toggleFavorite(p.id)}
                className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full bg-white/95 shadow-sm"
              >
                <Heart
                  className={`h-3.5 w-3.5 ${fav ? 'fill-red-500 text-red-500' : 'text-gray-700'}`}
                />
              </button>

              <button
                type="button"
                aria-label="Show location"
                title={`${p.subcity}, ${p.location}`}
                onClick={() => showLocation(p.subcity, p.location)}
                className="absolute bottom-2.5 right-2 flex h-7 w-7 items-center justify-center rounded-full bg-brand-soft text-ink hover:bg-brand hover:text-white"
              >
                <MapPin className="h-3.5 w-3.5" />
              </button>
            </article>
          );
        })}
      </div>
    </div>
  );
};
