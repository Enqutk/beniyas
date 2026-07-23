import React, { useMemo, useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  ArrowLeft,
  Plus,
  Eye,
  MessageCircle,
  Flame,
  Trash2,
  MoreHorizontal,
  Package,
  ChevronRight
} from 'lucide-react';

export const VendorsDashboardView: React.FC = () => {
  const {
    user,
    listings,
    chatThreads,
    isLoggedIn,
    setActiveView,
    setMainTab,
    openPDP,
    removeListing,
    toggleBoostListing
  } = useApp();

  const [menuFor, setMenuFor] = useState<string | null>(null);

  const myListings = useMemo(() => {
    const owned = listings.filter(l => l.sellerId === user.id);
    if (owned.length > 0) return owned;
    return listings.filter(l => ['l1', 'l3', 'l4', 'l7', 'l14'].includes(l.id)).slice(0, 5);
  }, [listings, user.id]);

  const views = myListings.reduce((s, l) => s + l.viewsCount, 0);
  const chats = Math.max(
    chatThreads.filter(t => myListings.some(l => l.id === t.listingId)).length,
    myListings.length
  );

  const goPost = () => {
    setActiveView('none');
    setMainTab('sell');
  };

  const goChats = () => {
    setActiveView('none');
    setMainTab('messages');
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-white flex flex-col pb-24">
        <div className="px-4 pt-4 pb-2 flex items-center gap-3">
          <button
            type="button"
            onClick={() => setActiveView('none')}
            className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center"
            aria-label="Back"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 flex flex-col items-center justify-center px-8 text-center -mt-8">
          <div className="w-20 h-20 rounded-3xl bg-[#FF3F6C]/10 flex items-center justify-center mb-5">
            <Package className="w-9 h-9 text-[#FF3F6C]" />
          </div>
          <h1 className="text-2xl font-black text-gray-900 tracking-tight">Sell on Baniyas</h1>
          <p className="text-sm text-gray-500 mt-2 max-w-xs leading-relaxed">
            Sign in once, then post products and talk to buyers from one simple place.
          </p>
          <button
            type="button"
            onClick={() => setActiveView('auth')}
            className="mt-8 w-full max-w-xs h-12 rounded-2xl bg-black text-white text-sm font-black"
          >
            Sign in to start selling
          </button>
          <button
            type="button"
            onClick={() => setActiveView('none')}
            className="mt-3 text-sm font-bold text-gray-400"
          >
            Not now
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAFAFA] pb-28">
      {/* Header — calm & clear */}
      <header className="bg-white border-b border-gray-100 sticky top-0 z-20">
        <div className="max-w-2xl mx-auto px-4 py-3 flex items-center gap-3">
          <button
            type="button"
            onClick={() => setActiveView('none')}
            className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center shrink-0"
            aria-label="Back"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>

          <div className="flex-1 min-w-0">
            <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wide">Your store</p>
            <h1 className="text-base font-black text-gray-900 truncate">{user.name}</h1>
          </div>

          <img
            src={user.avatar}
            alt=""
            className="w-10 h-10 rounded-full object-cover border border-gray-200 shrink-0"
          />
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 pt-5 space-y-5">
        {/* One big action */}
        <button
          type="button"
          onClick={goPost}
          className="w-full h-14 rounded-2xl bg-[#FF3F6C] text-white flex items-center justify-center gap-2 text-base font-black shadow-sm active:scale-[0.99] transition-transform"
        >
          <Plus className="w-6 h-6 stroke-[3]" />
          Add a product
        </button>

        {/* 3 simple numbers */}
        <div className="grid grid-cols-3 gap-2">
          {[
            { label: 'Products', value: myListings.length, onClick: undefined as (() => void) | undefined },
            { label: 'Views', value: views > 999 ? `${(views / 1000).toFixed(1)}k` : views, onClick: undefined },
            { label: 'Chats', value: chats, onClick: goChats }
          ].map(stat => (
            <button
              key={stat.label}
              type="button"
              onClick={stat.onClick}
              disabled={!stat.onClick}
              className={`bg-white rounded-2xl border border-gray-100 p-3 text-center ${
                stat.onClick ? 'active:bg-gray-50' : ''
              }`}
            >
              <p className="text-xl font-black text-gray-900 tabular-nums">{stat.value}</p>
              <p className="text-[11px] font-bold text-gray-400 mt-0.5">{stat.label}</p>
            </button>
          ))}
        </div>

        {/* Quick links — only 2 */}
        <div className="grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={goChats}
            className="bg-white border border-gray-100 rounded-2xl p-4 flex items-center gap-3 text-left active:bg-gray-50"
          >
            <span className="w-11 h-11 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center shrink-0">
              <MessageCircle className="w-5 h-5" />
            </span>
            <span>
              <span className="block text-sm font-black text-gray-900">Messages</span>
              <span className="block text-[11px] font-medium text-gray-400">Talk to buyers</span>
            </span>
          </button>
          <button
            type="button"
            onClick={() => setActiveView('boost')}
            className="bg-white border border-gray-100 rounded-2xl p-4 flex items-center gap-3 text-left active:bg-gray-50"
          >
            <span className="w-11 h-11 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
              <Flame className="w-5 h-5" />
            </span>
            <span>
              <span className="block text-sm font-black text-gray-900">Boost</span>
              <span className="block text-[11px] font-medium text-gray-400">Get more views</span>
            </span>
          </button>
        </div>

        {/* Products list */}
        <section>
          <div className="flex items-center justify-between mb-3 px-0.5">
            <h2 className="text-sm font-black text-gray-900">Your products</h2>
            <span className="text-[11px] font-bold text-gray-400">{myListings.length} listed</span>
          </div>

          {myListings.length === 0 ? (
            <div className="bg-white border border-dashed border-gray-200 rounded-3xl px-6 py-12 text-center">
              <div className="w-14 h-14 rounded-2xl bg-gray-50 flex items-center justify-center mx-auto mb-4">
                <Package className="w-7 h-7 text-gray-300" />
              </div>
              <p className="text-base font-black text-gray-900">Nothing here yet</p>
              <p className="text-sm text-gray-500 mt-1 mb-5">Add your first product — it takes a minute.</p>
              <button
                type="button"
                onClick={goPost}
                className="inline-flex items-center gap-1.5 h-11 px-5 rounded-xl bg-black text-white text-sm font-black"
              >
                <Plus className="w-4 h-4" />
                Add product
              </button>
            </div>
          ) : (
            <ul className="space-y-2.5">
              {myListings.map(ad => {
                const open = menuFor === ad.id;
                return (
                  <li
                    key={ad.id}
                    className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-[0_1px_2px_rgba(0,0,0,0.03)]"
                  >
                    <button
                      type="button"
                      onClick={() => openPDP(ad.id)}
                      className="w-full p-3 flex items-center gap-3 text-left active:bg-gray-50"
                    >
                      <img
                        src={ad.images[0]}
                        alt=""
                        className="w-16 h-16 rounded-xl object-cover bg-gray-100 shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-bold text-gray-900 line-clamp-1">{ad.title}</p>
                        <p className="text-base font-black text-[#FF3F6C] mt-0.5 tabular-nums">
                          {ad.price.toLocaleString()} ETB
                        </p>
                        <p className="text-[11px] font-medium text-gray-400 mt-1 flex items-center gap-2">
                          <span className="inline-flex items-center gap-0.5">
                            <Eye className="w-3 h-3" /> {ad.viewsCount}
                          </span>
                          <span className="text-emerald-600 font-bold">● Live</span>
                          {ad.isBoosted && (
                            <span className="text-amber-600 font-bold">Boosted</span>
                          )}
                        </p>
                      </div>
                      <ChevronRight className="w-5 h-5 text-gray-300 shrink-0" />
                    </button>

                    <div className="px-3 pb-3 flex gap-2">
                      <button
                        type="button"
                        onClick={() => openPDP(ad.id)}
                        className="flex-1 h-10 rounded-xl bg-gray-100 text-xs font-black text-gray-800"
                      >
                        View
                      </button>
                      <button
                        type="button"
                        onClick={() => toggleBoostListing(ad.id)}
                        className={`flex-1 h-10 rounded-xl text-xs font-black flex items-center justify-center gap-1 ${
                          ad.isBoosted
                            ? 'bg-amber-100 text-amber-800'
                            : 'bg-[#FF3F6C]/10 text-[#FF3F6C]'
                        }`}
                      >
                        <Flame className="w-3.5 h-3.5" />
                        {ad.isBoosted ? 'Boosted' : 'Boost'}
                      </button>
                      <button
                        type="button"
                        onClick={() => setMenuFor(open ? null : ad.id)}
                        className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center text-gray-600"
                        aria-label="More"
                      >
                        <MoreHorizontal className="w-5 h-5" />
                      </button>
                    </div>

                    {open && (
                      <div className="px-3 pb-3">
                        <button
                          type="button"
                          onClick={() => {
                            setMenuFor(null);
                            if (window.confirm('Remove this product?')) removeListing(ad.id);
                          }}
                          className="w-full h-10 rounded-xl bg-red-50 text-red-600 text-xs font-black flex items-center justify-center gap-1.5"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          Remove product
                        </button>
                      </div>
                    )}
                  </li>
                );
              })}
            </ul>
          )}
        </section>

        <p className="text-center text-[11px] text-gray-400 font-medium pb-4">
          Tip: clear photos help you sell faster
        </p>
      </main>

      {/* Sticky bottom add — always reachable */}
      <div className="fixed bottom-16 inset-x-0 z-30 px-4 pointer-events-none md:bottom-6">
        <div className="max-w-2xl mx-auto pointer-events-auto">
          <button
            type="button"
            onClick={goPost}
            className="w-full h-12 rounded-2xl bg-black text-white text-sm font-black flex items-center justify-center gap-2 shadow-lg"
          >
            <Plus className="w-5 h-5 stroke-[3]" />
            Add a product
          </button>
        </div>
      </div>
    </div>
  );
};
