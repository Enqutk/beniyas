import React from 'react';
import { useApp } from '../../context/AppContext';
import { ProductCard } from '../common/ProductCard';
import { Heart, ArrowLeft, Trash2, Sparkles } from 'lucide-react';

export const SavedView: React.FC = () => {
  const { user, listings, setActiveView, toggleFavorite, setMainTab, language } = useApp();

  const savedListings = listings.filter(l => user.savedListingIds.includes(l.id));

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
          <h2 className="text-base font-black text-gray-900 tracking-tight flex items-center gap-2">
            <Heart className="w-5 h-5 text-brand fill-current" />
            Saved Wishlist
          </h2>
        </div>
        <span className="text-xs font-bold text-gray-400">
          {savedListings.length} saved
        </span>
      </div>

      {/* Grid */}
      <div className="p-3">
        {savedListings.length > 0 ? (
          <div className="grid grid-cols-2 gap-2.5">
            {savedListings.map(listing => (
              <ProductCard key={listing.id} listing={listing} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 px-4">
            <Heart className="w-12 h-12 text-brand/40 mx-auto mb-2" />
            <h3 className="text-sm font-bold text-gray-800">No saved items yet</h3>
            <p className="text-xs text-gray-400 mt-1">
              Tap the heart icon on any ad to save it here for quick access.
            </p>
            <button
              onClick={() => {
                setActiveView('none');
                setMainTab('home');
              }}
              className="mt-4 px-4 py-2 bg-brand text-white font-bold text-xs rounded-full shadow-md"
            >
              Browse Marketplace
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
