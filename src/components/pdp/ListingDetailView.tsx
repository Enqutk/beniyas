import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { ProductCard } from '../common/ProductCard';
import {
  ArrowLeft,
  Share2,
  Heart,
  MapPin,
  Star,
  ShieldCheck,
  ShieldAlert,
  ChevronRight,
  Phone,
  Ruler,
  Check,
  Truck,
  RotateCcw,
  ShoppingBag,
  Plus,
  Minus,
  Sparkles,
  Award,
  ThumbsUp,
  Maximize2,
  X
} from 'lucide-react';

const SIZES = ['XS', 'S', 'M', 'L', 'XL', '2XL'];
const COLORS = [
  { name: 'Black', hex: '#000000' },
  { name: 'Beige', hex: '#E8DCC4' },
  { name: 'White', hex: '#FFFFFF' },
  { name: 'Burgundy', hex: '#6B1D2F' }
];

export const ListingDetailView: React.FC = () => {
  const {
    selectedListingId,
    listings,
    setActiveView,
    toggleFavorite,
    isFavorite,
    openContactModal,
    openSellerProfile,
    addToCart
  } = useApp();

  const [activeImgIndex, setActiveImgIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState('M');
  const [selectedColor, setSelectedColor] = useState('Black');
  const [quantity, setQuantity] = useState(1);
  const [showSizeChart, setShowSizeChart] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [addedToBagToast, setAddedToBagToast] = useState(false);
  const [fullScreenImg, setFullScreenImg] = useState<string | null>(null);

  const listing = listings.find(l => l.id === selectedListingId) || listings[0];
  const saved = listing ? isFavorite(listing.id) : false;

  useEffect(() => {
    setActiveImgIndex(0);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [selectedListingId]);

  if (!listing) return null;

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleAddToBag = () => {
    addToCart(listing, selectedSize, selectedColor, quantity);
    setAddedToBagToast(true);
    setTimeout(() => setAddedToBagToast(false), 2500);
  };

  return (
    <div className="bg-white min-h-screen pb-28 md:pb-16 relative animate-in fade-in duration-200">
      {/* Toast Notification */}
      {addedToBagToast && (
        <div className="fixed top-16 left-1/2 -translate-x-1/2 z-50 bg-black text-white px-5 py-2.5 rounded-full shadow-2xl text-xs font-bold flex items-center gap-2 border border-gray-800">
          <Check className="w-4 h-4 text-emerald-400 stroke-[3]" />
          <span>Added to your bag! Size: {selectedSize}, Color: {selectedColor}</span>
        </div>
      )}

      {/* Breadcrumb Bar */}
      <div className="bg-gray-50 border-b border-gray-200 py-2.5 px-4 text-xs font-medium text-gray-500">
        <div className="max-w-7xl mx-auto flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-1.5 flex-wrap">
            <button
              onClick={() => setActiveView('plp')}
              className="text-gray-800 font-bold hover:underline flex items-center gap-1"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Back to results
            </button>
            <span>/</span>
            <span className="capitalize">{listing.categoryId}</span>
            <span>/</span>
            <span className="font-bold text-gray-900 truncate max-w-[200px] sm:max-w-xs">{listing.title}</span>
          </div>

          <div className="text-[11px] text-gray-400 font-mono">
            SKU: ML-{listing.id.toUpperCase()}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 pt-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-start">
          
          {/* LEFT: Image Gallery (7 Cols Desktop) */}
          <div className="lg:col-span-7 flex flex-col md:flex-row-reverse gap-3">
            {/* Main Stage Image */}
            <div
              onClick={() => setFullScreenImg(listing.images[activeImgIndex] || listing.images[0])}
              className="flex-1 bg-gray-100 rounded-xl overflow-hidden border border-gray-200 relative aspect-4/5 cursor-zoom-in group"
            >
              <img
                src={listing.images[activeImgIndex] || listing.images[0]}
                alt={listing.title}
                className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-300"
              />

              {/* Zoom Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setFullScreenImg(listing.images[activeImgIndex] || listing.images[0]);
                }}
                className="absolute bottom-3 left-3 bg-black/60 hover:bg-black text-white p-2 rounded-full backdrop-blur-xs transition-colors z-10"
                title="Zoom image"
              >
                <Maximize2 className="w-4 h-4" />
              </button>

              {/* Floating Badges */}
              <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
                {listing.discountPercentage && (
                  <span className="btn-primary text-xs font-black px-2 py-0.5 rounded-xs shadow-md">
                    -{listing.discountPercentage}% OFF
                  </span>
                )}
                {listing.isBoosted && (
                  <span className="bg-black text-white text-[10px] font-black px-2 py-0.5 rounded-xs uppercase tracking-wider">
                    HOT TREND
                  </span>
                )}
              </div>

              {/* Share & Heart Buttons */}
              <div className="absolute top-3 right-3 flex items-center gap-2 z-10">
                <button
                  onClick={handleShare}
                  className="w-9 h-9 rounded-full bg-white/90 backdrop-blur-md text-gray-800 flex items-center justify-center hover:bg-brand hover:text-white transition-colors shadow-sm"
                  title="Share"
                >
                  {copiedLink ? <Check className="w-4 h-4 text-emerald-600" /> : <Share2 className="w-4 h-4" />}
                </button>
                <button
                  onClick={() => toggleFavorite(listing.id)}
                  className="w-9 h-9 rounded-full bg-white/90 backdrop-blur-md text-gray-800 flex items-center justify-center hover:bg-brand hover:text-white transition-colors shadow-sm"
                  title="Favorite"
                >
                  <Heart className={`w-5 h-5 ${saved ? 'fill-red-600 text-red-600' : ''}`} />
                </button>
              </div>

              {/* Page Indicator */}
              <div className="absolute bottom-3 right-3 bg-black/70 text-white text-[11px] font-bold px-2.5 py-0.5 rounded-full">
                {activeImgIndex + 1} / {listing.images.length}
              </div>
            </div>

            {/* Thumbnail Column (Desktop Vertical, Mobile Horizontal) */}
            {listing.images.length > 1 && (
              <div className="flex md:flex-col gap-2 overflow-x-auto md:overflow-y-auto scrollbar-none shrink-0 md:w-20">
                {listing.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImgIndex(idx)}
                    className={`w-16 h-20 md:w-20 md:h-24 rounded-lg overflow-hidden border-2 transition-all shrink-0 ${
                      idx === activeImgIndex ? 'border-black ring-1 ring-black' : 'border-gray-200 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* RIGHT: Product Details & Buying Actions (5 Cols Desktop) */}
          <div className="lg:col-span-5 space-y-5">
            {/* Title & Reviews Header */}
            <div className="space-y-1.5 border-b border-gray-100 pb-3">
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <span className="font-bold text-black uppercase tracking-wider bg-gray-100 px-2 py-0.5 rounded-xs">
                  {listing.subcategory || listing.categoryId}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-gray-400" /> {listing.subcity}, Addis
                </span>
              </div>

              <h1 className="text-xl font-extrabold text-gray-900 leading-tight">
                {listing.title}
              </h1>

              {/* Rating & Orders */}
              <div className="flex items-center gap-3 text-xs pt-1">
                <div className="flex items-center text-amber-500 font-bold">
                  <Star className="w-3.5 h-3.5 fill-current mr-1" />
                  <span>{listing.sellerRating || '4.9'}</span>
                </div>
                <span className="text-gray-300">|</span>
                <span className="text-gray-500 font-semibold">{listing.viewsCount || 340}+ Sold / Views</span>
                <span className="text-gray-300">|</span>
                <span className="text-emerald-700 font-bold flex items-center gap-0.5">
                  <ShieldCheck className="w-3.5 h-3.5" /> In Stock
                </span>
              </div>
            </div>

            {/* Price Box */}
            <div className="bg-[#FFF8EE] border border-amber-200 p-3.5 rounded-xl space-y-1">
              <div className="flex items-baseline gap-2.5 flex-wrap">
                <span className="text-3xl font-black text-brand tracking-tight">
                  {listing.price.toLocaleString()} <span className="text-sm font-bold text-gray-600">ETB</span>
                </span>
                {listing.originalPrice && (
                  <span className="text-xs text-gray-400 line-through font-semibold">
                    {listing.originalPrice.toLocaleString()} ETB
                  </span>
                )}
                {listing.discountPercentage && (
                  <span className="bg-red-600 text-white text-[10px] font-extrabold px-1.5 py-0.5 rounded-xs uppercase">
                    Save {listing.discountPercentage}%
                  </span>
                )}
              </div>
              <p className="text-[11px] text-amber-900 font-medium">
                ⚡ Meetup with seller — or ask if they offer their own delivery
              </p>
            </div>

            {/* Color Selector */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-bold text-gray-900">
                <span>Color: <span className="font-normal text-gray-600">{selectedColor}</span></span>
              </div>
              <div className="flex items-center gap-2.5">
                {COLORS.map(c => (
                  <button
                    key={c.name}
                    onClick={() => setSelectedColor(c.name)}
                    className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-transform active:scale-95 ${
                      selectedColor === c.name ? 'border-black ring-2 ring-black/20 scale-110' : 'border-gray-300'
                    }`}
                    style={{ backgroundColor: c.hex }}
                    title={c.name}
                  >
                    {selectedColor === c.name && (
                      <Check className={`w-4 h-4 ${c.name === 'White' || c.name === 'Beige' ? 'text-black' : 'text-white'}`} />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Size Selector */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-bold text-gray-900">
                <span>Size: <span className="font-normal text-gray-600">{selectedSize}</span></span>
                <button
                  onClick={() => setShowSizeChart(true)}
                  className="text-brand hover:underline flex items-center gap-1 font-extrabold"
                >
                  <Ruler className="w-3.5 h-3.5" /> Size Guide
                </button>
              </div>

              <div className="grid grid-cols-6 gap-1.5">
                {SIZES.map(s => (
                  <button
                    key={s}
                    onClick={() => setSelectedSize(s)}
                    className={`py-2 text-xs font-black rounded-md border transition-all ${
                      selectedSize === s
                        ? 'btn-primary border-brand shadow-xs'
                        : 'bg-white text-gray-800 border-gray-300 hover:border-black'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity Selector */}
            <div className="flex items-center gap-4 pt-1">
              <span className="text-xs font-bold text-gray-900">Qty:</span>
              <div className="flex items-center border border-gray-300 rounded-md bg-white">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-2.5 py-1 text-gray-600 hover:bg-gray-100 font-bold"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="px-3 py-1 text-xs font-black text-gray-900">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-2.5 py-1 text-gray-600 hover:bg-gray-100 font-bold"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Action Buttons: Add to Bag & Direct Inquire */}
            <div className="space-y-2.5 pt-2">
              <button
                onClick={handleAddToBag}
                className="w-full py-3.5 px-4 btn-primary font-black text-sm rounded-lg shadow-md flex items-center justify-center gap-2 transition-transform active:scale-98 uppercase tracking-wider"
              >
                <ShoppingBag className="w-4 h-4 stroke-[2.5]" />
                Add To Bag
              </button>

              <div className="grid grid-cols-1 gap-2">
                <button
                  onClick={() => openContactModal(listing.sellerName, listing.sellerPhone, listing.sellerAvatar)}
                  className="py-3 px-3 btn-primary font-black text-xs rounded-lg flex items-center justify-center gap-1.5 transition-transform active:scale-95"
                >
                  <Phone className="w-4 h-4 text-emerald-400" />
                  Call Seller
                </button>
              </div>
            </div>

            {/* Handoff & safety */}
            <div className="bg-gray-50 border border-gray-200 rounded-xl p-3.5 space-y-2.5 text-xs">
              <div className="flex items-start gap-2.5">
                <Truck className="w-4 h-4 text-brand shrink-0 mt-0.5" />
                <div>
                  <p className="font-extrabold text-gray-900">Vendor handoff (not Baniyas delivery)</p>
                  <p className="text-[11px] text-gray-500">
                    Meet in Addis or use the seller’s own delivery if they offer it. Baniyas does not ship.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-2.5 border-t border-gray-200 pt-2">
                <RotateCcw className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <p className="font-extrabold text-gray-900">Inspect before you pay</p>
                  <p className="text-[11px] text-gray-500">Check the item with the vendor before completing payment.</p>
                </div>
              </div>
            </div>

            {/* Seller Info Box */}
            <div
              onClick={() => openSellerProfile(listing.sellerId)}
              className="p-3.5 bg-white rounded-xl border border-gray-200 flex items-center justify-between cursor-pointer hover:border-black transition-colors shadow-2xs"
            >
              <div className="flex items-center gap-3">
                <img
                  src={listing.sellerAvatar}
                  alt={listing.sellerName}
                  className="w-11 h-11 rounded-full object-cover border border-gray-300"
                />
                <div>
                  <div className="flex items-center gap-1">
                    <h4 className="font-extrabold text-xs text-gray-900">{listing.sellerName}</h4>
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                  </div>
                  <p className="text-[11px] text-gray-500">
                    Member since {listing.sellerMemberSince} • {listing.sellerActiveAdsCount} Ads
                  </p>
                </div>
              </div>

              <ChevronRight className="w-4 h-4 text-gray-400" />
            </div>

          </div>
        </div>

        {/* Product Description & Specifications Accordion Section */}
        <div className="mt-10 border-t border-gray-200 pt-6 space-y-6">
          <div className="bg-white rounded-xl border border-gray-200 p-5 space-y-4 shadow-2xs">
            <h3 className="text-sm font-black text-black uppercase tracking-wider font-serif border-b border-gray-100 pb-2">
              Description & Specifications
            </h3>
            <p className="text-xs text-gray-800 leading-relaxed whitespace-pre-line">
              {listing.description}
            </p>

            <div className="pt-2 grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-xs">
              {Object.entries(listing.attributes).map(([key, val]) => (
                <div key={key} className="bg-gray-50 p-2.5 rounded-lg border border-gray-200">
                  <span className="text-[10px] text-gray-400 font-bold uppercase block">{key}</span>
                  <span className="font-extrabold text-gray-900">{val}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Customer Reviews & Feedback */}
          {listing.reviews && listing.reviews.length > 0 && (
            <div className="bg-white rounded-xl border border-gray-200 p-5 space-y-4 shadow-2xs">
              <div className="flex items-center justify-between border-b border-gray-100 pb-2">
                <h3 className="text-sm font-black text-black uppercase tracking-wider font-serif">
                  Customer Reviews ({listing.reviews.length})
                </h3>
                <span className="text-xs font-black text-amber-500 flex items-center gap-1">
                  <Star className="w-4 h-4 fill-current" /> {listing.sellerRating} / 5.0
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {listing.reviews.map(rev => (
                  <div key={rev.id} className="p-3 bg-gray-50 rounded-lg space-y-1.5 border border-gray-200">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <img src={rev.userAvatar} alt="" className="w-6 h-6 rounded-full object-cover" />
                        <span className="text-xs font-bold text-gray-900">{rev.userName}</span>
                      </div>
                      <span className="text-[10px] text-gray-400">{rev.date}</span>
                    </div>

                    <div className="flex text-amber-400">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-3 h-3 fill-current ${
                            i < rev.rating ? 'text-amber-400' : 'text-gray-200'
                          }`}
                        />
                      ))}
                    </div>

                    <p className="text-xs text-gray-700 leading-snug">{rev.comment}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* You May Also Like Section */}
          <div className="space-y-3 pt-4">
            <h3 className="text-sm font-black uppercase tracking-wider text-black font-serif text-center">
              You May Also Like
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
              {listings.filter(l => l.id !== listing.id).slice(0, 5).map(l => (
                <ProductCard key={l.id} listing={l} />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Size Chart Modal */}
      {showSizeChart && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-gray-200 pb-3">
              <h3 className="text-sm font-black text-gray-900 uppercase tracking-wider flex items-center gap-2">
                <Ruler className="w-4 h-4 text-brand" /> Standard Size Guide
              </h3>
              <button
                onClick={() => setShowSizeChart(false)}
                className="text-gray-400 hover:text-black font-bold text-lg"
              >
                ✕
              </button>
            </div>

            <table className="w-full text-xs text-left text-gray-700">
              <thead className="bg-gray-100 font-bold text-gray-900">
                <tr>
                  <th className="p-2">Size</th>
                  <th className="p-2">Bust (cm)</th>
                  <th className="p-2">Waist (cm)</th>
                  <th className="p-2">Hip (cm)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                <tr><td className="p-2 font-bold">XS</td><td className="p-2">82-86</td><td className="p-2">62-66</td><td className="p-2">87-91</td></tr>
                <tr><td className="p-2 font-bold">S</td><td className="p-2">86-90</td><td className="p-2">66-70</td><td className="p-2">91-95</td></tr>
                <tr><td className="p-2 font-bold">M</td><td className="p-2">90-94</td><td className="p-2">70-74</td><td className="p-2">95-99</td></tr>
                <tr><td className="p-2 font-bold">L</td><td className="p-2">94-100</td><td className="p-2">74-80</td><td className="p-2">99-105</td></tr>
                <tr><td className="p-2 font-bold">XL</td><td className="p-2">100-106</td><td className="p-2">80-86</td><td className="p-2">105-111</td></tr>
              </tbody>
            </table>

            <button
              onClick={() => setShowSizeChart(false)}
              className="w-full py-2.5 btn-primary text-xs font-black rounded-lg uppercase tracking-wider"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Sticky Mobile Bottom Bar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-gray-200 p-2.5 flex items-center justify-between gap-2 shadow-2xl">
        <button
          onClick={() => toggleFavorite(listing.id)}
          className="p-2.5 rounded-full hover:bg-gray-100 text-gray-700 shrink-0"
        >
          <Heart className={`w-5 h-5 ${saved ? 'fill-red-600 text-red-600' : ''}`} />
        </button>

        <button
          onClick={handleAddToBag}
          className="flex-1 py-3 btn-primary font-black text-xs rounded-lg uppercase tracking-wider flex items-center justify-center gap-1.5"
        >
          <ShoppingBag className="w-4 h-4" /> Add To Bag
        </button>

        <button
          onClick={() => openContactModal(listing.sellerName, listing.sellerPhone, listing.sellerAvatar)}
          className="flex-1 py-3 btn-primary font-black text-xs rounded-lg flex items-center justify-center gap-1.5"
        >
          <Phone className="w-4 h-4" /> Call
        </button>
      </div>

      {/* High-Res Full Screen Lightbox Modal */}
      {fullScreenImg && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200">
          <button
            onClick={() => setFullScreenImg(null)}
            className="absolute top-4 right-4 text-white bg-white/20 hover:bg-white/30 p-2 rounded-full transition-colors z-50"
          >
            <X className="w-6 h-6" />
          </button>
          <img
            src={fullScreenImg}
            alt="Full size view"
            className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl"
          />
        </div>
      )}
    </div>
  );
};
