import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ProductCard } from '../common/ProductCard';
import { ChevronRight, Zap, Sparkles } from 'lucide-react';

const SHEIN_TOP_TABS = ['All', 'Women', 'Men', 'Kids', 'Curve', 'Home'];

// Complete circular categories matching SHEIN desktop screenshot 2
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
  { id: 'cat_10', name: 'Gaming', image: 'https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=300&auto=format&fit=crop&q=80', catId: 'electronics', sub: 'Gaming & Consoles' }
];

export const HomeView: React.FC = () => {
  const { listings, openPDP, openPLP, setMainTab, setActiveView } = useApp();
  const [selectedTopTab, setSelectedTopTab] = useState('All');

  return (
    <div className="flex flex-col space-y-4 pb-28 max-w-7xl mx-auto w-full bg-white">
      {/* 1. Mobile-Only Sub Category Tabs Row (HIDDEN on Desktop to remove redundant sub-nav) */}
      <div className="md:hidden flex items-center overflow-x-auto scrollbar-none border-b border-gray-200 bg-white px-3 sticky top-12 z-20">
        {SHEIN_TOP_TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => setSelectedTopTab(tab)}
            className={`py-2 px-3 text-xs font-black shrink-0 relative transition-colors ${
              selectedTopTab === tab ? 'text-black' : 'text-gray-500'
            }`}
          >
            {tab}
            {selectedTopTab === tab && (
              <span className="absolute bottom-0 left-2 right-2 h-0.5 bg-black rounded-full" />
            )}
          </button>
        ))}
      </div>

      {/* 2. Hero Fashion Banner with Purple Gradient & Floating White Cards */}
      <div className="px-2 md:px-4">
        <div className="relative rounded-2xl overflow-hidden bg-gradient-to-r from-purple-900 via-indigo-900 to-purple-950 text-white p-4 md:p-8 shadow-md">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            {/* Left Content */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="bg-[#8B5CF6] text-white text-xs font-black px-2.5 py-0.5 rounded-sm uppercase tracking-wider inline-flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5" />
                  Trends
                </span>
                <span className="text-purple-200 text-xs font-semibold">#CutOutDetails</span>
              </div>
              <h2 className="text-2xl md:text-4xl font-black text-white italic tracking-tight font-serif">
                #CutOutDetails & #PolishedPieces
              </h2>
              <p className="text-xs md:text-sm text-purple-200 opacity-90 max-w-md">
                Unveil the season's most sought-after silhouettes and elevated essentials.
              </p>
              <button
                type="button"
                onClick={() => {
                  setMainTab('trends');
                  setActiveView('none');
                }}
                className="mt-1 inline-flex items-center gap-1 bg-white text-purple-950 text-xs font-black px-4 py-2 rounded-full hover:bg-purple-100 transition-colors"
              >
                View details
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Right Mini Floating Product Cards */}
            <div className="flex items-center gap-2.5 overflow-x-auto scrollbar-none pt-2 md:pt-0">
              <button
                type="button"
                onClick={() => {
                  setMainTab('trends');
                  setActiveView('none');
                }}
                className="bg-white text-gray-900 rounded-xl p-1.5 shadow-xl text-center w-20 shrink-0 cursor-pointer hover:scale-105 transition-transform"
              >
                <img
                  src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=200&auto=format&fit=crop&q=80"
                  alt="item"
                  className="w-full aspect-3/4 object-cover rounded-lg mb-1"
                />
                <span className="text-xs font-black text-brand block">1,850 ETB</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setMainTab('trends');
                  setActiveView('none');
                }}
                className="bg-white text-gray-900 rounded-xl p-1.5 shadow-xl text-center w-20 shrink-0 cursor-pointer hover:scale-105 transition-transform"
              >
                <img
                  src="https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=200&auto=format&fit=crop&q=80"
                  alt="item"
                  className="w-full aspect-3/4 object-cover rounded-lg mb-1"
                />
                <span className="text-xs font-black text-brand block">2,400 ETB</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setMainTab('trends');
                  setActiveView('none');
                }}
                className="bg-white text-gray-900 rounded-xl p-1.5 shadow-xl text-center w-20 shrink-0 cursor-pointer hover:scale-105 transition-transform"
              >
                <img
                  src="https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=200&auto=format&fit=crop&q=80"
                  alt="item"
                  className="w-full aspect-3/4 object-cover rounded-lg mb-1"
                />
                <span className="text-xs font-black text-brand block">1,950 ETB</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Flash Sale Ticker Banner */}
      <div className="mx-2 md:mx-4 bg-[#FFF8EE] border border-[#FFE5C4] rounded-xl p-2.5 md:p-3 flex items-center justify-between text-xs font-bold text-gray-800 shadow-2xs">
        <div className="flex items-center gap-2">
          <Zap className="w-4 h-4 text-amber-500 fill-amber-500" />
          <span className="font-extrabold text-black">Flash Sale</span>
          <span className="text-gray-400 font-normal hidden sm:inline">| Express Local Delivery across Ethiopia</span>
        </div>
        <button
          onClick={() => {
            setMainTab('trends');
            setActiveView('none');
          }}
          className="text-[11px] font-black text-black flex items-center gap-0.5 hover:underline"
        >
          View details <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* 4. Circular Category Grid (Matches SHEIN Screenshot 2 multi-row layout) */}
      <div className="px-2 md:px-4">
        {/* Desktop: 7 columns x 3 rows grid. Mobile: Horizontal smooth scroll */}
        <div className="hidden md:grid md:grid-cols-5 gap-y-5 gap-x-3 py-2 border-b border-gray-100">
          {CIRCULAR_CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => openPLP(cat.catId as any, cat.sub)}
              className="flex flex-col items-center group text-center"
            >
              <div className="w-16 h-16 rounded-full bg-gray-100 border border-gray-200 overflow-hidden mb-1.5 shadow-2xs group-hover:border-black group-active:scale-95 transition-all">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform"
                />
              </div>
              <span className="text-xs font-bold text-gray-800 leading-tight group-hover:text-black line-clamp-2">
                {cat.name}
              </span>
            </button>
          ))}
        </div>

        {/* Mobile View: 5-column dense Shein category grid */}
        <div className="md:hidden grid grid-cols-5 gap-x-1.5 gap-y-3 py-1">
          {CIRCULAR_CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => openPLP(cat.catId as any, cat.sub)}
              className="flex flex-col items-center text-center active:opacity-80"
            >
              <div className="w-12 h-12 rounded-xl bg-gray-100 border border-gray-200 overflow-hidden mb-1">
                <img
                  src={cat.image}
                  alt={cat.name}
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

      {/* 5. Dual Section Cards: Super Deals & Trends (SHEIN Screenshot 2) */}
      <div className="px-2 md:px-4 grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
        {/* Super Deals Card */}
        <div className="bg-[#FFFDFB] border border-amber-200/80 rounded-xl p-3 space-y-2.5">
          <div
            onClick={() => openPLP('all', 'Super Deals', 'Sale')}
            className="flex items-center justify-between cursor-pointer hover:opacity-80 transition-opacity"
          >
            <h3 className="text-sm font-black text-black italic font-serif flex items-center gap-1">
              Super<span className="text-red-600 italic">Deals</span>
            </h3>
            <ChevronRight className="w-4 h-4 text-gray-400" />
          </div>

          <div className="grid grid-cols-3 gap-2">
            <div
              onClick={() => openPDP(listings[0]?.id || '1')}
              className="bg-white rounded-lg p-2 border border-gray-100 text-left shadow-2xs cursor-pointer hover:border-black transition-all"
            >
              <span className="bg-amber-400 text-black text-[9px] font-black px-1 rounded-xs uppercase">
                Flash Sale
              </span>
              <img
                src="https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=300&auto=format&fit=crop&q=80"
                alt="deal"
                className="w-full aspect-square object-cover rounded-md my-1.5"
              />
              <span className="text-xs font-black text-red-600 block">1,250 ETB</span>
              <span className="text-[9px] font-bold text-amber-600 block">Flash Sale</span>
            </div>

            <div
              onClick={() => openPDP(listings[1]?.id || '2')}
              className="bg-white rounded-lg p-2 border border-gray-100 text-left shadow-2xs cursor-pointer hover:border-black transition-all"
            >
              <span className="bg-brand-muted text-brand text-[9px] font-black px-1 rounded-xs uppercase">
                7% OFF
              </span>
              <img
                src="https://images.unsplash.com/photo-1556228720-195a672e8a03?w=300&auto=format&fit=crop&q=80"
                alt="deal"
                className="w-full aspect-square object-cover rounded-md my-1.5"
              />
              <span className="text-xs font-black text-red-600 block">850 ETB</span>
              <span className="text-[9px] font-bold text-gray-400 block line-through">920 ETB</span>
            </div>

            <div
              onClick={() => openPDP(listings[2]?.id || '3')}
              className="bg-white rounded-lg p-2 border border-gray-100 text-left shadow-2xs cursor-pointer hover:border-black transition-all"
            >
              <span className="bg-brand-muted text-brand text-[9px] font-black px-1 rounded-xs uppercase">
                3% OFF
              </span>
              <img
                src="https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=300&auto=format&fit=crop&q=80"
                alt="deal"
                className="w-full aspect-square object-cover rounded-md my-1.5"
              />
              <span className="text-xs font-black text-brand block">450 ETB</span>
              <span className="text-[9px] font-bold text-gray-400 block line-through">480 ETB</span>
            </div>
          </div>
        </div>

        {/* Trends Teaser Card */}
        <div className="bg-[#FAF5FF] border border-purple-200/80 rounded-xl p-3 space-y-2.5">
          <div className="flex items-center justify-between gap-2">
            <h3 className="text-sm font-black text-purple-900 italic font-serif flex items-center gap-1">
              Trends
            </h3>
            <button
              type="button"
              onClick={() => {
                setMainTab('trends');
                setActiveView('none');
              }}
              className="text-[11px] font-black text-purple-800 flex items-center gap-0.5 hover:underline"
            >
              View details
              <ChevronRight className="w-4 h-4 text-purple-400" />
            </button>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => {
                setMainTab('trends');
                setActiveView('none');
              }}
              className="bg-white rounded-lg p-2 border border-gray-100 text-left shadow-2xs cursor-pointer hover:border-black transition-all"
            >
              <span className="bg-purple-600 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-xs">
                #StatementGlam
              </span>
              <img
                src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=300&auto=format&fit=crop&q=80"
                alt="trend"
                className="w-full aspect-square object-cover rounded-md my-1.5"
              />
              <span className="text-xs font-black text-black block">1,650 ETB</span>
              <span className="text-[10px] text-purple-700 font-bold block truncate">#StatementGlam</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setMainTab('trends');
                setActiveView('none');
              }}
              className="bg-white rounded-lg p-2 border border-gray-100 text-left shadow-2xs cursor-pointer hover:border-black transition-all"
            >
              <span className="bg-purple-600 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-xs">
                #GirlsNightOut
              </span>
              <img
                src="https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=300&auto=format&fit=crop&q=80"
                alt="trend"
                className="w-full aspect-square object-cover rounded-md my-1.5"
              />
              <span className="text-xs font-black text-black block">1,400 ETB</span>
              <span className="text-[10px] text-purple-700 font-bold block truncate">#GirlsNightOut</span>
            </button>
          </div>
        </div>
      </div>

      {/* 6. "For You" Dense Feed Header & Grid (SHEIN Screenshot 2) */}
      <div className="px-2 md:px-4 pt-4">
        <div className="flex items-center justify-center gap-3 mb-4">
          <span className="h-0.5 w-12 bg-gray-200" />
          <h3 className="text-base font-black text-black uppercase tracking-widest font-serif">
            For You
          </h3>
          <span className="h-0.5 w-12 bg-gray-200" />
        </div>

        {/* 2-Column on mobile, 4-5 columns on desktop */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 md:gap-3">
          {listings.slice(0, 40).map(listing => (
            <ProductCard key={listing.id} listing={listing} />
          ))}
        </div>
      </div>
    </div>
  );
};
