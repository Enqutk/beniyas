import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { CategoryId } from '../../types';
import { Search } from 'lucide-react';

// Subcategory grid items matching SHEIN Screenshot 1 & 4
const SHEIN_SIDEBAR_TABS = [
  { id: 'just_for_you', label: 'Just for You', catId: 'fashion' },
  { id: 'new_in', label: 'New In', catId: 'fashion' },
  { id: 'sale', label: 'Sale', catId: 'fashion' },
  { id: 'women_clothing', label: 'Women Clothing', catId: 'fashion' },
  { id: 'beachwear', label: 'Beachwear', catId: 'fashion' },
  { id: 'kids', label: 'Kids', catId: 'fashion' },
  { id: 'curve', label: 'Curve', catId: 'fashion' },
  { id: 'men_clothing', label: 'Men Clothing', catId: 'fashion' },
  { id: 'underwear', label: 'Underwear & Sleepwear', catId: 'fashion' },
  { id: 'shoes', label: 'Shoes', catId: 'fashion' },
  { id: 'home', label: 'Home & Living', catId: 'home' },
  { id: 'jewelry', label: 'Jewelry & Accessories', catId: 'fashion' },
  { id: 'beauty', label: 'Beauty & Health', catId: 'fashion' },
  { id: 'baby', label: 'Baby & Maternity', catId: 'fashion' },
  { id: 'sports', label: 'Sports & Outdoors', catId: 'fashion' },
  { id: 'bags', label: 'Bags & Luggage', catId: 'fashion' },
  { id: 'textiles', label: 'Home Textiles', catId: 'home' },
  { id: 'phones', label: 'Cell Phones & Accessories', catId: 'phones' }
];

