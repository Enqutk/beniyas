import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ProductCard } from '../common/ProductCard';
import { SafeImage } from '../common/SafeImage';
import { HeroBannerSlider } from './HeroBannerSlider';
import { ChevronRight, Zap } from 'lucide-react';

const SHEIN_TOP_TABS = ['All', 'Women', 'Men', 'Kids', 'Curve', 'Home'];

const CIRCULAR_CATEGORIES = [
  { id: 'cat_1', name: 'Women', image: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=300&auto=format&fit=crop&q=80', catId: 'fashion', sub: 'Women Fashion' },
  { id: 'cat_2', name: 'Men', image: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=300&auto=format&fit=crop&q=80', catId: 'fashion', sub: 'Men Fashion' },
  { id: 'cat_3', name: 'Shoes', image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=300&auto=format&fit=crop&q=80', catId: 'fashion', sub: 'Shoes & Sneakers' },
  { id: 'cat_4', name: 'Jewelry', image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=300&auto=format&fit=crop&q=80', catId: 'fashion', sub: 'Jewelry' },
  { id: 'cat_5', name: 'Phones', image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=300&auto=format&fit=crop&q=80', catId: 'phones', sub: 'iPhone' },
  { id: 'cat_6', name: 'Electronics', image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=300&auto=format&fit=crop&q=80', catId: 'electronics', sub: 'Laptops & Computers' },
  { id: 'cat_7', name: 'Home', image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=300&auto=format&fit=crop&q=80', catId: 'home', sub: 'Sofas & Living Room' },
  { id: 'cat_8', name: 'Vehicles', image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=300&auto=format&fit=crop&q=80', catId: 'vehicles', sub: 'Toyota' },
  { id: 'cat_9', name: 'Bags', image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=300&auto=format&fit=crop&q=80', catId: 'fashion', sub: 'Bags & Watches' },
  { id: 'cat_10', name: 'Gaming', image: 'https://images.unsplash.com/photo-1593305841991-05c297ba4575?w=300&auto=format&fit=crop&q=80', catId: 'electronics', sub: 'Gaming & Consoles' }
];

const FALLBACK_IMGS = [
  'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=400&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=400&auto=format&fit=crop&q=80'
];

export const HomeView: React.FC = () => {
  const { listings, openPDP, openPLP, setMainTab, setActiveView } = useApp();
  const [selectedTopTab, setSelectedTopTab] = useState('All');

  const goTrends = () => {
    setMainTab('trends');
    setActiveView('none');
  };

  return (
    <div className="flex flex-col gap-3 md:gap-4 pb-28 max-w-7xl mx-auto w-full bg-white">
      <div className="md:hidden flex items-center overflow-x-auto scrollbar-none border-b border-gray-200 bg-white px-2">
        {SHEIN_TOP_TABS.map(tab => (
          <button
            key={tab}
            onClick={() => setSelectedTopTab(tab)}
            className={`py-2 px-3 text-xs font-black shrink-0 relative transition-colors ${
              selectedTopTab === tab ? 'text-ink' : 'text-gray-500'
            }`}
          >
            {tab}
            {selectedTopTab === tab && (
              <span className="absolute bottom-0 left-2 right-2 h-0.5 bg-brand rounded-full" />
            )}
          </button>
        ))}
      </div>

      <div className="px-2 md:px-4">
        <HeroBannerSlider
          onCta={goTrends}
          onLookClick={look =>
            openPDP(look.listingId, { cover: look.img, price: look.priceValue })
          }
        />
      </div>

      <div className="mx-2 md:mx-4 bg-brand-soft border border-brand-muted rounded-xl p-2.5 md:p-3 flex items-center justify-between text-xs font-bold text-ink shadow-2xs">
        <div className="flex items-center gap-2 min-w-0">
          <Zap className="w-4 h-4 text-brand fill-brand shrink-0" />
          <span className="font-extrabold">Flash Sale</span>
          <span className="text-gray-500 font-normal truncate hidden sm:inline">
            | Vendors deliver or meetup across Addis
          </span>
        </div>
        <button
          onClick={goTrends}
          className="text-[11px] font-black text-brand flex items-center gap-0.5 hover:underline shrink-0"
        >
          View details <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>

      <div className="px-2 md:px-4">
        <div className="hidden md:grid md:grid-cols-5 gap-y-5 gap-x-3 py-2 border-b border-gray-100">
          {CIRCULAR_CATEGORIES.map(cat => (
            <button
              key={cat.id}
              onClick={() => openPLP(cat.catId as any, cat.sub)}
              className="flex flex-col items-center group text-center"
            >
              <div className="w-16 h-16 rounded-full bg-gray-100 border border-gray-200 overflow-hidden mb-1.5 shadow-2xs group-hover:border-brand group-active:scale-95 transition-all">
                <SafeImage
                  src={cat.image}
                  alt={cat.name}
                  fallbackSeed={cat.id}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform"
                />
              </div>
              <span className="text-xs font-bold text-gray-800 leading-tight group-hover:text-brand line-clamp-2">
                {cat.name}
              </span>
            </button>
          ))}
        </div>

        <div className="md:hidden grid grid-cols-5 gap-x-1.5 gap-y-3 py-1">
          {CIRCULAR_CATEGORIES.map(cat => (
            <button
              key={cat.id}
              onClick={() => openPLP(cat.catId as any, cat.sub)}
              className="flex flex-col items-center text-center active:opacity-80"
            >
              <div className="w-12 h-12 rounded-xl bg-gray-100 border border-gray-200 overflow-hidden mb-1">
                <SafeImage
                  src={cat.image}
                  alt={cat.name}
                  fallbackSeed={cat.id}
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="text-[9px] font-bold text-gray-800 leading-tight line-clamp-2 px-0.5">
                {cat.name}
              </span>
            </button>
          ))}
        </div>
      </div>

      <div className="px-2 md:px-4 grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
        <div className="bg-brand-soft border border-brand-muted rounded-xl p-3 space-y-2.5">
          <div
            onClick={() => openPLP('all', 'Super Deals', 'Sale')}
            className="flex items-center justify-between cursor-pointer hover:opacity-80 transition-opacity"
          >
            <h3 className="text-sm font-black text-ink italic font-serif flex items-center gap-1">
              Super<span className="text-brand italic">Deals</span>
            </h3>
            <ChevronRight className="w-4 h-4 text-gray-400" />
          </div>

          <div className="grid grid-cols-3 gap-2">
            {[0, 1, 2].map(i => {
              const item = listings[i];
              return (
                <div
                  key={item?.id || i}
                  onClick={() => openPDP(item?.id || 'l1')}
                  className="bg-paper rounded-lg p-2 border border-brand-muted text-left shadow-2xs cursor-pointer hover:border-ink transition-all"
                >
                  <span className="btn-primary text-[9px] font-black px-1 rounded-xs uppercase">
                    Flash
                  </span>
                  <SafeImage
                    src={item?.images[0] || FALLBACK_IMGS[i]}
                    alt="deal"
                    fallbackSeed={`deal${i}`}
                    className="w-full aspect-square object-cover rounded-md my-1.5"
                  />
                  <span className="text-xs font-black text-brand block">
                    {(item?.price || 450).toLocaleString()} ETB
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        <div className="bg-brand-soft border border-brand-muted rounded-xl p-3 space-y-2.5">
          <div className="flex items-center justify-between gap-2">
            <h3 className="text-sm font-black text-ink italic font-serif">Trends</h3>
            <button
              type="button"
              onClick={() => {
                setMainTab('trends');
                setActiveView('none');
              }}
              className="text-[11px] font-black text-brand flex items-center gap-0.5 hover:underline"
            >
              View details
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-2 gap-2">
            {[
              { tag: '#StatementGlam', price: 1650, seed: 'trend1', img: FALLBACK_IMGS[0] },
              { tag: '#GirlsNightOut', price: 1400, seed: 'trend2', img: FALLBACK_IMGS[1] }
            ].map(t => (
              <button
                key={t.tag}
                type="button"
                onClick={() => {
                  setMainTab('trends');
                  setActiveView('none');
                }}
                className="bg-paper rounded-lg p-2 border border-brand-muted text-left shadow-2xs cursor-pointer hover:border-ink transition-all"
              >
                <span className="btn-primary text-[9px] font-bold px-1.5 py-0.5 rounded-xs">{t.tag}</span>
                <SafeImage
                  src={t.img}
                  alt="trend"
                  fallbackSeed={t.seed}
                  className="w-full aspect-square object-cover rounded-md my-1.5"
                />
                <span className="text-xs font-black text-ink block">{t.price.toLocaleString()} ETB</span>
                <span className="text-[10px] text-brand-hover font-bold block truncate">{t.tag}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="px-2 md:px-4 pt-4">
        <div className="flex items-center justify-center gap-3 mb-4">
          <span className="h-0.5 w-12 bg-gray-200" />
          <h3 className="text-base font-black text-ink uppercase tracking-widest font-serif">For You</h3>
          <span className="h-0.5 w-12 bg-gray-200" />
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2.5 md:gap-3">
          {listings.slice(0, 40).map(l => (
            <ProductCard key={l.id} listing={l} />
          ))}
        </div>
      </div>
    </div>
  );
};
