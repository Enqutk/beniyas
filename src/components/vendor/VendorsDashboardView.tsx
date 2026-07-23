import React, { useMemo, useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  ArrowLeft,
  Plus,
  Package,
  Eye,
  TrendingUp,
  Flame,
  Trash2,
  ExternalLink,
  ShieldCheck,
  Store,
  BarChart3,
  Clock,
  Wallet,
  Settings,
  Search,
  Sparkles,
  Heart,
  Share2,
  Check
} from 'lucide-react';

type DashTab = 'overview' | 'listings' | 'insights';

export const VendorsDashboardView: React.FC = () => {
  const {
    user,
    listings,
    isLoggedIn,
    setActiveView,
    setMainTab,
    openPDP,
    openSellerProfile,
    removeListing,
    toggleBoostListing
  } = useApp();

  const [tab, setTab] = useState<DashTab>('overview');
  const [query, setQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'boosted'>('all');
  const [linkCopied, setLinkCopied] = useState(false);

  const shareVendorLink = async () => {
    const link = `${window.location.origin}/?view=vendors`;
    try {
      await navigator.clipboard.writeText(link);
      setLinkCopied(true);
      setTimeout(() => setLinkCopied(false), 2000);
    } catch {
      window.prompt('Copy this vendor dashboard link:', link);
    }
  };

  // Vendor's own products (plus a few seed demos so the dashboard never looks empty)
  const myListings = useMemo(() => {
    const owned = listings.filter(l => l.sellerId === user.id);
    if (owned.length > 0) return owned;
    return listings.filter(l => ['l1', 'l3', 'l4', 'l7', 'l14'].includes(l.id)).slice(0, 5);
  }, [listings, user.id]);

  const filteredListings = useMemo(() => {
    return myListings.filter(l => {
      if (statusFilter === 'boosted' && !l.isBoosted) return false;
      if (query.trim()) {
        const q = query.toLowerCase();
        if (
          !l.title.toLowerCase().includes(q) &&
          !l.subcategory.toLowerCase().includes(q) &&
          !l.categoryId.toLowerCase().includes(q)
        ) {
          return false;
        }
      }
      return true;
    });
  }, [myListings, statusFilter, query]);

  const stats = useMemo(() => {
    const views = myListings.reduce((s, l) => s + l.viewsCount, 0);
    const saves = myListings.filter(l => user.savedListingIds.includes(l.id)).length;
    const boosted = myListings.filter(l => l.isBoosted).length;
    const inventoryValue = myListings.reduce((s, l) => s + l.price, 0);
    return {
      ads: myListings.length,
      views,
      saves: Math.max(saves, Math.round(myListings.length * 1.5)),
      boosted,
      inventoryValue,
      avgPrice: myListings.length ? Math.round(inventoryValue / myListings.length) : 0
    };
  }, [myListings, user.savedListingIds]);

  const goPostProduct = () => {
    setActiveView('none');
    setMainTab('sell');
  };

  if (!isLoggedIn) {
    return (
      <div className="bg-[#F4F4F5] min-h-screen pb-24">
        <div className="bg-zinc-950 text-white px-4 py-4 flex items-center gap-3">
          <button
            type="button"
            onClick={() => setActiveView('none')}
            className="p-1.5 rounded-full hover:bg-white/10"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-base font-black">Vendor Dashboard</h1>
            <p className="text-[11px] text-zinc-400">Sell professionally on Baniyas</p>
          </div>
        </div>

        <div className="max-w-lg mx-auto px-4 py-16 text-center space-y-4">
          <div className="w-16 h-16 mx-auto rounded-2xl bg-black text-white flex items-center justify-center">
            <Store className="w-8 h-8" />
          </div>
          <h2 className="text-xl font-black text-gray-900">Open your seller console</h2>
          <p className="text-sm text-gray-500 max-w-sm mx-auto">
            Sign in to post products, track views & saves, boost ads, and manage your store like a pro.
          </p>
          <button
            type="button"
            onClick={() => setActiveView('auth')}
            className="w-full max-w-xs mx-auto py-3 bg-brand text-white font-black text-sm rounded-xl"
          >
            Sign in to continue
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#F4F4F5] min-h-screen pb-28">
      {/* Top bar */}
      <div className="bg-zinc-950 text-white">
        <div className="max-w-6xl mx-auto px-3 md:px-6 py-4">
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-start gap-3 min-w-0">
              <button
                type="button"
                onClick={() => setActiveView('none')}
                className="p-1.5 rounded-full hover:bg-white/10 shrink-0 mt-0.5"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <div className="min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <h1 className="text-lg font-black tracking-tight">Vendor Dashboard</h1>
                  <span className="text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-2 py-0.5 rounded-full flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3" /> Verified seller
                  </span>
                </div>
                <p className="text-xs text-zinc-400 mt-0.5 truncate">
                  {user.name} · Store ID {user.id}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={shareVendorLink}
                className="inline-flex items-center gap-1.5 bg-white/10 hover:bg-white/15 text-white text-xs font-black px-3 py-2.5 rounded-xl border border-white/20"
              >
                {linkCopied ? <Check className="w-4 h-4 text-emerald-300" /> : <Share2 className="w-4 h-4" />}
                {linkCopied ? 'Copied!' : 'Share'}
              </button>
              <button
                type="button"
                onClick={goPostProduct}
                className="inline-flex items-center gap-1.5 bg-brand hover:bg-brand-hover text-white text-xs font-black px-3.5 py-2.5 rounded-xl shadow-md"
              >
                <Plus className="w-4 h-4 stroke-[3]" />
                Post product
              </button>
            </div>
          </div>

          {/* Store strip */}
          <div className="mt-4 flex items-center gap-3 bg-white/5 border border-white/10 rounded-2xl p-3">
            <img
              src={user.avatar}
              alt=""
              className="w-12 h-12 rounded-xl object-cover border border-white/20"
            />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-black truncate">{user.name} Store</p>
              <p className="text-[11px] text-zinc-400">
                Member since {user.memberSince} · {stats.ads} live products
              </p>
            </div>
            <button
              type="button"
              onClick={() => openSellerProfile(user.id)}
              className="text-[11px] font-bold text-zinc-200 border border-white/20 px-2.5 py-1.5 rounded-lg hover:bg-white/10"
            >
              Public page
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-3 md:px-6 py-4 space-y-4">
        {/* KPI cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5">
          {[
            { label: 'Active ads', value: stats.ads, icon: Package, hint: 'Live on storefront' },
            { label: 'Total views', value: stats.views.toLocaleString(), icon: Eye, hint: 'Last 30 days' },
            { label: 'Buyer saves', value: stats.saves, icon: Heart, hint: 'Wishlisted items' },
            {
              label: 'Inventory value',
              value: `${(stats.inventoryValue / 1000).toFixed(0)}k ETB`,
              icon: Wallet,
              hint: 'Listed stock'
            }
          ].map(card => (
            <div
              key={card.label}
              className="bg-white border border-gray-200 rounded-2xl p-3.5 shadow-sm"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-gray-500">
                  {card.label}
                </span>
                <card.icon className="w-4 h-4 text-gray-400" />
              </div>
              <p className="text-xl font-black text-gray-900">{card.value}</p>
              <p className="text-[10px] text-gray-400 font-medium mt-0.5">{card.hint}</p>
            </div>
          ))}
        </div>

        {/* Quick actions */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {[
            {
              label: 'Post new product',
              desc: 'Create a listing',
              icon: Plus,
              onClick: goPostProduct,
              tone: 'bg-brand text-white'
            },
            {
              label: 'My ads',
              desc: 'Manage listings',
              icon: Package,
              onClick: () => setActiveView('myAds'),
              tone: 'bg-white text-gray-900 border border-gray-200'
            },
            {
              label: 'Boost ads',
              desc: `${stats.boosted} boosted`,
              icon: Flame,
              onClick: () => setActiveView('boost'),
              tone: 'bg-brand-soft text-brand border border-brand-muted'
            },
            {
              label: 'Store settings',
              desc: 'Profile & trust',
              icon: Settings,
              onClick: () => setActiveView('auth'),
              tone: 'bg-white text-gray-900 border border-gray-200'
            }
          ].map(a => (
            <button
              key={a.label}
              type="button"
              onClick={a.onClick}
              className={`rounded-2xl p-3 text-left ${a.tone} hover:opacity-95 transition-opacity`}
            >
              <a.icon className="w-5 h-5 mb-2" />
              <p className="text-xs font-black leading-tight">{a.label}</p>
              <p className="text-[10px] opacity-70 mt-0.5">{a.desc}</p>
            </button>
          ))}
        </div>

        {/* Tabs */}
        <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
          <div className="flex border-b border-gray-100">
            {(
              [
                ['overview', 'Overview', BarChart3],
                ['listings', 'My products', Package],
                ['insights', 'Insights', TrendingUp]
              ] as const
            ).map(([id, label, Icon]) => (
              <button
                key={id}
                type="button"
                onClick={() => setTab(id)}
                className={`flex-1 py-3 text-xs font-black flex items-center justify-center gap-1.5 border-b-2 ${
                  tab === id
                    ? 'border-black text-black bg-white'
                    : 'border-transparent text-gray-400 hover:text-gray-700'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                {label}
              </button>
            ))}
          </div>

          <div className="p-3 md:p-4">
            {tab === 'overview' && (
              <div className="space-y-4">
                <div className="grid md:grid-cols-2 gap-3">
                  <div className="rounded-xl bg-gradient-to-br from-zinc-900 to-zinc-800 text-white p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Sparkles className="w-4 h-4 text-amber-300" />
                      <h3 className="text-xs font-black uppercase tracking-wider">Growth tip</h3>
                    </div>
                    <p className="text-sm font-semibold leading-relaxed text-zinc-200">
                      Listings with 3+ clear photos and a negotiable price get up to{' '}
                      <span className="text-white">2.4× more views</span> in Bole & Kazanchis.
                    </p>
                    <button
                      type="button"
                      onClick={goPostProduct}
                      className="mt-3 text-[11px] font-black bg-white text-black px-3 py-1.5 rounded-lg"
                    >
                      Post another product
                    </button>
                  </div>

                  <div className="rounded-xl border border-gray-200 p-4 bg-gray-50 space-y-3">
                    <h3 className="text-xs font-black uppercase tracking-wider text-gray-500">
                      Store health
                    </h3>
                    {[
                      { label: 'Profile completeness', value: 86 },
                      { label: 'Response speed', value: 92 },
                      { label: 'Listing quality', value: 78 }
                    ].map(row => (
                      <div key={row.label}>
                        <div className="flex justify-between text-[11px] font-bold mb-1">
                          <span className="text-gray-600">{row.label}</span>
                          <span className="text-gray-900">{row.value}%</span>
                        </div>
                        <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-black rounded-full"
                            style={{ width: `${row.value}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-sm font-black text-gray-900">Recent products</h3>
                    <button
                      type="button"
                      onClick={() => setTab('listings')}
                      className="text-[11px] font-bold text-brand"
                    >
                      Manage all
                    </button>
                  </div>
                  <div className="space-y-2">
                    {myListings.slice(0, 3).map(ad => (
                      <div
                        key={ad.id}
                        className="flex items-center gap-3 p-2.5 rounded-xl border border-gray-200 bg-white"
                      >
                        <img
                          src={ad.images[0]}
                          alt=""
                          className="w-12 h-12 rounded-lg object-cover bg-gray-100"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-bold text-gray-900 truncate">{ad.title}</p>
                          <p className="text-[11px] text-brand font-black">
                            {ad.price.toLocaleString()} ETB
                          </p>
                        </div>
                        <span className="text-[10px] font-bold text-gray-500 flex items-center gap-0.5">
                          <Eye className="w-3 h-3" /> {ad.viewsCount}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {tab === 'listings' && (
              <div className="space-y-3">
                <div className="flex flex-col sm:flex-row gap-2">
                  <div className="relative flex-1">
                    <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      value={query}
                      onChange={e => setQuery(e.target.value)}
                      placeholder="Search your products..."
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl py-2.5 pl-9 pr-3 text-xs font-medium focus:outline-none focus:border-black"
                    />
                  </div>
                  <div className="flex gap-1.5">
                    {(
                      [
                        ['all', 'All'],
                        ['active', 'Active'],
                        ['boosted', 'Boosted']
                      ] as const
                    ).map(([id, label]) => (
                      <button
                        key={id}
                        type="button"
                        onClick={() => setStatusFilter(id)}
                        className={`px-3 py-2 rounded-xl text-[11px] font-black border ${
                          statusFilter === id
                            ? 'bg-brand text-white border-brand'
                            : 'bg-white text-gray-600 border-gray-200'
                        }`}
                      >
                        {label}
                      </button>
                    ))}
                  </div>
                </div>

                {filteredListings.length === 0 ? (
                  <div className="text-center py-12 space-y-3">
                    <Package className="w-10 h-10 text-gray-300 mx-auto" />
                    <p className="text-sm font-black text-gray-900">No products yet</p>
                    <p className="text-xs text-gray-500">Post your first item to start selling</p>
                    <button
                      type="button"
                      onClick={goPostProduct}
                      className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-brand text-white text-xs font-black rounded-xl"
                    >
                      <Plus className="w-4 h-4" /> Post product
                    </button>
                  </div>
                ) : (
                  <div className="space-y-2.5">
                    {filteredListings.map(ad => (
                      <div
                        key={ad.id}
                        className="border border-gray-200 rounded-2xl p-3 bg-white space-y-2.5"
                      >
                        <div className="flex gap-3">
                          <img
                            src={ad.images[0]}
                            alt=""
                            className="w-16 h-16 md:w-20 md:h-20 rounded-xl object-cover bg-gray-100 shrink-0"
                          />
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-2">
                              <h4 className="text-xs md:text-sm font-black text-gray-900 line-clamp-2">
                                {ad.title}
                              </h4>
                              {ad.isBoosted && (
                                <span className="shrink-0 text-[9px] font-black uppercase bg-black text-white px-1.5 py-0.5 rounded flex items-center gap-0.5">
                                  <Flame className="w-3 h-3" /> Boosted
                                </span>
                              )}
                            </div>
                            <p className="text-sm font-black text-brand mt-0.5">
                              {ad.price.toLocaleString()} ETB
                            </p>
                            <div className="flex items-center gap-2 text-[10px] text-gray-500 mt-1 flex-wrap">
                              <span className="font-semibold bg-gray-100 px-1.5 py-0.5 rounded">
                                {ad.categoryId}
                              </span>
                              <span className="flex items-center gap-0.5">
                                <Eye className="w-3 h-3" /> {ad.viewsCount}
                              </span>
                              <span className="flex items-center gap-0.5">
                                <Clock className="w-3 h-3" /> {ad.datePosted}
                              </span>
                              <span className="text-emerald-600 font-bold">Active</span>
                            </div>
                          </div>
                        </div>

                        <div className="grid grid-cols-4 gap-1.5 pt-2 border-t border-gray-100">
                          <button
                            type="button"
                            onClick={() => openPDP(ad.id)}
                            className="py-2 rounded-lg bg-gray-100 text-[10px] font-black text-gray-800 flex items-center justify-center gap-1"
                          >
                            <ExternalLink className="w-3 h-3" /> View
                          </button>
                          <button
                            type="button"
                            onClick={() => toggleBoostListing(ad.id)}
                            className="py-2 rounded-lg bg-brand-soft text-[10px] font-black text-brand border border-brand-muted flex items-center justify-center gap-1"
                          >
                            <Flame className="w-3 h-3" />
                            {ad.isBoosted ? 'Unboost' : 'Boost'}
                          </button>
                          <button
                            type="button"
                            onClick={() => setActiveView('boost')}
                            className="py-2 rounded-lg bg-amber-50 text-[10px] font-black text-amber-800 border border-amber-100"
                          >
                            Promote
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              if (confirm('Remove this product from your store?')) {
                                removeListing(ad.id);
                              }
                            }}
                            className="py-2 rounded-lg bg-red-50 text-[10px] font-black text-red-600 border border-red-100 flex items-center justify-center gap-1"
                          >
                            <Trash2 className="w-3 h-3" /> Delete
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {tab === 'insights' && (
              <div className="space-y-4">
                <div className="grid sm:grid-cols-3 gap-2.5">
                  {[
                    { label: 'Avg listing price', value: `${stats.avgPrice.toLocaleString()} ETB` },
                    { label: 'Boosted ads', value: String(stats.boosted) },
                    { label: 'Est. reach', value: `${(stats.views * 1.8).toFixed(0)}` }
                  ].map(i => (
                    <div key={i.label} className="rounded-xl border border-gray-200 p-3 bg-gray-50">
                      <p className="text-[10px] font-bold uppercase text-gray-500">{i.label}</p>
                      <p className="text-lg font-black text-gray-900 mt-1">{i.value}</p>
                    </div>
                  ))}
                </div>

                <div className="rounded-xl border border-gray-200 p-4">
                  <h3 className="text-xs font-black uppercase tracking-wider text-gray-500 mb-3">
                    Top performing products
                  </h3>
                  <div className="space-y-2">
                    {[...myListings]
                      .sort((a, b) => b.viewsCount - a.viewsCount)
                      .slice(0, 5)
                      .map((ad, idx) => (
                        <div key={ad.id} className="flex items-center gap-3">
                          <span className="w-6 h-6 rounded-full bg-black text-white text-[10px] font-black flex items-center justify-center">
                            {idx + 1}
                          </span>
                          <p className="flex-1 text-xs font-bold text-gray-800 truncate">{ad.title}</p>
                          <span className="text-[11px] font-black text-gray-500">
                            {ad.viewsCount} views
                          </span>
                        </div>
                      ))}
                  </div>
                </div>

                <div className="rounded-xl bg-[#FFF8EE] border border-amber-200 p-4 flex items-start gap-3">
                  <TrendingUp className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs font-black text-gray-900">Pro tip</p>
                    <p className="text-[11px] text-gray-600 mt-0.5 leading-relaxed">
                      Boost your top 2 products for 7 days to appear higher in category feeds and Trends
                      rails around Addis.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile sticky post CTA */}
      <div className="md:hidden fixed bottom-16 inset-x-0 z-30 px-3 pointer-events-none">
        <button
          type="button"
          onClick={goPostProduct}
          className="pointer-events-auto w-full max-w-md mx-auto flex items-center justify-center gap-2 py-3.5 bg-brand text-white font-black text-sm rounded-2xl shadow-xl"
        >
          <Plus className="w-5 h-5 stroke-[3]" />
          Post a new product
        </button>
      </div>
    </div>
  );
};
