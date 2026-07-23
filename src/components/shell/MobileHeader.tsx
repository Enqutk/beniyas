import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { BaniyasLogo } from '../common/BaniyasLogo';
import { Search, Heart, ShoppingBag, Menu, Camera, X, Globe } from 'lucide-react';

export const MobileHeader: React.FC = () => {
  const {
    setActiveView,
    setMainTab,
    unreadMessagesCount,
    savedCount,
    cartCount,
    setShowCartModal,
    language,
    toggleLanguage
  } = useApp();

  const [drawerOpen, setDrawerOpen] = useState(false);

  const categoriesList = [
    { name: 'Just for You', count: '100+' },
    { name: 'New In', count: '50+' },
    { name: 'Sale', count: '80+' },
    { name: 'Women Clothing', count: '200+' },
    { name: 'Beachwear', count: '30+' },
    { name: 'Kids', count: '90+' },
    { name: 'Curve', count: '40+' },
    { name: 'Men Clothing', count: '120+' },
    { name: 'Underwear & Sleepwear', count: '70+' },
    { name: 'Shoes', count: '150+' },
    { name: 'Home & Living', count: '110+' },
    { name: 'Jewelry & Accessories', count: '160+' },
    { name: 'Beauty & Health', count: '90+' },
    { name: 'Baby & Maternity', count: '40+' },
    { name: 'Sports & Outdoors', count: '60+' },
    { name: 'Bags & Luggage', count: '85+' },
    { name: 'Home Textiles', count: '45+' },
    { name: 'Cell Phones & Accessories', count: '130+' },
    { name: 'Automotive', count: '25+' }
  ];

  return (
    <>
      <header className="sticky top-0 z-30 bg-white border-b border-gray-200 shadow-2xs">
        {/* Main Top Bar */}
        <div className="px-3 py-2 flex items-center justify-between gap-2">
          {/* Menu Drawer Toggle */}
          <button
            onClick={() => setDrawerOpen(true)}
            className="p-1 hover:bg-gray-100 rounded-lg text-black shrink-0"
          >
            <Menu className="w-5 h-5 stroke-[2.5]" />
          </button>

          {/* BANIYAS Brand Logo */}
          <button
            onClick={() => {
              setMainTab('home');
              setActiveView('none');
            }}
            className="shrink-0 text-center hover:opacity-90 transition-opacity"
          >
            <BaniyasLogo variant="light" size="sm" />
          </button>

          {/* Search Pill */}
          <button
            onClick={() => setActiveView('search')}
            className="flex-1 bg-gray-100 hover:bg-gray-150 transition-colors rounded-full py-1.5 px-3 flex items-center justify-between text-xs text-gray-400 mx-1 border border-transparent"
          >
            <span className="truncate text-gray-500 font-medium">Shoes For Women</span>
            <div className="flex items-center gap-1.5 shrink-0 text-gray-400">
              <Camera className="w-4 h-4" />
              <Search className="w-4 h-4 text-black" />
            </div>
          </button>

          {/* Right Icons: Heart & Cart */}
          <div className="flex items-center gap-1.5 shrink-0">
            {/* Heart / Wishlist */}
            <button
              onClick={() => setActiveView('saved')}
              className="p-1 relative text-gray-900 hover:text-black"
            >
              <Heart className="w-5 h-5 stroke-[2]" />
              {savedCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-black text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {savedCount}
                </span>
              )}
            </button>

            {/* Shopping Cart with Badge */}
            <button
              onClick={() => setShowCartModal(true)}
              className="p-1 relative text-gray-900 hover:text-black cursor-pointer"
            >
              <ShoppingBag className="w-5 h-5 stroke-[2]" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#FF3F6C] text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-2xs">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Slide-out Category Drawer (SHEIN screenshot 4 & 5) */}
      {drawerOpen && (
        <div className="fixed inset-0 z-50 flex">
          {/* Backdrop */}
          <div
            onClick={() => setDrawerOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-2xs transition-opacity"
          />

          {/* Drawer Menu Panel */}
          <div className="relative w-4/5 max-w-xs bg-white h-full shadow-2xl flex flex-col z-10">
            <div className="p-3 bg-black text-white flex items-center justify-between">
              <span className="font-sans font-black text-sm tracking-wider uppercase">Baniyas Store</span>
              <button onClick={() => setDrawerOpen(false)} className="p-1 text-white hover:opacity-80">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-2 border-b border-gray-100 flex items-center justify-between text-xs bg-gray-50">
              <span className="font-bold text-gray-700 flex items-center gap-1">
                <Globe className="w-3.5 h-3.5 text-gray-500" />
                Language: English
              </span>
            </div>

            <div className="flex-1 overflow-y-auto divide-y divide-gray-100 p-2">
              {categoriesList.map((cat, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setDrawerOpen(false);
                    setMainTab('categories');
                  }}
                  className="w-full py-3 px-2 text-left flex items-center justify-between hover:bg-gray-50 text-xs font-bold text-gray-800"
                >
                  <span>{cat.name}</span>
                  <span className="text-[10px] text-gray-400 font-normal">&gt;</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
