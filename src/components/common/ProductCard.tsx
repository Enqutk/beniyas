import React from 'react';
import { Listing } from '../../types';
import { useApp } from '../../context/AppContext';
import { Heart, ShieldCheck, MapPin, ShoppingBag } from 'lucide-react';
import { SafeImage } from './SafeImage';

export const ProductCard: React.FC<{ listing: Listing }> = ({ listing }) => {
  const { openPDP, toggleFavorite, isFavorite, addToCart } = useApp();
  const saved = isFavorite(listing.id);
  const categoryLabel = listing.categoryId.toUpperCase();

  return (
    <div
      onClick={() => openPDP(listing.id)}
      className="bg-white rounded-lg overflow-hidden border border-gray-200 shadow-2xs hover:shadow-md transition-all cursor-pointer flex flex-col group relative"
    >
      <div className="relative aspect-4/5 bg-gray-100 overflow-hidden">
        <SafeImage
          src={listing.images[0]}
          alt={listing.title}
          fallbackSeed={listing.id}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />

        <span className="absolute top-2 left-2 bg-ink/80 text-paper text-[9px] font-black px-1.5 py-0.5 rounded-xs uppercase tracking-tight">
          {categoryLabel}
        </span>

        <button
          onClick={e => {
            e.stopPropagation();
            toggleFavorite(listing.id);
          }}
          className="absolute top-2 right-2 w-7 h-7 rounded-full bg-paper/90 backdrop-blur-xs flex items-center justify-center text-ink shadow-xs active:scale-90 transition-transform"
        >
          <Heart
            className={`w-4 h-4 transition-colors ${
              saved ? 'fill-red-600 text-red-600' : 'text-ink hover:text-brand'
            }`}
          />
        </button>

        {listing.discountPercentage && (
          <span className="absolute top-9 left-2 bg-red-600 text-white text-[10px] font-black px-1.5 py-0.5 rounded-xs uppercase tracking-tight shadow-2xs">
            -{listing.discountPercentage}%
          </span>
        )}

        {/* Vendor handoff — not platform shipping */}
        <div className="absolute bottom-0 inset-x-0 btn-primary text-[9px] font-black uppercase tracking-wide text-center py-1.5">
          Meetup · Vendor delivery
        </div>
      </div>

      <div className="p-2.5 flex flex-col flex-1 justify-between gap-1">
        <div>
          <h4 className="text-xs font-semibold text-ink leading-snug line-clamp-1 group-hover:text-brand transition-colors">
            {listing.title}
          </h4>
          <p className="text-[10px] text-gray-500 mt-0.5 truncate">{listing.sellerName}</p>
          <div className="flex items-center gap-1 text-[10px] text-gray-400 mt-0.5">
            <MapPin className="w-2.5 h-2.5 shrink-0" />
            <span className="truncate">{listing.subcity}, Addis</span>
            <span>•</span>
            <span className="shrink-0">{listing.datePosted}</span>
          </div>
        </div>

        <div className="mt-1 flex items-end justify-between">
          <div>
            <div className="flex items-baseline gap-1.5 flex-wrap">
              <span className="text-sm font-black text-brand tracking-tight">
                {listing.price.toLocaleString()}{' '}
                <span className="text-[10px] font-bold text-gray-500">ETB</span>
              </span>
              {listing.originalPrice && (
                <span className="text-[10px] text-gray-400 line-through">
                  {listing.originalPrice.toLocaleString()}
                </span>
              )}
            </div>
            <div className="flex items-center gap-1.5 mt-0.5 flex-wrap">
              {listing.isNegotiable && (
                <span className="text-[9px] font-bold text-ink bg-brand-soft px-1.5 py-0.2 rounded-xs border border-brand-muted">
                  Negotiable
                </span>
              )}
              {listing.isVerifiedSeller && (
                <span className="text-[9px] font-semibold text-ink bg-brand-muted px-1 rounded-xs flex items-center gap-0.5 border border-brand-ring">
                  <ShieldCheck className="w-2.5 h-2.5 text-brand" /> Verified
                </span>
              )}
            </div>
          </div>

          <button
            onClick={e => {
              e.stopPropagation();
              addToCart(
                listing,
                listing.availableSizes?.[0] || 'M',
                listing.availableColors?.[0] || listing.attributes?.Color || 'Black',
                1
              );
            }}
            className="w-7 h-7 rounded-full border border-gray-300 bg-paper hover:bg-brand hover:text-paper hover:border-brand flex items-center justify-center text-ink transition-colors shrink-0"
            title="Add to bag"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
