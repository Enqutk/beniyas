import React from 'react';
import { Listing } from '../../types';
import { useApp } from '../../context/AppContext';
import { Heart, ShieldCheck, MapPin, ShoppingBag } from 'lucide-react';

export const ProductCard: React.FC<{ listing: Listing }> = ({ listing }) => {
  const { openPDP, toggleFavorite, isFavorite, setActiveView } = useApp();
  const saved = isFavorite(listing.id);

  return (
    <div
      onClick={() => openPDP(listing.id)}
      className="bg-white rounded-lg overflow-hidden border border-gray-200 shadow-2xs hover:shadow-md transition-all cursor-pointer flex flex-col group relative"
    >
      {/* Product Image Container (SHEIN 4:5 aspect) */}
      <div className="relative aspect-4/5 bg-gray-100 overflow-hidden">
        <img
          src={listing.images[0]}
          alt={listing.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />

        {/* Top-Right Favorite Heart */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleFavorite(listing.id);
          }}
          className="absolute top-2 right-2 w-7 h-7 rounded-full bg-white/90 backdrop-blur-xs flex items-center justify-center text-gray-800 shadow-xs active:scale-90 transition-transform"
        >
          <Heart
            className={`w-4 h-4 transition-colors ${
              saved ? 'fill-red-600 text-red-600' : 'text-gray-700 hover:text-black'
            }`}
          />
        </button>

        {/* Discount Badge (SHEIN Red Tag) */}
        {listing.discountPercentage && (
          <span className="absolute top-2 left-2 bg-red-600 text-white text-[10px] font-black px-1.5 py-0.5 rounded-xs uppercase tracking-tight shadow-2xs">
            -{listing.discountPercentage}%
          </span>
        )}

        {/* Boosted Tag */}
        {listing.isBoosted && (
          <span className="absolute bottom-2 left-2 bg-black text-white text-[9px] font-bold px-1.5 py-0.5 rounded-xs uppercase tracking-wider flex items-center gap-0.5 shadow-2xs">
            TOP AD
          </span>
        )}
      </div>

      {/* Card Info (SHEIN Dense Layout) */}
      <div className="p-2.5 flex flex-col flex-1 justify-between gap-1">
        <div>
          {/* Title */}
          <h4 className="text-xs font-semibold text-gray-900 leading-snug line-clamp-1 group-hover:text-red-600 transition-colors">
            {listing.title}
          </h4>

          {/* Subcity & Time */}
          <div className="flex items-center gap-1 text-[10px] text-gray-400 mt-0.5">
            <MapPin className="w-2.5 h-2.5 shrink-0 text-gray-400" />
            <span className="truncate">{listing.subcity}, Addis</span>
            <span>•</span>
            <span className="shrink-0">{listing.datePosted}</span>
          </div>
        </div>

        {/* Price & Add to Cart Row */}
        <div className="mt-1 flex items-end justify-between">
          <div>
            <div className="flex items-baseline gap-1.5 flex-wrap">
              <span className="text-sm font-black text-[#FF3F6C] tracking-tight">
                {listing.price.toLocaleString()} <span className="text-[10px] font-bold text-gray-500">ETB</span>
              </span>

              {listing.originalPrice && (
                <span className="text-[10px] text-gray-400 line-through">
                  {listing.originalPrice.toLocaleString()}
                </span>
              )}
            </div>

            {/* Badges: Negotiable / Verified */}
            <div className="flex items-center gap-1.5 mt-0.5 flex-wrap">
              {listing.isNegotiable && (
                <span className="text-[9px] font-bold text-gray-800 bg-gray-100 px-1.5 py-0.2 rounded-xs border border-gray-200">
                  Negotiable
                </span>
              )}
              {listing.isVerifiedSeller && (
                <span className="text-[9px] font-semibold text-emerald-800 bg-emerald-50 px-1 rounded-xs flex items-center gap-0.5 border border-emerald-100">
                  <ShieldCheck className="w-2.5 h-2.5 text-emerald-600" /> Verified
                </span>
              )}
            </div>
          </div>

          {/* Cart Icon Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setActiveView('chat');
            }}
            className="w-7 h-7 rounded-full border border-gray-300 bg-white hover:bg-black hover:text-white hover:border-black flex items-center justify-center text-gray-700 transition-colors shrink-0"
            title="Inquire / Purchase"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
