import React, { useRef, useState } from 'react';
import { useApp } from '../../context/AppContext';
import { BaniyasLogo } from '../common/BaniyasLogo';
import {
  Search,
  Heart,
  ShoppingBag,
  User,
  ChevronDown,
  Sparkles,
  Globe,
  Plus,
  Grid,
  ChevronRight
} from 'lucide-react';

const MEGA_SIDEBAR = [
  { label: 'Just for You', catId: 'fashion', sub: 'Women Fashion' },
  { label: 'New In', catId: 'fashion', sub: 'Women Fashion' },
  { label: 'Trends', isTrendsTab: true },
  { label: 'Women Clothing', catId: 'fashion', sub: 'Women Fashion' },
  { label: 'Men Clothing', catId: 'fashion', sub: 'Men Fashion' },
  { label: 'Shoes', catId: 'fashion', sub: 'Shoes & Sneakers' },
  { label: 'Phones', catId: 'phones', sub: 'iPhone' },
  { label: 'Electronics', catId: 'electronics', sub: 'Laptops & Computers' },
  { label: 'Home & Living', catId: 'home', sub: 'Sofas & Living Room' },
  { label: 'Vehicles', catId: 'vehicles', sub: 'Toyota' }
];

const PICKS_FOR_YOU = [
  { label: 'Women T-Shirts', image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=200&auto=format&fit=crop&q=80', catId: 'fashion', sub: 'Tops' },
  { label: 'Women Tote Bags', image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=200&auto=format&fit=crop&q=80', catId: 'fashion', sub: 'Bags' },
  { label: 'Women Shoulder Bags', image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=200&auto=format&fit=crop&q=80', catId: 'fashion', sub: 'Bags' },
  { label: 'Men Jeans', image: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=200&auto=format&fit=crop&q=80', catId: 'fashion', sub: 'Men Fashion' },
  { label: 'Women Pumps', image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=200&auto=format&fit=crop&q=80', catId: 'fashion', sub: 'Shoes' },
  { label: 'Plus Size Dresses', image: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=200&auto=format&fit=crop&q=80', catId: 'fashion', sub: 'Curve' },
  { label: 'Lip Sets', image: 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=200&auto=format&fit=crop&q=80', catId: 'fashion', sub: 'Beauty' },
  { label: 'Women Earring Sets', image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=200&auto=format&fit=crop&q=80', catId: 'fashion', sub: 'Jewelry' },
  { label: 'Women Flat Sandals', image: 'https://images.unsplash.com/photo-1562273138-f46be4ebdf33?w=200&auto=format&fit=crop&q=80', catId: 'fashion', sub: 'Shoes' },
  { label: 'Baby Boys T-Shirts', image: 'https://images.unsplash.com/photo-1519725966455-23344fbe63bc?w=200&auto=format&fit=crop&q=80', catId: 'fashion', sub: 'Kids' },
  { label: 'Men T-Shirts', image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=200&auto=format&fit=crop&q=80', catId: 'fashion', sub: 'Men Fashion' },
  { label: 'Tablet Keyboards', image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=200&auto=format&fit=crop&q=80', catId: 'electronics', sub: 'Laptops' }
];

const YOU_MAY_ALSO_LIKE = [
  { label: 'Women Pajama Sets', image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=200&auto=format&fit=crop&q=80', catId: 'fashion', sub: 'Underwear' },
  { label: 'Women Bras', image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=200&auto=format&fit=crop&q=80', catId: 'fashion', sub: 'Underwear' },
  { label: 'Teen Girls Jeans', image: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=200&auto=format&fit=crop&q=80', catId: 'fashion', sub: 'Kids' },
  { label: 'Women Sports Sets', image: 'https://images.unsplash.com/photo-1518310383802-640c2de311b2?w=200&auto=format&fit=crop&q=80', catId: 'fashion', sub: 'Sports' },
  { label: 'Baby Girls Rompers', image: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=200&auto=format&fit=crop&q=80', catId: 'fashion', sub: 'Kids' },
  { label: 'Duvet Covers Sets', image: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=200&auto=format&fit=crop&q=80', catId: 'home', sub: 'Bedding' },
  { label: 'Women Hijab', image: 'https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?w=200&auto=format&fit=crop&q=80', catId: 'fashion', sub: 'Women Fashion' },
  { label: 'Kids Sneakers', image: 'https://images.unsplash.com/photo-1514989940723-e8e51635b782?w=200&auto=format&fit=crop&q=80', catId: 'fashion', sub: 'Kids' },
  { label: 'Women Sports Shoes', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=200&auto=format&fit=crop&q=80', catId: 'fashion', sub: 'Shoes' },
  { label: 'Women Bracelet Sets', image: 'https://images.unsplash.com/photo-1611591475171-8288590d6350?w=200&auto=format&fit=crop&q=80', catId: 'fashion', sub: 'Jewelry' },
  { label: 'Women Fine Rings', image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=200&auto=format&fit=crop&q=80', catId: 'fashion', sub: 'Jewelry' },
  { label: 'Press On False Nails', image: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=200&auto=format&fit=crop&q=80', catId: 'fashion', sub: 'Beauty' },
  { label: 'Women Flats', image: 'https://images.unsplash.com/photo-1562273138-f46be4ebdf33?w=200&auto=format&fit=crop&q=80', catId: 'fashion', sub: 'Shoes' },
  { label: 'Hair Claws', image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=200&auto=format&fit=crop&q=80', catId: 'fashion', sub: 'Jewelry' }
];

export const Header: React.FC = () => {
  const {
    setActiveView,
    setMainTab,
    unreadMessagesCount,
    savedCount,
    cartCount,
    setShowCartModal,
    language,
    toggleLanguage,
    openPLP,
    user,
    isLoggedIn
  } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [showCategoryMenu, setShowCategoryMenu] = useState(false);
  const [hoveredCatIndex, setHoveredCatIndex] = useState(0);
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const openCategoryMenu = () => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
    setShowCategoryMenu(true);
  };

  const scheduleCloseCategoryMenu = () => {
    if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
    closeTimerRef.current = setTimeout(() => {
      setShowCategoryMenu(false);
      closeTimerRef.current = null;
    }, 160);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    openPLP('all', undefined, searchQuery);
  };

  const handleCategoryClick = (cat: typeof MEGA_SIDEBAR[0]) => {
    setShowCategoryMenu(false);
    if (cat.isTrendsTab) {
      setMainTab('trends');
      setActiveView('none');
    } else {
      openPLP((cat.catId as any) || 'all', cat.sub);
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-2xs">
      {/* Black Top Announcement Bar */}
      <div className="bg-black text-white text-[11px] font-bold py-1.5 px-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1 text-amber-300 font-extrabold uppercase">
            <Sparkles className="w-3.5 h-3.5 fill-amber-300" />
            BANIYAS STORE
          </span>
          <span className="text-gray-400">|</span>
          <span className="text-gray-300">Fast Express Local Delivery & Free Posting</span>
        </div>

        <div className="flex items-center gap-4 text-xs font-bold">
          <div className="flex items-center gap-1 text-gray-300">
            <Globe className="w-3.5 h-3.5" />
            <span>English (US)</span>
          </div>
        </div>
      </div>

      {/* Main Desktop Header Content */}
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between gap-8">
        {/* Brand Logo: BANIYAS STORE */}
        <button
          onClick={() => {
            setActiveView('none');
            setMainTab('home');
          }}
          className="shrink-0 text-left group hover:opacity-90 transition-opacity"
        >
          <BaniyasLogo variant="light" size="md" />
        </button>

        {/* Central Search Bar with black button */}
        <form
          onSubmit={handleSearchSubmit}
          className="flex-1 max-w-2xl flex items-center border-2 border-black rounded-sm overflow-hidden bg-white shadow-2xs"
        >
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Earrings For Women Elegant, Dresses, Tops, Shoes..."
            className="w-full py-2 px-4 text-xs font-medium text-gray-900 bg-transparent focus:outline-none"
          />

          <button
            type="submit"
            className="bg-black hover:bg-zinc-800 text-white px-5 py-2 flex items-center justify-center transition-colors shrink-0"
          >
            <Search className="w-4 h-4 stroke-[3]" />
          </button>
        </form>

        {/* Right Navigation Controls */}
        <div className="flex items-center gap-6 shrink-0 text-gray-900">
          {/* Wishlist */}
          <button
            onClick={() => setActiveView('saved')}
            className="flex flex-col items-center group relative"
          >
            <Heart className="w-6 h-6 stroke-[1.8] group-hover:scale-110 transition-transform" />
            {savedCount > 0 && (
              <span className="absolute -top-1 -right-2 bg-black text-white text-[9px] font-black w-4 h-4 rounded-full flex items-center justify-center">
                {savedCount}
              </span>
            )}
          </button>

          {/* Cart / Shopping Bag */}
          <button
            onClick={() => setShowCartModal(true)}
            className="flex flex-col items-center group relative cursor-pointer"
            title="Shopping Bag"
          >
            <ShoppingBag className="w-6 h-6 stroke-[1.8] group-hover:scale-110 transition-transform" />
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-3 bg-brand text-white text-[9px] font-black w-4 h-4 rounded-full flex items-center justify-center shadow-2xs">
                {cartCount}
              </span>
            )}
          </button>

          {/* Profile User Icon */}
          {isLoggedIn ? (
            <button
              onClick={() => {
                setMainTab('me');
                setActiveView('none');
              }}
              className="flex items-center gap-2 group"
            >
              <div className="w-8 h-8 rounded-full bg-gray-100 border border-gray-300 overflow-hidden">
                <img src={user.avatar} alt="" className="w-full h-full object-cover" />
              </div>
              <span className="text-xs font-bold text-gray-900 group-hover:underline">
                {user.name.split(' ')[0]}
              </span>
            </button>
          ) : (
            <button
              onClick={() => setActiveView('auth')}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-black hover:bg-zinc-800 text-white font-bold text-xs rounded-lg transition-colors shadow-2xs"
            >
              <User className="w-3.5 h-3.5" />
              <span>Sign In / Register</span>
            </button>
          )}

          {/* Sell Button */}
          <button
            onClick={() => {
              setMainTab('sell');
              setActiveView('none');
            }}
            className="bg-black hover:bg-zinc-800 text-white font-black text-xs px-4 py-2 rounded-xs flex items-center gap-1 shadow-sm transition-transform active:scale-95"
          >
            <Plus className="w-4 h-4 stroke-[3]" />
            <span>POST AD</span>
          </button>
        </div>
      </div>

      {/* Secondary Horizontal Category Navigation Row */}
      <div className="bg-white border-t border-gray-200 relative">
        {/* Dim overlay outside the hover zone so leaving the panel collapses the menu */}
        {showCategoryMenu && (
          <button
            type="button"
            className="fixed inset-0 z-40 bg-black/15 cursor-default border-0"
            onClick={() => setShowCategoryMenu(false)}
            aria-label="Close categories menu"
          />
        )}

        <div
          className="relative z-50"
          onMouseLeave={scheduleCloseCategoryMenu}
        >
          <div className="max-w-7xl mx-auto px-4 flex items-center gap-6 overflow-x-auto scrollbar-none py-2 text-xs font-black text-gray-800">
            {/* Categories trigger — hover opens mega menu (Shein-style) */}
            <div className="relative shrink-0" onMouseEnter={openCategoryMenu}>
              <button
                type="button"
                aria-expanded={showCategoryMenu}
                aria-haspopup="true"
                className={`flex items-center gap-1 font-black py-1 border-r border-gray-300 pr-4 uppercase tracking-wider transition-colors ${
                  showCategoryMenu ? 'text-brand' : 'text-black hover:text-brand'
                }`}
              >
                <span>Categories</span>
                <ChevronDown
                  className={`w-4 h-4 stroke-[3] transition-transform duration-200 ${
                    showCategoryMenu ? 'rotate-180' : ''
                  }`}
                />
              </button>
            </div>

            {/* List of categories in horizontal row */}
            {MEGA_SIDEBAR.map((cat, idx) => (
              <button
                key={idx}
                onClick={() => handleCategoryClick(cat)}
                className="hover:text-brand shrink-0 transition-colors whitespace-nowrap text-gray-800 hover:underline tracking-tight font-black"
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Full-width mega menu — opens on hover, collapses on leave */}
          {showCategoryMenu && (
            <div
              className="absolute top-full left-0 right-0 border-t border-gray-200 shadow-2xl"
              onMouseEnter={openCategoryMenu}
            >
              <div className="max-w-7xl mx-auto bg-white flex overflow-hidden max-h-[min(70vh,640px)] text-left border-x border-b border-gray-200">
                {/* Left Sidebar Category List */}
                <div className="w-56 shrink-0 bg-[#F8F8F8] border-r border-gray-200 py-2 overflow-y-auto">
                  {MEGA_SIDEBAR.map((cat, idx) => {
                    const isHovered = hoveredCatIndex === idx;
                    return (
                      <button
                        key={idx}
                        onMouseEnter={() => setHoveredCatIndex(idx)}
                        onClick={() => handleCategoryClick(cat)}
                        className={`w-full text-left px-4 py-2.5 text-xs flex items-center justify-between transition-colors ${
                          isHovered
                            ? 'bg-white text-black font-extrabold border-l-4 border-black pl-3'
                            : 'text-gray-700 font-semibold hover:bg-gray-100/80'
                        }`}
                      >
                        <span className="truncate">{cat.label}</span>
                        {isHovered && <ChevronRight className="w-3.5 h-3.5 text-black shrink-0" />}
                      </button>
                    );
                  })}
                </div>

                {/* Right panel */}
                <div className="flex-1 p-5 overflow-y-auto bg-white space-y-6">
                  <div className="space-y-3">
                    <div className="flex items-center gap-1.5 border-b border-gray-100 pb-2">
                      <Grid className="w-4 h-4 text-brand" />
                      <h4 className="text-xs font-black uppercase text-gray-900 tracking-wider">
                        Picks for You — {MEGA_SIDEBAR[hoveredCatIndex]?.label || 'Recommended'}
                      </h4>
                    </div>

                    <div className="grid grid-cols-6 gap-3">
                      {PICKS_FOR_YOU.map((item, idx) => (
                        <button
                          key={idx}
                          onClick={() => {
                            setShowCategoryMenu(false);
                            openPLP(item.catId as any, item.sub);
                          }}
                          className="group flex flex-col items-center text-center space-y-1.5 p-1 rounded-lg hover:bg-gray-50 transition-all cursor-pointer"
                        >
                          <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-100 border border-gray-200 group-hover:scale-105 group-hover:border-black transition-all">
                            <img
                              src={item.image}
                              alt={item.label}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <span className="text-[11px] font-extrabold text-gray-800 leading-tight group-hover:text-black line-clamp-2">
                            {item.label}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-3 pt-2">
                    <div className="flex items-center gap-1.5 border-b border-gray-100 pb-2">
                      <Sparkles className="w-4 h-4 text-amber-500" />
                      <h4 className="text-xs font-black uppercase text-gray-900 tracking-wider">
                        You May Also Like
                      </h4>
                    </div>

                    <div className="grid grid-cols-7 gap-2.5">
                      {YOU_MAY_ALSO_LIKE.map((item, idx) => (
                        <button
                          key={idx}
                          onClick={() => {
                            setShowCategoryMenu(false);
                            openPLP(item.catId as any, item.sub);
                          }}
                          className="group flex flex-col items-center text-center space-y-1 p-1 rounded-lg hover:bg-gray-50 transition-all cursor-pointer"
                        >
                          <div className="w-14 h-14 rounded-full overflow-hidden bg-gray-100 border border-gray-200 group-hover:scale-105 group-hover:border-black transition-all">
                            <img
                              src={item.image}
                              alt={item.label}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <span className="text-[10px] font-bold text-gray-700 leading-tight group-hover:text-black line-clamp-2">
                            {item.label}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
