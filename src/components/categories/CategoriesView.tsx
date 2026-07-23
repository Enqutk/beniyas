import React, { useMemo, useState } from 'react';
import { useApp } from '../../context/AppContext';
import { CategoryId } from '../../types';
import { Search } from 'lucide-react';

const SHEIN_SIDEBAR_TABS = [
  { id: 'just_for_you', label: 'Just for You', catId: 'fashion' as CategoryId, sub: 'Women Fashion' },
  { id: 'women', label: 'Women Clothing', catId: 'fashion' as CategoryId, sub: 'Women Fashion' },
  { id: 'men', label: 'Men Clothing', catId: 'fashion' as CategoryId, sub: 'Men Fashion' },
  { id: 'shoes', label: 'Shoes', catId: 'fashion' as CategoryId, sub: 'Shoes & Sneakers' },
  { id: 'phones', label: 'Phones', catId: 'phones' as CategoryId, sub: 'iPhone' },
  { id: 'electronics', label: 'Electronics', catId: 'electronics' as CategoryId, sub: 'Laptops & Computers' },
  { id: 'home', label: 'Home & Living', catId: 'home' as CategoryId, sub: 'Sofas & Living Room' },
  { id: 'vehicles', label: 'Vehicles', catId: 'vehicles' as CategoryId, sub: 'Toyota' }
];

