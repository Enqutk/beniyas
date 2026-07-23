import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ArrowLeft, Eye, Edit, Flame, Trash2, CheckCircle2 } from 'lucide-react';

export const MyAdsView: React.FC = () => {
  const { user, listings, setActiveView, openPDP, language } = useApp();
  const [tab, setTab] = useState<'active' | 'sold'>('active');

  const myAds = listings.filter(l => l.sellerId === user.id || l.id === 'l1' || l.id === 'l4');

  return (
    <div className="bg-white min-h-screen pb-20">
      {/* Header */}
      <div className="p-3 border-b border-gray-100 flex items-center justify-between sticky top-0 bg-white z-10">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveView('none')}
            className="p-1 rounded-full text-gray-600 hover:bg-gray-100"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h2 className="text-base font-black text-gray-900 tracking-tight">
            My Ads Manager
          </h2>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-200 bg-gray-50">
        <button
          onClick={() => setTab('active')}
          className={`flex-1 py-3 text-xs font-bold text-center border-b-2 transition-all ${
            tab === 'active'
              ? 'border-[#FF3F6C] text-[#FF3F6C] bg-white'
              : 'border-transparent text-gray-500'
          }`}
        >
          Active ({myAds.length})
        </button>
        <button
          onClick={() => setTab('sold')}
          className={`flex-1 py-3 text-xs font-bold text-center border-b-2 transition-all ${
            tab === 'sold'
              ? 'border-[#FF3F6C] text-[#FF3F6C] bg-white'
              : 'border-transparent text-gray-500'
          }`}
        >
          Sold ({user.soldAdsCount})
        </button>
      </div>

      {/* Ad List */}
      <div className="p-3 space-y-3">
        {myAds.map(ad => (
          <div key={ad.id} className="p-3 rounded-xl border border-gray-200 bg-white space-y-2.5 shadow-2xs">
            <div className="flex items-center gap-3">
              <img src={ad.images[0]} alt="" className="w-16 h-16 rounded-lg object-cover" />
              <div className="flex-1 min-w-0">
                <h4 className="font-bold text-xs text-gray-900 truncate">{ad.title}</h4>
                <div className="text-sm font-black text-[#FF3F6C] mt-0.5">
                  {ad.price.toLocaleString()} ETB
                </div>
                <div className="flex items-center gap-2 text-[10px] text-gray-400 mt-1">
                  <span className="flex items-center gap-0.5"><Eye className="w-3 h-3" /> {ad.viewsCount} views</span>
                </div>
              </div>
            </div>

            {/* Actions Bar */}
            <div className="flex items-center gap-2 pt-2 border-t border-gray-100">
              <button
                onClick={() => openPDP(ad.id)}
                className="flex-1 py-1.5 bg-gray-100 font-bold text-xs text-gray-800 rounded-lg"
              >
                View PDP
              </button>
              <button
                onClick={() => setActiveView('boost')}
                className="flex-1 py-1.5 bg-pink-50 font-bold text-xs text-[#FF3F6C] rounded-lg border border-pink-200 flex items-center justify-center gap-1"
              >
                <Flame className="w-3.5 h-3.5" /> Boost
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