const PICKS_FOR_YOU = [
  { name: 'Women Earring Sets', sub: 'Jewelry', image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=300&auto=format&fit=crop&q=80', catId: 'fashion' },
  { name: 'Women T-Shirts', sub: 'Tops', image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=300&auto=format&fit=crop&q=80', catId: 'fashion' },
  { name: 'Kids Activity Toys', sub: 'Kids', image: 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=300&auto=format&fit=crop&q=80', catId: 'home' },
  { name: 'Women Flat Sandals', sub: 'Shoes', image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=300&auto=format&fit=crop&q=80', catId: 'fashion' },
  { name: 'Teen Girls Jeans', sub: 'Pants', image: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=300&auto=format&fit=crop&q=80', catId: 'fashion' },
  { name: 'Women Watch Sets', sub: 'Watches', image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=300&auto=format&fit=crop&q=80', catId: 'electronics' },
  { name: 'Baby Boys Rompers', sub: 'Baby', image: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=300&auto=format&fit=crop&q=80', catId: 'fashion' },
  { name: 'Newborn Baby Sets', sub: 'Baby', image: 'https://images.unsplash.com/photo-1519689680058-324335c77eba?w=300&auto=format&fit=crop&q=80', catId: 'fashion' },
  { name: 'Dining Sets', sub: 'Furniture', image: 'https://images.unsplash.com/photo-1617806118233-18e1de247200?w=300&auto=format&fit=crop&q=80', catId: 'home' },
  { name: 'Lip Gloss', sub: 'Beauty', image: 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=300&auto=format&fit=crop&q=80', catId: 'fashion' },
  { name: 'Kitchen Tools', sub: 'Home', image: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=300&auto=format&fit=crop&q=80', catId: 'home' },
  { name: 'Press On Nails', sub: 'Beauty', image: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=300&auto=format&fit=crop&q=80', catId: 'fashion' }
];

const YOU_MAY_ALSO_LIKE = [
  { name: 'Men Shirts', sub: 'Shirts', image: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=300&auto=format&fit=crop&q=80', catId: 'fashion' },
  { name: 'Cups & Mugs', sub: 'Home', image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=300&auto=format&fit=crop&q=80', catId: 'home' },
  { name: 'Women Ring Sets', sub: 'Jewelry', image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=300&auto=format&fit=crop&q=80', catId: 'fashion' }
];

export const CategoriesView: React.FC = () => {
  const { openPLP, setActiveView } = useApp();
  const [activeTopTab, setActiveTopTab] = useState('All');
  const [activeSidebarTab, setActiveSidebarTab] = useState('just_for_you');

  const topTabs = ['All', 'Women', 'Curve', 'Kids', 'Men', 'Home'];

  return (
    <div className="flex flex-col h-[calc(100vh-105px)] bg-white overflow-hidden">
      {/* Search Header Bar */}
      <div className="p-2.5 bg-white border-b border-gray-100 flex items-center gap-2">
        <button
          onClick={() => setActiveView('search')}
          className="flex-1 bg-gray-100 rounded-full py-2 px-3 text-xs text-gray-400 flex items-center gap-2"
        >
          <Search className="w-4 h-4 text-gray-500" />
          <span>Search categories, items...</span>
        </button>
      </div>

      {/* Top Category Horizontal Tabs Bar (SHEIN screenshot 1) */}
      <div className="flex items-center overflow-x-auto scrollbar-none border-b border-gray-200 bg-white px-2">
        {topTabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTopTab(tab)}
            className={`py-2.5 px-3.5 text-xs font-black shrink-0 relative transition-colors ${
              activeTopTab === tab ? 'text-black' : 'text-gray-500'
            }`}
          >
            {tab}
            {activeTopTab === tab && (
              <span className="absolute bottom-0 left-2 right-2 h-0.5 bg-black rounded-full" />
            )}
          </button>
        ))}
      </div>

      {/* Main Split Body */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Sidebar: Vertical tabs list */}
        <div className="w-28 bg-[#F8F8F8] overflow-y-auto shrink-0 scrollbar-none divide-y divide-gray-100/50">
          {SHEIN_SIDEBAR_TABS.map((tab) => {
            const isSelected = activeSidebarTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveSidebarTab(tab.id)}
                className={`w-full py-3.5 px-2 text-left relative transition-colors flex items-center ${
                  isSelected
                    ? 'bg-white font-black text-black'
                    : 'text-gray-700 hover:bg-gray-100/60 font-medium'
                }`}
              >
                {isSelected && (
                  <span className="absolute left-0 top-0 bottom-0 w-1 bg-black" />
                )}
                <span className="text-[11px] leading-tight tracking-tight pl-1">
                  {tab.label}
                </span>
              </button>
            );
          })}
        </div>

        {/* Right Content Panel: Picks for You & Category circular grids */}
        <div className="flex-1 p-3 overflow-y-auto scrollbar-none bg-white space-y-5">
          {/* Section 1: Picks for You */}
          <div>
            <h3 className="text-xs font-black text-gray-900 mb-3">Picks for You</h3>
            <div className="grid grid-cols-3 gap-y-4 gap-x-2">
              {PICKS_FOR_YOU.map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => openPLP(item.catId as CategoryId, item.sub)}
                  className="flex flex-col items-center group text-center"
                >
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gray-100 border border-gray-200 overflow-hidden mb-1.5 shadow-2xs group-active:scale-95 transition-transform">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform"
                    />
                  </div>
                  <span className="text-[10px] font-bold text-gray-700 leading-tight group-hover:text-black line-clamp-2">
                    {item.name}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Section 2: You May Also Like */}
          <div className="pt-2 border-t border-gray-100">
            <h3 className="text-xs font-black text-gray-900 mb-3">You May Also Like</h3>
            <div className="grid grid-cols-3 gap-y-4 gap-x-2">
              {YOU_MAY_ALSO_LIKE.map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => openPLP(item.catId as CategoryId, item.sub)}
                  className="flex flex-col items-center group text-center"
                >
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gray-100 border border-gray-200 overflow-hidden mb-1.5 shadow-2xs group-active:scale-95 transition-transform">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform"
                    />
                  </div>
                  <span className="text-[10px] font-bold text-gray-700 leading-tight group-hover:text-black line-clamp-2">
                    {item.name}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
