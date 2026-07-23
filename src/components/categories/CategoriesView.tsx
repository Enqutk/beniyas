import React, { useMemo, useState } from 'react';
import { useApp } from '../../context/AppContext';
import { CategoryId } from '../../types';
import { Search } from 'lucide-react';

const SHEIN_SIDEBAR_TABS = [
  { id: 'just_for_you', label: 'Just for You', catId: 'fashion' as CategoryId, sub: 'Tops' },
  { id: 'new_in', label: 'New In', catId: 'fashion' as CategoryId, sub: 'Dresses' },
  { id: 'sale', label: 'Sale', catId: 'fashion' as CategoryId, sub: 'Sale' },
  { id: 'women_clothing', label: 'Women Clothing', catId: 'fashion' as CategoryId, sub: 'Women Fashion' },
  { id: 'beachwear', label: 'Beachwear', catId: 'fashion' as CategoryId, sub: 'Beachwear' },
  { id: 'kids', label: 'Kids', catId: 'fashion' as CategoryId, sub: 'Kids' },
  { id: 'curve', label: 'Curve', catId: 'fashion' as CategoryId, sub: 'Curve' },
  { id: 'men_clothing', label: 'Men Clothing', catId: 'fashion' as CategoryId, sub: 'Men Fashion' },
  { id: 'underwear', label: 'Underwear & Sleepwear', catId: 'fashion' as CategoryId, sub: 'Underwear' },
  { id: 'shoes', label: 'Shoes', catId: 'fashion' as CategoryId, sub: 'Shoes' },
  { id: 'home', label: 'Home & Living', catId: 'home' as CategoryId, sub: 'Sofas & Living Room' },
  { id: 'jewelry', label: 'Jewelry & Accessories', catId: 'fashion' as CategoryId, sub: 'Jewelry' },
  { id: 'beauty', label: 'Beauty & Health', catId: 'fashion' as CategoryId, sub: 'Beauty' },
  { id: 'baby', label: 'Baby & Maternity', catId: 'fashion' as CategoryId, sub: 'Baby' },
  { id: 'sports', label: 'Sports & Outdoors', catId: 'fashion' as CategoryId, sub: 'Sports' },
  { id: 'bags', label: 'Bags & Luggage', catId: 'fashion' as CategoryId, sub: 'Bags' },
  { id: 'textiles', label: 'Home Textiles', catId: 'home' as CategoryId, sub: 'Bedding' },
  { id: 'phones', label: 'Cell Phones & Accessories', catId: 'phones' as CategoryId, sub: 'iPhone' }
];

