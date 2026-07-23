import React from 'react';
import { useApp, MainTab } from '../../context/AppContext';
import { Home, LayoutGrid, Sparkles, MessageSquare, User } from 'lucide-react';

export const MobileTabBar: React.FC = () => {
  const {
    mainTab,
    setMainTab,
    activeView,
    setActiveView,
    unreadMessagesCount
  } = useApp();

  if (['search', 'chat', 'pdp'].includes(activeView)) {
    return null;
  }

  const handleTabClick = (tab: MainTab) => {
    setMainTab(tab);
    setActiveView('none');
  };

  const tabClass = (active: boolean) =>
    `flex flex-1 flex-col items-center justify-center py-1.5 min-w-0 transition-colors ${
      active ? 'text-black' : 'text-gray-500'
    }`;

  return (
    <nav className="md:hidden fixed bottom-0 inset-x-0 z-40 bg-white border-t border-gray-200 pb-[env(safe-area-inset-bottom)]">
      <div className="flex items-stretch justify-between max-w-lg mx-auto h-14">
        <button
          type="button"
          onClick={() => handleTabClick('home')}
          className={tabClass(mainTab === 'home' && activeView === 'none')}
        >
          <Home className={`w-5 h-5 mb-0.5 ${mainTab === 'home' && activeView === 'none' ? 'stroke-[2.5]' : ''}`} />
          <span className={`text-[10px] tracking-tight ${mainTab === 'home' && activeView === 'none' ? 'font-black' : 'font-medium'}`}>
            Shop
          </span>
        </button>

        <button
          type="button"
          onClick={() => handleTabClick('categories')}
          className={tabClass(mainTab === 'categories' && activeView === 'none')}
        >
          <LayoutGrid className={`w-5 h-5 mb-0.5 ${mainTab === 'categories' && activeView === 'none' ? 'stroke-[2.5]' : ''}`} />
          <span className={`text-[10px] tracking-tight ${mainTab === 'categories' && activeView === 'none' ? 'font-black' : 'font-medium'}`}>
            Category
          </span>
        </button>

        <button
          type="button"
          onClick={() => handleTabClick('trends')}
          className={tabClass(mainTab === 'trends' && activeView === 'none')}
        >
          <Sparkles
            className={`w-5 h-5 mb-0.5 ${
              mainTab === 'trends' && activeView === 'none' ? 'fill-black/15 stroke-[2.5]' : ''
            }`}
          />
          <span className={`text-[10px] tracking-tight ${mainTab === 'trends' && activeView === 'none' ? 'font-black' : 'font-medium'}`}>
            Trends
          </span>
        </button>

        <button
          type="button"
          onClick={() => handleTabClick('messages')}
          className={tabClass(mainTab === 'messages' && activeView === 'none')}
        >
          <div className="relative">
            <MessageSquare
              className={`w-5 h-5 mb-0.5 ${
                mainTab === 'messages' && activeView === 'none' ? 'stroke-[2.5]' : ''
              }`}
            />
            {unreadMessagesCount > 0 && (
              <span className="absolute -top-1.5 -right-2.5 min-w-[14px] h-[14px] px-0.5 bg-[#FF3F6C] text-white text-[8px] font-black rounded-full flex items-center justify-center">
                {unreadMessagesCount}
              </span>
            )}
          </div>
          <span
            className={`text-[10px] tracking-tight ${
              mainTab === 'messages' && activeView === 'none' ? 'font-black' : 'font-medium'
            }`}
          >
            Chat
          </span>
        </button>

        <button
          type="button"
          onClick={() => handleTabClick('me')}
          className={tabClass(mainTab === 'me' && activeView === 'none')}
        >
          <User className={`w-5 h-5 mb-0.5 ${mainTab === 'me' && activeView === 'none' ? 'stroke-[2.5]' : ''}`} />
          <span className={`text-[10px] tracking-tight ${mainTab === 'me' && activeView === 'none' ? 'font-black' : 'font-medium'}`}>
            Me
          </span>
        </button>
      </div>
    </nav>
  );
};
