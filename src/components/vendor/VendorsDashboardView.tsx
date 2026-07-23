import React, { useMemo, useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Listing } from '../../types';
import {
  ArrowLeft,
  Search,
  ShieldCheck,
  Star,
  Store,
  Users,
  Package,
  BadgeCheck,
  ChevronRight,
  MapPin
} from 'lucide-react';

export interface VendorRow {
  id: string;
  name: string;
  avatar: string;
  phone: string;
  rating: number;
  reviewsCount: number;
  responseTime: string;
  memberSince: string;
  activeAds: number;
  verified: boolean;
  subcity: string;
  categories: string[];
}

function buildVendors(listings: Listing[]): VendorRow[] {
  const map = new Map<string, VendorRow & { _cats: Set<string> }>();

  listings.forEach(l => {
    const existing = map.get(l.sellerId);
    if (!existing) {
      map.set(l.sellerId, {
        id: l.sellerId,
        name: l.sellerName,
        avatar: l.sellerAvatar,
        phone: l.sellerPhone,
        rating: l.sellerRating,
        reviewsCount: l.sellerReviewsCount,
        responseTime: l.sellerResponseTime,
        memberSince: l.sellerMemberSince,
        activeAds: 1,
        verified: l.isVerifiedSeller,
        subcity: l.subcity,
        categories: [l.categoryId],
        _cats: new Set([l.categoryId])
      });
    } else {
      existing.activeAds += 1;
      existing._cats.add(l.categoryId);
      existing.categories = Array.from(existing._cats);
      if (l.isVerifiedSeller) existing.verified = true;
      if (l.sellerRating > existing.rating) existing.rating = l.sellerRating;
      existing.reviewsCount = Math.max(existing.reviewsCount, l.sellerReviewsCount);
    }
  });

  return Array.from(map.values())
    .map(({ _cats, ...v }) => v)
    .sort((a, b) => b.activeAds - a.activeAds || b.rating - a.rating);
}

