import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { BaniyasLogo } from '../common/BaniyasLogo';
import {
  Search,
  Heart,
  ShoppingBag,
  Menu,
  Camera,
  X,
  Globe,
  ChevronRight,
  Home,
  Headset,
  User,
  DollarSign
} from 'lucide-react';

const TOP_TABS = ['All', 'Women', 'Curve', 'Kids', 'Men', 'Home'];

const DRAWER_CATEGORIES = [
  { name: 'Just for You', image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=120&auto=format&fit=crop&q=80', catId: 'fashion', sub: 'Women Fashion' },
  { name: 'Women Clothing', image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=120&auto=format&fit=crop&q=80', catId: 'fashion', sub: 'Women Fashion' },
  { name: 'Men Clothing', image: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=120&auto=format&fit=crop&q=80', catId: 'fashion', sub: 'Men Fashion' },
  { name: 'Shoes', image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=120&auto=format&fit=crop&q=80', catId: 'fashion', sub: 'Shoes & Sneakers' },
  { name: 'Phones', image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=120&auto=format&fit=crop&q=80', catId: 'phones', sub: 'iPhone' },
  { name: 'Electronics', image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=120&auto=format&fit=crop&q=80', catId: 'electronics', sub: 'Laptops & Computers' },
  { name: 'Home & Living', image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=120&auto=format&fit=crop&q=80', catId: 'home', sub: 'Sofas & Living Room' },
  { name: 'Vehicles', image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=120&auto=format&fit=crop&q=80', catId: 'vehicles', sub: 'Toyota' }
];

export const MobileHeader: React.FC = () => {
  const {
    setActiveView,
    setMainTab,
    savedCount,
    cartCount,
    setShowCartModal,
    openPLP,
    language,
    toggleLanguage
  } = useApp();

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [activeTopTab, setActiveTopTab] = useState('All');
  const [infoOpen, setInfoOpen] = useState(true);

  return (
    <>
      <header className="sticky top-0 z-30 bg-white border-b border-gray-200">
        <div className="px-2.5 py-2 flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => setDrawerOpen(true)}
            className="p-1.5 text-black shrink-0"
            aria-label="Open menu"
          >
            <Menu className="w-5 h-5 stroke-[2.5]" />
          </button>

          <button
            type="button"
            onClick={() => {
              setMainTab('home');
              setActiveView('none');
            }}
            className="shrink-0"
          >
            <BaniyasLogo variant="light" size="sm" />
          </button>

          <button
            type="button"
            onClick={() => setActiveView('search')}
            className="flex-1 min-w-0 bg-gray-100 rounded-full py-1.5 px-2.5 flex items-center justify-between text-xs text-gray-400"
          >
            <span className="truncate text-gray-500 font-medium pl-0.5">Shoes For Women</span>
            <div className="flex items-center gap-1.5 shrink-0 text-gray-500">
              <Camera className="w-3.5 h-3.5" />
              <Search className="w-4 h-4 text-black" />
            </div>
          </button>

          <button
            type="button"
            onClick={() => setActiveView('saved')}
            className="p-1.5 relative text-gray-900 shrink-0"
            aria-label="Wishlist"
          >
            <Heart className="w-5 h-5 stroke-[2]" />
            {savedCount > 0 && (
              <span className="absolute top-0 right-0 bg-black text-white text-[8px] font-bold min-w-[14px] h-[14px] rounded-full flex items-center justify-center">
                {savedCount}
              </span>
            )}
          </button>

          <button
            type="button"
            onClick={() => setShowCartModal(true)}
            className="p-1.5 relative text-gray-900 shrink-0"
            aria-label="Cart"
          >
            <ShoppingBag className="w-5 h-5 stroke-[2]" />
            {cartCount > 0 && (
              <span className="absolute top-0 right-0 bg-[#FF3F6C] text-white text-[8px] font-bold min-w-[14px] h-[14px] rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </header>

      {drawerOpen && (
        <div className="fixed inset-0 z-50 flex md:hidden">
          <button
            type="button"
            className="absolute inset-0 bg-black/50 border-0"
            aria-label="Close menu"
            onClick={() => setDrawerOpen(false)}
          />

          <div className="relative w-[86%] max-w-sm bg-white h-full shadow-2xl flex flex-col z-10">
            {/* Top tabs + close */}
            <div className="flex items-center border-b border-gray-200 pr-1">
              <div className="flex-1 flex items-center overflow-x-auto scrollbar-none px-1">
                {TOP_TABS.map(tab => (
                  <button
                    key={tab}
                    type="button"
                    onClick={() => setActiveTopTab(tab)}
                    className={`relative shrink-0 py-3 px-3 text-xs ${
                      activeTopTab === tab ? 'font-black text-black' : 'font-semibold text-gray-500'
                    }`}
                  >
                    {tab}
                    {activeTopTab === tab && (
                      <span className="absolute bottom-0 left-2 right-2 h-0.5 bg-black rounded-full" />
                    )}
                  </button>
                ))}
              </div>
              <button
                type="button"
                onClick={() => setDrawerOpen(false)}
                className="shrink-0 m-1.5 w-8 h-8 bg-black text-white flex items-center justify-center"
                aria-label="Close"
              >
                <X className="w-4 h-4 stroke-[3]" />
              </button>
              <button
                type="button"
                onClick={() => {
                  setDrawerOpen(false);
                  setShowCartModal(true);
                }}
                className="shrink-0 p-2 text-black"
              >
                <ShoppingBag className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto">
              {DRAWER_CATEGORIES.map(cat => (
                <button
                  key={cat.name}
                  type="button"
                  onClick={() => {
                    setDrawerOpen(false);
                    openPLP(cat.catId as any, cat.sub);
                  }}
                  className="w-full py-3 px-3 flex items-center gap-3 border-b border-gray-100 text-left active:bg-gray-50"
                >
                  <img
                    src={cat.image}
                    alt=""
                    className="w-10 h-10 rounded-full object-cover bg-gray-100 shrink-0"
                  />
                  <span className="flex-1 text-xs font-bold text-gray-900">{cat.name}</span>
                  <ChevronRight className="w-4 h-4 text-gray-300 shrink-0" />
                </button>
              ))}

              <div className="border-t border-gray-200 mt-1">
                <button
                  type="button"
                  onClick={toggleLanguage}
                  className="w-full py-3.5 px-3 flex items-center gap-3 border-b border-gray-100"
                >
                  <span className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                    <DollarSign className="w-4 h-4" />
                  </span>
                  <span className="flex-1 text-xs font-bold text-left">Change Currency</span>
                  <span className="text-xs text-gray-500 font-semibold">ETB</span>
                </button>
                <button
                  type="button"
                  onClick={toggleLanguage}
                  className="w-full py-3.5 px-3 flex items-center gap-3 border-b border-gray-100"
                >
                  <span className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                    <Globe className="w-4 h-4" />
                  </span>
                  <span className="flex-1 text-xs font-bold text-left">Change Language</span>
                  <span className="text-xs text-gray-500 font-semibold">
                    {language === 'EN' ? 'English' : 'Amharic'}
                  </span>
                </button>
              </div>

              <div className="px-3 py-3 border-b border-gray-100">
                <button
                  type="button"
                  onClick={() => setInfoOpen(v => !v)}
                  className="w-full flex items-center justify-between text-xs font-black uppercase tracking-wide"
                >
                  Baniyas Info
                  <ChevronRight className={`w-4 h-4 transition-transform ${infoOpen ? 'rotate-90' : ''}`} />
                </button>
                {infoOpen && (
                  <ul className="mt-2 space-y-2.5 text-xs font-semibold text-gray-600">
                    {['Shipping Info', 'Return Policy', 'How to Pay', 'Privacy Policy', 'Terms & Conditions'].map(
                      item => (
                        <li key={item}>
                          <button
                            type="button"
                            onClick={() => {
                              setDrawerOpen(false);
                              setActiveView('help');
                            }}
                            className="hover:text-black"
                          >
                            {item}
                          </button>
                        </li>
                      )
                    )}
                  </ul>
                )}
              </div>
            </div>

            <div className="border-t border-gray-200 grid grid-cols-4 py-2 bg-white">
              {[
                { icon: Home, label: 'Home', action: () => { setMainTab('home'); setActiveView('none'); } },
                { icon: Heart, label: 'Wishlist', action: () => setActiveView('saved') },
                { icon: Headset, label: 'Help', action: () => setActiveView('help') },
                { icon: User, label: 'Me', action: () => { setMainTab('me'); setActiveView('none'); } }
              ].map(({ icon: Icon, label, action }) => (
                <button
                  key={label}
                  type="button"
                  onClick={() => {
                    setDrawerOpen(false);
                    action();
                  }}
                  className="flex flex-col items-center gap-0.5 text-gray-700 py-1"
                >
                  <Icon className="w-5 h-5" />
                  <span className="text-[9px] font-bold">{label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
