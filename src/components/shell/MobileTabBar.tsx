import React from 'react';
import { useApp, MainTab } from '../../context/AppContext';
import { Home, Grid, Sparkles, MessageSquare, User, Plus } from 'lucide-react';

export const MobileTabBar: React.FC = () => {
  const {
    mainTab,
    setMainTab,
    activeView,
    setActiveView,
    unreadMessagesCount
  } = useApp();

  // Hide tab bar on search, chat thread, or sell wizard views
  if (['search', 'chat', 'pdp'].includes(activeView)) {
    return null;
  }

  const handleTabClick = (tab: MainTab) => {
    setMainTab(tab);
    setActiveView('none'); // Reset active overlay view back to main tab view
  };

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-gray-200 shadow-lg px-1 pb-safe pt-1">
      <div className="flex items-center justify-between relative max-w-md mx-auto px-1">
        {/* Tab 1: Shop */}
        <button
          onClick={() => handleTabClick('home')}
          className={`flex flex-col items-center justify-center py-1 px-2.5 transition-colors ${
            mainTab === 'home' && activeView === 'none'
              ? 'text-black font-black'
              : 'text-gray-500 hover:text-gray-900'
          }`}
        >
          <Home className="w-5 h-5 mb-0.5" />
          <span className="text-[10px] tracking-tight">Shop</span>
        </button>

        {/* Tab 2: Category */}
        <button
          onClick={() => handleTabClick('categories')}
          className={`flex flex-col items-center justify-center py-1 px-2.5 transition-colors ${
            mainTab === 'categories' && activeView === 'none'
              ? 'text-black font-black'
              : 'text-gray-500 hover:text-gray-900'
          }`}
        >
          <Grid className="w-5 h-5 mb-0.5" />
          <span className="text-[10px] tracking-tight">Category</span>
        </button>

        {/* Tab 3: Trends (SHEIN Sparkles/Trends) */}
        <button
          onClick={() => handleTabClick('trends')}
          className={`flex flex-col items-center justify-center py-1 px-2.5 transition-colors ${
            mainTab === 'trends' && activeView === 'none'
              ? 'text-black font-black'
              : 'text-gray-500 hover:text-gray-900'
          }`}
        >
          <Sparkles className="w-5 h-5 mb-0.5 text-black fill-black/10" />
          <span className="text-[10px] tracking-tight">Trends</span>
        </button>

        {/* Tab 4: Messages / Cart */}
        <button
          onClick={() => handleTabClick('messages')}
          className={`flex flex-col items-center justify-center py-1 px-2.5 transition-colors relative ${
            mainTab === 'messages' && activeView === 'none'
              ? 'text-black font-black'
              : 'text-gray-500 hover:text-gray-900'
          }`}
        >
          <div className="relative">
            <MessageSquare className="w-5 h-5 mb-0.5" />
            <span className="absolute -top-1 -right-2 bg-[#FF3F6C] text-white text-[8px] font-black px-1 rounded-full shadow-xs">
              {unreadMessagesCount > 0 ? unreadMessagesCount : '-$0.22'}
            </span>
          </div>
          <span className="text-[10px] tracking-tight">Cart</span>
        </button>

        {/* Tab 5: Me (Account) */}
        <button
          onClick={() => handleTabClick('me')}
          className={`flex flex-col items-center justify-center py-1 px-2.5 transition-colors ${
            mainTab === 'me' && activeView === 'none'
              ? 'text-black font-black'
              : 'text-gray-500 hover:text-gray-900'
          }`}
        >
          <User className="w-5 h-5 mb-0.5" />
          <span className="text-[10px] tracking-tight">Me</span>
        </button>
      </div>
    </nav>
  );
};