const PICKS_BY_TAB: Record<string, { name: string; sub: string; image: string; catId: CategoryId }[]> = {
  just_for_you: [
    { name: 'Women Fashion', sub: 'Women Fashion', image: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=300&auto=format&fit=crop&q=80', catId: 'fashion' },
    { name: 'Men Fashion', sub: 'Men Fashion', image: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=300&auto=format&fit=crop&q=80', catId: 'fashion' },
    { name: 'Shoes', sub: 'Shoes & Sneakers', image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=300&auto=format&fit=crop&q=80', catId: 'fashion' },
    { name: 'iPhone', sub: 'iPhone', image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=300&auto=format&fit=crop&q=80', catId: 'phones' },
    { name: 'Laptops', sub: 'Laptops & Computers', image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=300&auto=format&fit=crop&q=80', catId: 'electronics' },
    { name: 'Sofas', sub: 'Sofas & Living Room', image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=300&auto=format&fit=crop&q=80', catId: 'home' },
    { name: 'Jewelry', sub: 'Jewelry', image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=300&auto=format&fit=crop&q=80', catId: 'fashion' },
    { name: 'Toyota', sub: 'Toyota', image: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=300&auto=format&fit=crop&q=80', catId: 'vehicles' },
    { name: 'Bags', sub: 'Bags & Watches', image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=300&auto=format&fit=crop&q=80', catId: 'fashion' }
  ],
  women: [
    { name: 'Dresses', sub: 'Women Fashion', image: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=300&auto=format&fit=crop&q=80', catId: 'fashion' },
    { name: 'Tops', sub: 'Women Fashion', image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=300&auto=format&fit=crop&q=80', catId: 'fashion' },
    { name: 'Jewelry', sub: 'Jewelry', image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=300&auto=format&fit=crop&q=80', catId: 'fashion' },
    { name: 'Bags', sub: 'Bags & Watches', image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=300&auto=format&fit=crop&q=80', catId: 'fashion' },
    { name: 'Shoes', sub: 'Shoes & Sneakers', image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=300&auto=format&fit=crop&q=80', catId: 'fashion' },
    { name: 'Watches', sub: 'Bags & Watches', image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=300&auto=format&fit=crop&q=80', catId: 'fashion' }
  ],
  men: [
    { name: 'Men T-Shirts', sub: 'Men Fashion', image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=300&auto=format&fit=crop&q=80', catId: 'fashion' },
    { name: 'Men Shirts', sub: 'Men Fashion', image: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=300&auto=format&fit=crop&q=80', catId: 'fashion' },
    { name: 'Men Jeans', sub: 'Men Fashion', image: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=300&auto=format&fit=crop&q=80', catId: 'fashion' },
    { name: 'Sneakers', sub: 'Shoes & Sneakers', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300&auto=format&fit=crop&q=80', catId: 'fashion' }
  ],
  shoes: [
    { name: 'Sneakers', sub: 'Shoes & Sneakers', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300&auto=format&fit=crop&q=80', catId: 'fashion' },
    { name: 'Sandals', sub: 'Shoes & Sneakers', image: 'https://images.unsplash.com/photo-1562273138-f46be4ebdf33?w=300&auto=format&fit=crop&q=80', catId: 'fashion' },
    { name: 'Heels', sub: 'Shoes & Sneakers', image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=300&auto=format&fit=crop&q=80', catId: 'fashion' }
  ],
  phones: [
    { name: 'iPhone', sub: 'iPhone', image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=300&auto=format&fit=crop&q=80', catId: 'phones' },
    { name: 'Samsung', sub: 'Samsung', image: 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=300&auto=format&fit=crop&q=80', catId: 'phones' },
    { name: 'Accessories', sub: 'Phone Accessories', image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=300&auto=format&fit=crop&q=80', catId: 'phones' }
  ],
  electronics: [
    { name: 'Laptops', sub: 'Laptops & Computers', image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=300&auto=format&fit=crop&q=80', catId: 'electronics' },
    { name: 'TVs', sub: 'TVs & Audio', image: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=300&auto=format&fit=crop&q=80', catId: 'electronics' },
    { name: 'Gaming', sub: 'Gaming & Consoles', image: 'https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=300&auto=format&fit=crop&q=80', catId: 'electronics' }
  ],
  home: [
    { name: 'Sofas', sub: 'Sofas & Living Room', image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=300&auto=format&fit=crop&q=80', catId: 'home' },
    { name: 'Beds', sub: 'Beds & Mattresses', image: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=300&auto=format&fit=crop&q=80', catId: 'home' },
    { name: 'Dining', sub: 'Dining Sets', image: 'https://images.unsplash.com/photo-1617806118233-18e1de247200?w=300&auto=format&fit=crop&q=80', catId: 'home' },
    { name: 'Decor', sub: 'Home Decor', image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=300&auto=format&fit=crop&q=80', catId: 'home' }
  ],
  vehicles: [
    { name: 'Toyota', sub: 'Toyota', image: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=300&auto=format&fit=crop&q=80', catId: 'vehicles' },
    { name: 'Hyundai', sub: 'Hyundai', image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=300&auto=format&fit=crop&q=80', catId: 'vehicles' },
    { name: 'Suzuki', sub: 'Suzuki', image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=300&auto=format&fit=crop&q=80', catId: 'vehicles' },
    { name: 'Parts', sub: 'Spare Parts', image: 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=300&auto=format&fit=crop&q=80', catId: 'vehicles' }
  ]
};

const YOU_MAY_ALSO_LIKE = [
  { name: 'Samsung', sub: 'Samsung', image: 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=300&auto=format&fit=crop&q=80', catId: 'phones' as CategoryId },
  { name: 'Gaming', sub: 'Gaming & Consoles', image: 'https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=300&auto=format&fit=crop&q=80', catId: 'electronics' as CategoryId },
  { name: 'Jewelry', sub: 'Jewelry', image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=300&auto=format&fit=crop&q=80', catId: 'fashion' as CategoryId },
  { name: 'Sofas', sub: 'Sofas & Living Room', image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=300&auto=format&fit=crop&q=80', catId: 'home' as CategoryId },
  { name: 'Bags', sub: 'Bags & Watches', image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=300&auto=format&fit=crop&q=80', catId: 'fashion' as CategoryId },
  { name: 'Hyundai', sub: 'Hyundai', image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=300&auto=format&fit=crop&q=80', catId: 'vehicles' as CategoryId }
];

const TOP_TABS = ['All', 'Fashion', 'Phones', 'Tech', 'Home', 'Cars'];

const TOP_TAB_SIDEBAR: Record<string, string[]> = {
  All: SHEIN_SIDEBAR_TABS.map(t => t.id),
  Fashion: ['just_for_you', 'women', 'men', 'shoes'],
  Phones: ['phones'],
  Tech: ['electronics', 'phones'],
  Home: ['home'],
  Cars: ['vehicles']
};

export const CategoriesView: React.FC = () => {
  const { openPLP, setActiveView } = useApp();
  const [activeTopTab, setActiveTopTab] = useState('All');
  const [activeSidebarTab, setActiveSidebarTab] = useState('just_for_you');

  const visibleSidebar = useMemo(() => {
    const ids = TOP_TAB_SIDEBAR[activeTopTab] || TOP_TAB_SIDEBAR.All;
    return SHEIN_SIDEBAR_TABS.filter(t => ids.includes(t.id));
  }, [activeTopTab]);

  const picks = PICKS_BY_TAB[activeSidebarTab] || PICKS_BY_TAB.just_for_you;
  const activeSidebar = SHEIN_SIDEBAR_TABS.find(t => t.id === activeSidebarTab);

  return (
    <div className="flex flex-col h-[calc(100dvh-3.5rem)] bg-white overflow-hidden">
      <div className="p-2 bg-white border-b border-gray-100 shrink-0">
        <button
          type="button"
          onClick={() => setActiveView('search')}
          className="w-full bg-gray-100 rounded-full py-2 px-3 text-xs text-gray-400 flex items-center gap-2"
        >
          <Search className="w-4 h-4 text-gray-500" />
          <span>Search categories, items...</span>
        </button>
      </div>

      <div className="flex items-center overflow-x-auto scrollbar-none border-b border-gray-200 bg-white px-1 shrink-0">
        {TOP_TABS.map(tab => (
          <button
            key={tab}
            type="button"
            onClick={() => {
              setActiveTopTab(tab);
              const first = (TOP_TAB_SIDEBAR[tab] || [])[0];
              if (first) setActiveSidebarTab(first);
            }}
            className={`py-2.5 px-3.5 text-xs shrink-0 relative ${
              activeTopTab === tab ? 'font-black text-black' : 'font-semibold text-gray-500'
            }`}
          >
            {tab}
            {activeTopTab === tab && (
              <span className="absolute bottom-0 left-2 right-2 h-[3px] bg-black rounded-full" />
            )}
          </button>
        ))}
      </div>

      <div className="flex-1 flex overflow-hidden min-h-0">
        <div className="w-[30%] max-w-[7.5rem] bg-[#F5F5F5] overflow-y-auto shrink-0 scrollbar-none">
          {visibleSidebar.map(tab => {
            const isSelected = activeSidebarTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveSidebarTab(tab.id)}
                className={`w-full py-3.5 px-2 text-left transition-colors ${
                  isSelected
                    ? 'bg-brand text-white font-black'
                    : 'text-gray-800 font-medium active:bg-gray-200'
                }`}
              >
                <span className="text-[11px] leading-tight block">{tab.label}</span>
              </button>
            );
          })}
        </div>

        <div className="flex-1 p-3 overflow-y-auto scrollbar-none bg-white space-y-5 min-w-0">
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-xs font-black text-gray-900">Picks for You</h3>
              {activeSidebar && (
                <button
                  type="button"
                  onClick={() => openPLP(activeSidebar.catId, activeSidebar.sub)}
                  className="text-[10px] font-bold text-gray-500"
                >
                  View all
                </button>
              )}
            </div>
            <div className="grid grid-cols-3 gap-y-4 gap-x-1.5">
              {picks.map((item, idx) => (
                <button
                  key={`${item.name}-${idx}`}
                  type="button"
                  onClick={() => openPLP(item.catId, item.sub)}
                  className="flex flex-col items-center text-center active:opacity-80"
                >
                  <div className="w-[4.5rem] h-[4.5rem] rounded-full bg-gray-100 border border-gray-200 overflow-hidden mb-1.5">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  <span className="text-[10px] font-bold text-gray-700 leading-tight line-clamp-2 px-0.5">
                    {item.name}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div className="pt-2 border-t border-gray-100">
            <h3 className="text-xs font-black text-gray-900 mb-3">You May Also Like</h3>
            <div className="grid grid-cols-3 gap-y-4 gap-x-1.5">
              {YOU_MAY_ALSO_LIKE.map((item, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => openPLP(item.catId, item.sub)}
                  className="flex flex-col items-center text-center active:opacity-80"
                >
                  <div className="w-[4.5rem] h-[4.5rem] rounded-full bg-gray-100 border border-gray-200 overflow-hidden mb-1.5">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  <span className="text-[10px] font-bold text-gray-700 leading-tight line-clamp-2 px-0.5">
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