export const VendorsDashboardView: React.FC = () => {
  const { listings, setActiveView, openSellerProfile, categories } = useApp();
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState<'all' | 'verified' | 'top'>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');

  const vendors = useMemo(() => buildVendors(listings), [listings]);

  const filtered = useMemo(() => {
    return vendors.filter(v => {
      if (filter === 'verified' && !v.verified) return false;
      if (filter === 'top' && v.rating < 4.7) return false;
      if (categoryFilter !== 'all' && !v.categories.includes(categoryFilter)) return false;
      if (query.trim()) {
        const q = query.toLowerCase();
        const hit =
          v.name.toLowerCase().includes(q) ||
          v.subcity.toLowerCase().includes(q) ||
          v.phone.includes(q);
        if (!hit) return false;
      }
      return true;
    });
  }, [vendors, filter, categoryFilter, query]);

  const stats = useMemo(
    () => ({
      total: vendors.length,
      verified: vendors.filter(v => v.verified).length,
      ads: listings.length,
      avgRating:
        vendors.length > 0
          ? (vendors.reduce((s, v) => s + v.rating, 0) / vendors.length).toFixed(1)
          : '0'
    }),
    [vendors, listings.length]
  );

  const catName = (id: string) => categories.find(c => c.id === id)?.name || id;

  return (
    <div className="bg-[#F5F5F5] min-h-screen pb-24">
      {/* Header */}
      <div className="sticky top-0 z-30 bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-3 md:px-6 py-3 flex items-center gap-3">
          <button
            type="button"
            onClick={() => setActiveView('none')}
            className="p-1.5 rounded-full hover:bg-gray-100 text-gray-800"
            aria-label="Back"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="flex-1 min-w-0">
            <h1 className="text-base md:text-lg font-black text-gray-900 flex items-center gap-2">
              <Store className="w-5 h-5 text-[#FF3F6C]" />
              Vendor Dashboard
            </h1>
            <p className="text-[11px] text-gray-500 font-semibold truncate">
              Browse verified sellers across Addis Ababa
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-3 md:px-6 py-4 space-y-4">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5">
          {[
            { label: 'Vendors', value: stats.total, icon: Users, tone: 'bg-black text-white' },
            { label: 'Verified', value: stats.verified, icon: BadgeCheck, tone: 'bg-emerald-50 text-emerald-800 border border-emerald-200' },
            { label: 'Active Ads', value: stats.ads, icon: Package, tone: 'bg-white text-gray-900 border border-gray-200' },
            { label: 'Avg Rating', value: stats.avgRating, icon: Star, tone: 'bg-amber-50 text-amber-900 border border-amber-200' }
          ].map(s => (
            <div key={s.label} className={`rounded-xl p-3 ${s.tone}`}>
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] font-bold uppercase tracking-wide opacity-70">{s.label}</span>
                <s.icon className="w-4 h-4 opacity-70" />
              </div>
              <p className="text-xl font-black">{s.value}</p>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="bg-white border border-gray-200 rounded-xl p-3 space-y-3">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Search vendors, area, phone..."
              className="w-full bg-gray-50 border border-gray-200 rounded-full py-2.5 pl-9 pr-3 text-xs font-medium focus:outline-none focus:border-black"
            />
          </div>

          <div className="flex gap-2 overflow-x-auto scrollbar-none">
            {(
              [
                ['all', 'All vendors'],
                ['verified', 'Verified only'],
                ['top', 'Top rated']
              ] as const
            ).map(([id, label]) => (
              <button
                key={id}
                type="button"
                onClick={() => setFilter(id)}
                className={`shrink-0 px-3 py-1.5 rounded-full text-[11px] font-bold border ${
                  filter === id
                    ? 'bg-black text-white border-black'
                    : 'bg-gray-50 text-gray-700 border-gray-200'
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          <div className="flex gap-2 overflow-x-auto scrollbar-none">
            <button
              type="button"
              onClick={() => setCategoryFilter('all')}
              className={`shrink-0 px-3 py-1.5 rounded-full text-[11px] font-bold border ${
                categoryFilter === 'all'
                  ? 'bg-[#FF3F6C] text-white border-[#FF3F6C]'
                  : 'bg-white text-gray-700 border-gray-200'
              }`}
            >
              All categories
            </button>
            {categories.map(c => (
              <button
                key={c.id}
                type="button"
                onClick={() => setCategoryFilter(c.id)}
                className={`shrink-0 px-3 py-1.5 rounded-full text-[11px] font-bold border ${
                  categoryFilter === c.id
                    ? 'bg-[#FF3F6C] text-white border-[#FF3F6C]'
                    : 'bg-white text-gray-700 border-gray-200'
                }`}
              >
                {c.name}
              </button>
            ))}
          </div>
        </div>

        <p className="text-[11px] font-bold text-gray-500 px-0.5">
          Showing {filtered.length} of {vendors.length} vendors
        </p>

        {/* Vendor list */}
        <div className="space-y-2.5">
          {filtered.map(v => (
            <button
              key={v.id}
              type="button"
              onClick={() => openSellerProfile(v.id)}
              className="w-full bg-white border border-gray-200 rounded-xl p-3.5 text-left hover:border-black hover:shadow-sm transition-all flex items-center gap-3"
            >
              <img
                src={v.avatar}
                alt=""
                className="w-14 h-14 rounded-full object-cover bg-gray-100 border border-gray-200 shrink-0"
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5 flex-wrap">
                  <h3 className="text-sm font-black text-gray-900 truncate">{v.name}</h3>
                  {v.verified && <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />}
                </div>
                <div className="flex items-center gap-2 text-[11px] text-gray-500 mt-0.5 flex-wrap">
                  <span className="flex items-center gap-0.5 text-amber-600 font-bold">
                    <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                    {v.rating.toFixed(1)}
                  </span>
                  <span>({v.reviewsCount} reviews)</span>
                  <span>•</span>
                  <span className="flex items-center gap-0.5">
                    <MapPin className="w-3 h-3" />
                    {v.subcity}
                  </span>
                </div>
                <div className="flex items-center gap-1.5 mt-1.5 flex-wrap">
                  <span className="text-[10px] font-bold bg-gray-100 text-gray-800 px-1.5 py-0.5 rounded">
                    {v.activeAds} ads
                  </span>
                  <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded">
                    Replies {v.responseTime}
                  </span>
                  {v.categories.slice(0, 2).map(c => (
                    <span
                      key={c}
                      className="text-[10px] font-semibold text-gray-600 bg-gray-50 border border-gray-100 px-1.5 py-0.5 rounded"
                    >
                      {catName(c)}
                    </span>
                  ))}
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-300 shrink-0" />
            </button>
          ))}

          {filtered.length === 0 && (
            <div className="bg-white rounded-xl border border-gray-200 p-10 text-center">
              <Store className="w-10 h-10 text-gray-300 mx-auto mb-2" />
              <p className="text-sm font-black text-gray-900">No vendors found</p>
              <p className="text-xs text-gray-500 mt-1">Try another search or clear filters</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