const PICKS_BY_TAB: Record<string, { name: string; sub: string; image: string; catId: CategoryId }[]> = {
  just_for_you: [
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
  ],
  women_clothing: [
    { name: 'Dresses', sub: 'Dresses', image: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=300&auto=format&fit=crop&q=80', catId: 'fashion' },
    { name: 'Tops', sub: 'Tops', image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=300&auto=format&fit=crop&q=80', catId: 'fashion' },
    { name: 'Bottoms', sub: 'Pants', image: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=300&auto=format&fit=crop&q=80', catId: 'fashion' },
    { name: 'Co-ords', sub: 'Women Fashion', image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=300&auto=format&fit=crop&q=80', catId: 'fashion' },
    { name: 'Jackets', sub: 'Women Fashion', image: 'https://images.unsplash.com/photo-1487222477894-6973a9c3fd54?w=300&auto=format&fit=crop&q=80', catId: 'fashion' },
    { name: 'Skirts', sub: 'Women Fashion', image: 'https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?w=300&auto=format&fit=crop&q=80', catId: 'fashion' }
  ],
  men_clothing: [
    { name: 'Men T-Shirts', sub: 'Men Fashion', image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=300&auto=format&fit=crop&q=80', catId: 'fashion' },
    { name: 'Men Shirts', sub: 'Men Fashion', image: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=300&auto=format&fit=crop&q=80', catId: 'fashion' },
    { name: 'Men Jeans', sub: 'Men Fashion', image: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=300&auto=format&fit=crop&q=80', catId: 'fashion' },
    { name: 'Hoodies', sub: 'Men Fashion', image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=300&auto=format&fit=crop&q=80', catId: 'fashion' }
  ],
  shoes: [
    { name: 'Sneakers', sub: 'Shoes', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300&auto=format&fit=crop&q=80', catId: 'fashion' },
    { name: 'Flat Sandals', sub: 'Shoes', image: 'https://images.unsplash.com/photo-1562273138-f46be4ebdf33?w=300&auto=format&fit=crop&q=80', catId: 'fashion' },
    { name: 'Heels', sub: 'Shoes', image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=300&auto=format&fit=crop&q=80', catId: 'fashion' },
    { name: 'Boots', sub: 'Shoes', image: 'https://images.unsplash.com/photo-1608256246200-53e635b5b65f?w=300&auto=format&fit=crop&q=80', catId: 'fashion' }
  ],
  home: [
    { name: 'Sofas', sub: 'Sofas & Living Room', image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=300&auto=format&fit=crop&q=80', catId: 'home' },
    { name: 'Dining Sets', sub: 'Dining Sets', image: 'https://images.unsplash.com/photo-1617806118233-18e1de247200?w=300&auto=format&fit=crop&q=80', catId: 'home' },
    { name: 'Bedding', sub: 'Bedding', image: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=300&auto=format&fit=crop&q=80', catId: 'home' },
    { name: 'Kitchen Tools', sub: 'Home', image: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=300&auto=format&fit=crop&q=80', catId: 'home' }
  ],
  phones: [
    { name: 'iPhone', sub: 'iPhone', image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=300&auto=format&fit=crop&q=80', catId: 'phones' },
    { name: 'Samsung', sub: 'Samsung', image: 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=300&auto=format&fit=crop&q=80', catId: 'phones' },
    { name: 'Accessories', sub: 'Phone Accessories', image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=300&auto=format&fit=crop&q=80', catId: 'phones' }
  ]
};

const YOU_MAY_ALSO_LIKE = [
  { name: 'Men Shirts', sub: 'Shirts', image: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=300&auto=format&fit=crop&q=80', catId: 'fashion' as CategoryId },
  { name: 'Cups & Mugs', sub: 'Home', image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=300&auto=format&fit=crop&q=80', catId: 'home' as CategoryId },
  { name: 'Women Ring Sets', sub: 'Jewelry', image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=300&auto=format&fit=crop&q=80', catId: 'fashion' as CategoryId },
  { name: 'Sneakers', sub: 'Shoes', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300&auto=format&fit=crop&q=80', catId: 'fashion' as CategoryId },
  { name: 'Bags', sub: 'Bags', image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=300&auto=format&fit=crop&q=80', catId: 'fashion' as CategoryId },
  { name: 'Lip Gloss', sub: 'Beauty', image: 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=300&auto=format&fit=crop&q=80', catId: 'fashion' as CategoryId }
];

const TOP_TAB_SIDEBAR: Record<string, string[]> = {
  All: SHEIN_SIDEBAR_TABS.map(t => t.id),
  Women: ['just_for_you', 'new_in', 'sale', 'women_clothing', 'beachwear', 'curve', 'underwear', 'shoes', 'jewelry', 'beauty', 'bags'],
  Curve: ['curve', 'women_clothing', 'shoes', 'jewelry'],
  Kids: ['kids', 'baby', 'shoes'],
  Men: ['men_clothing', 'shoes', 'bags', 'sports'],
  Home: ['home', 'textiles']
};

export const CategoriesView: React.FC = () => {
  const { openPLP, setActiveView } = useApp();
  const [activeTopTab, setActiveTopTab] = useState('All');
  const [activeSidebarTab, setActiveSidebarTab] = useState('just_for_you');

  const topTabs = ['All', 'Women', 'Curve', 'Kids', 'Men', 'Home'];

  const visibleSidebar = useMemo(() => {
    const ids = TOP_TAB_SIDEBAR[activeTopTab] || TOP_TAB_SIDEBAR.All;
    return SHEIN_SIDEBAR_TABS.filter(t => ids.includes(t.id));
  }, [activeTopTab]);

  const picks = PICKS_BY_TAB[activeSidebarTab] || PICKS_BY_TAB.just_for_you;
  const activeSidebar = SHEIN_SIDEBAR_TABS.find(t => t.id === activeSidebarTab);

  return (
    <div className="flex flex-col h-[calc(100dvh-3.5rem)] bg-white overflow-hidden">
      {/* Search */}
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

      {/* Top tabs */}
      <div className="flex items-center overflow-x-auto scrollbar-none border-b border-gray-200 bg-white px-1 shrink-0">
        {topTabs.map(tab => (
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

      {/* Split body */}
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
                    ? 'bg-black text-white font-black'
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
