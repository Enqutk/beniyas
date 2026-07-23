import React from 'react';
import { useApp } from '../../context/AppContext';
import { ProductCard } from '../common/ProductCard';
import { ArrowLeft, ShieldCheck, Star, Phone, MapPin, Calendar, Clock } from 'lucide-react';

export const SellerProfileView: React.FC = () => {
  const {
    selectedSellerId,
    listings,
    setActiveView,
    openContactModal,
    language
  } = useApp();

  const sellerListings = listings.filter(
    l => l.sellerId === selectedSellerId || selectedSellerId === 'seller_1'
  );

  const firstListing = sellerListings[0] || listings[0];

  return (
    <div className="bg-gray-50 min-h-screen pb-20 animate-in fade-in duration-200">
      {/* Top Banner & Header */}
      <div className="relative bg-slate-900 h-32 text-white p-3">
        <button
          onClick={() => setActiveView('none')}
          className="w-8 h-8 rounded-full bg-black/40 text-white flex items-center justify-center relative z-10"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>

        <div className="absolute -bottom-8 left-4 flex items-end gap-3 z-10">
          <img
            src={firstListing.sellerAvatar}
            alt={firstListing.sellerName}
            className="w-16 h-16 rounded-full object-cover border-4 border-white shadow-md bg-white"
          />
        </div>
      </div>

      {/* Seller Details Card */}
      <div className="bg-white pt-10 p-4 space-y-3 border-b border-gray-100 shadow-2xs">
        <div>
          <div className="flex items-center gap-1.5">
            <h2 className="font-extrabold text-base text-gray-900">{firstListing.sellerName}</h2>
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
          </div>

          <div className="flex items-center gap-2 text-xs text-gray-500 mt-1">
            <span className="flex items-center gap-1 text-amber-500 font-bold">
              <Star className="w-3.5 h-3.5 fill-current" /> {firstListing.sellerRating}
            </span>
            <span>({firstListing.sellerReviewsCount} reviews)</span>
            <span>•</span>
            <span className="text-emerald-600 font-semibold">
              Responds {firstListing.sellerResponseTime}
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-1 gap-2 pt-1">
          <button
            onClick={() =>
              openContactModal(
                firstListing.sellerName,
                firstListing.sellerPhone,
                firstListing.sellerAvatar
              )
            }
            className="py-2.5 btn-primary font-bold text-xs rounded-xl flex items-center justify-center gap-1.5"
          >
            <Phone className="w-3.5 h-3.5 text-emerald-400" /> Call Seller
          </button>
        </div>
      </div>

      {/* Active Listings Grid */}
      <div className="p-3">
        <h3 className="text-xs font-black uppercase tracking-wider text-gray-900 mb-2">
          Active Ads by {firstListing.sellerName} ({sellerListings.length})
        </h3>

        <div className="grid grid-cols-2 gap-2.5">
          {sellerListings.map(listing => (
            <ProductCard key={listing.id} listing={listing} />
          ))}
        </div>
      </div>
    </div>
  );
};
