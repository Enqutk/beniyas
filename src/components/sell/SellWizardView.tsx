import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { CategoryId } from '../../types';
import {
  ArrowLeft,
  Camera,
  Upload,
  Check,
  Plus,
  Trash2,
  Sparkles,
  MapPin,
  Tag,
  DollarSign,
  ShieldCheck,
  Flame
} from 'lucide-react';

const ADDIS_SUBCITIES = [
  'Bole',
  'Kazanchis',
  'Piazza',
  'CMC',
  'Lideta',
  'Summit',
  'Sarbet',
  'Old Airport',
  'Hawassa',
  'Adama'
];

export const SellWizardView: React.FC = () => {
  const { categories, addListing, setMainTab, setActiveView, language } = useApp();
  const [step, setStep] = useState(1);

  // Form state
  const [categoryId, setCategoryId] = useState<CategoryId>('phones');
  const [subcategory, setSubcategory] = useState('iPhone');
  const [images, setImages] = useState<string[]>([
    'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&auto=format&fit=crop&q=80'
  ]);
  const [title, setTitle] = useState('');
  const [amharicTitle, setAmharicTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState<number | ''>(25000);
  const [isNegotiable, setIsNegotiable] = useState(true);
  const [condition, setCondition] = useState<'Brand New' | 'Like New' | 'Used - Excellent' | 'Used - Good'>('Brand New');
  const [subcity, setSubcity] = useState('Bole');
  const [attributes, setAttributes] = useState<Record<string, string>>({
    Storage: '256 GB',
    Color: 'Black'
  });

  const selectedCat = categories.find(c => c.id === categoryId) || categories[0];

  const handleAddSampleImage = () => {
    const samplePool = [
      'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=800&auto=format&fit=crop&q=80'
    ];
    setImages(prev => [...prev, samplePool[prev.length % samplePool.length]]);
  };

  const handlePublish = () => {
    addListing({
      title: title || 'New Marketplace Item',
      amharicTitle,
      price: typeof price === 'number' ? price : 0,
      categoryId,
      subcategory,
      condition,
      subcity,
      isNegotiable,
      images,
      attributes,
      description
    });
    setStep(10); // Success screen
  };

  return (
    <div className="bg-white min-h-screen pb-20 flex flex-col">
      {/* Top Wizard Header & Progress Bar */}
      <div className="p-3 border-b border-gray-100 bg-white sticky top-0 z-20">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            {step > 1 && step < 10 && (
              <button
                onClick={() => setStep(s => s - 1)}
                className="p-1 rounded-full text-gray-600 hover:bg-gray-100"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
            )}
            <h2 className="text-sm font-black text-gray-900 uppercase tracking-tight">
              {step === 10 ? 'Ad Submitted!' : `Post Ad Step ${step} / 9`}
            </h2>
          </div>

          <button
            onClick={() => setMainTab('home')}
            className="text-xs font-bold text-gray-400 hover:text-gray-700"
          >
            Cancel
          </button>
        </div>

        {/* Progress Bar */}
        {step < 10 && (
          <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-brand transition-all duration-300"
              style={{ width: `${(step / 9) * 100}%` }}
            ></div>
          </div>
        )}
      </div>

      {/* Step Body */}
      <div className="p-4 flex-1 overflow-y-auto space-y-5">
        {/* Step 1: Category Tile Picker */}
        {step === 1 && (
          <div className="space-y-3">
            <h3 className="text-sm font-black uppercase text-gray-900 tracking-wider">
              Select Category
            </h3>
            <div className="grid grid-cols-2 gap-2.5">
              {categories.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => {
                    setCategoryId(cat.id);
                    setSubcategory(cat.subcategories[0]);
                    setStep(2);
                  }}
                  className={`p-3 rounded-xl border text-left flex items-center gap-3 transition-all ${
                    categoryId === cat.id
                      ? 'border-brand bg-brand-soft text-brand font-bold shadow-2xs'
                      : 'border-gray-200 hover:border-brand-muted text-gray-800'
                  }`}
                >
                  <img
                    src={cat.imageUrl}
                    alt=""
                    className="w-10 h-10 rounded-lg object-cover"
                  />
                  <div>
                    <span className="text-xs font-bold block">{cat.name}</span>
                    <span className="text-[10px] text-gray-400 font-normal">
                      {cat.count}+ ads
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 2: Subcategory Selection */}
        {step === 2 && (
          <div className="space-y-3">
            <h3 className="text-sm font-black uppercase text-gray-900 tracking-wider">
              Select Subcategory ({selectedCat.name})
            </h3>
            <div className="space-y-2">
              {selectedCat.subcategories.map((sub, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setSubcategory(sub);
                    setStep(3);
                  }}
                  className={`w-full p-3 rounded-xl border text-left font-bold text-xs flex items-center justify-between transition-all ${
                    subcategory === sub
                      ? 'border-brand bg-brand-soft text-brand'
                      : 'border-gray-200 text-gray-800 hover:bg-gray-50'
                  }`}
                >
                  <span>{sub}</span>
                  <Check className={`w-4 h-4 ${subcategory === sub ? 'block' : 'hidden'}`} />
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 3: Photo Uploader */}
        {step === 3 && (
          <div className="space-y-3">
            <h3 className="text-sm font-black uppercase text-gray-900 tracking-wider">
              Upload Photos
            </h3>
            <p className="text-xs text-gray-500">
              Add clear photos of your item. First photo will be the main cover.
            </p>

            <div className="grid grid-cols-3 gap-2 pt-2">
              {images.map((img, i) => (
                <div key={i} className="relative aspect-square rounded-xl overflow-hidden border border-gray-200">
                  <img src={img} alt="" className="w-full h-full object-cover" />
                  {i === 0 && (
                    <span className="absolute top-1 left-1 bg-brand text-white text-[9px] font-bold px-1 rounded-xs">
                      COVER
                    </span>
                  )}
                  <button
                    onClick={() => setImages(images.filter((_, idx) => idx !== i))}
                    className="absolute top-1 right-1 p-1 bg-black/60 text-white rounded-full"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                </div>
              ))}

              <button
                onClick={handleAddSampleImage}
                className="aspect-square rounded-xl border-2 border-dashed border-brand-ring bg-brand-soft/50 flex flex-col items-center justify-center text-brand font-bold text-xs gap-1 hover:bg-brand-muted/50 transition-colors"
              >
                <Camera className="w-5 h-5" />
                <span>+ Add Photo</span>
              </button>
            </div>

            <button
              onClick={() => setStep(4)}
              disabled={images.length === 0}
              className="w-full mt-4 py-3 bg-brand text-white font-bold text-xs rounded-xl shadow-md disabled:opacity-50"
            >
              Continue to Details
            </button>
          </div>
        )}

        {/* Step 4: Title & Description */}
        {step === 4 && (
          <div className="space-y-3">
            <h3 className="text-sm font-black uppercase text-gray-900 tracking-wider">
              Title & Description
            </h3>

            <div>
              <label className="text-xs font-bold text-gray-700 block mb-1">
                Ad Title *
              </label>
              <input
                type="text"
                value={title}
                onChange={e => setTitle(e.target.value)}
                placeholder="e.g. iPhone 15 Pro Max 256GB Titanium"
                className="w-full p-3 border border-gray-200 rounded-xl text-xs text-gray-900 focus:outline-none focus:border-brand"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-gray-700 block mb-1">
                Full Description *
              </label>
              <textarea
                rows={4}
                value={description}
                onChange={e => setDescription(e.target.value)}
                placeholder="Describe condition, warranty, accessories included..."
                className="w-full p-3 border border-gray-200 rounded-xl text-xs text-gray-900 focus:outline-none focus:border-brand"
              />
            </div>

            <button
              onClick={() => setStep(5)}
              disabled={!title.trim() || !description.trim()}
              className="w-full py-3 bg-brand text-white font-bold text-xs rounded-xl shadow-md disabled:opacity-50"
            >
              Next: Pricing
            </button>
          </div>
        )}

        {/* Step 5: Price & Negotiable */}
        {step === 5 && (
          <div className="space-y-3">
            <h3 className="text-sm font-black uppercase text-gray-900 tracking-wider">
              Set Price in Ethiopian Birr (ETB)
            </h3>

            <div>
              <label className="text-xs font-bold text-gray-700 block mb-1">
                Price (ETB) *
              </label>
              <input
                type="number"
                value={price}
                onChange={e => setPrice(Number(e.target.value))}
                className="w-full p-3 border border-gray-200 rounded-xl text-base font-bold text-gray-900 focus:outline-none focus:border-brand"
              />
            </div>

            <label className="flex items-center justify-between p-3 bg-gray-50 rounded-xl border border-gray-200 cursor-pointer">
              <span className="text-xs font-bold text-gray-800">
                Allow Price Negotiation
              </span>
              <input
                type="checkbox"
                checked={isNegotiable}
                onChange={e => setIsNegotiable(e.target.checked)}
                className="w-4 h-4 accent-brand"
              />
            </label>

            <button
              onClick={() => setStep(6)}
              className="w-full py-3 bg-brand text-white font-bold text-xs rounded-xl shadow-md"
            >
              Next: Item Condition
            </button>
          </div>
        )}

        {/* Step 6: Condition & Specs */}
        {step === 6 && (
          <div className="space-y-3">
            <h3 className="text-sm font-black uppercase text-gray-900 tracking-wider">
              Condition & Key Attributes
            </h3>

            <div className="grid grid-cols-2 gap-2">
              {['Brand New', 'Like New', 'Used - Excellent', 'Used - Good'].map(c => (
                <button
                  key={c}
                  onClick={() => setCondition(c as any)}
                  className={`p-3 rounded-xl border text-xs font-bold transition-all ${
                    condition === c
                      ? 'border-brand bg-brand-soft text-brand'
                      : 'border-gray-200 text-gray-700'
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>

            <button
              onClick={() => setStep(7)}
              className="w-full py-3 bg-brand text-white font-bold text-xs rounded-xl shadow-md"
            >
              Next: Location
            </button>
          </div>
        )}

        {/* Step 7: Location Picker */}
        {step === 7 && (
          <div className="space-y-3">
            <h3 className="text-sm font-black uppercase text-gray-900 tracking-wider">
              Select Location (Addis Subcity)
            </h3>

            <div className="grid grid-cols-2 gap-2">
              {ADDIS_SUBCITIES.map(sc => (
                <button
                  key={sc}
                  onClick={() => setSubcity(sc)}
                  className={`p-3 rounded-xl border text-xs font-bold flex items-center justify-between transition-all ${
                    subcity === sc
                      ? 'border-brand bg-brand-soft text-brand'
                      : 'border-gray-200 text-gray-700'
                  }`}
                >
                  <span>{sc}</span>
                  <MapPin className="w-3.5 h-3.5" />
                </button>
              ))}
            </div>

            <button
              onClick={() => setStep(8)}
              className="w-full py-3 bg-brand text-white font-bold text-xs rounded-xl shadow-md"
            >
              Next: Review
            </button>
          </div>
        )}

        {/* Step 8: Contact Prefs */}
        {step === 8 && (
          <div className="space-y-3">
            <h3 className="text-sm font-black uppercase text-gray-900 tracking-wider">
              Contact Preferences
            </h3>

            <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-xs text-emerald-900 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
              <span>
                Your phone number (+251 91 188 4422) and chat inbox will be enabled for this ad.
              </span>
            </div>

            <button
              onClick={() => setStep(9)}
              className="w-full py-3 bg-brand text-white font-bold text-xs rounded-xl shadow-md"
            >
              Preview Ad
            </button>
          </div>
        )}

        {/* Step 9: Live PDP Preview */}
        {step === 9 && (
          <div className="space-y-3">
            <h3 className="text-sm font-black uppercase text-gray-900 tracking-wider flex items-center gap-1">
              <Sparkles className="w-4 h-4 text-brand" />
              Listing PDP Preview
            </h3>

            <div className="border border-gray-200 rounded-xl overflow-hidden p-3 bg-gray-50 space-y-2">
              <img src={images[0]} alt="" className="w-full h-40 object-cover rounded-lg" />
              <h4 className="font-bold text-sm text-gray-900">{title}</h4>
              <div className="text-lg font-black text-brand">
                {price?.toLocaleString()} ETB
              </div>
              <p className="text-xs text-gray-600">{description}</p>
              <div className="text-[11px] text-gray-400 font-semibold">
                Location: {subcity}, Addis Ababa • {condition}
              </div>
            </div>

            <button
              onClick={handlePublish}
              className="w-full py-3 bg-brand hover:bg-brand-hover text-white font-black text-sm rounded-xl shadow-lg transition-all"
            >
              Publish Free Ad Now
            </button>
          </div>
        )}

        {/* Step 10: Success + Boost Paywall */}
        {step === 10 && (
          <div className="text-center py-8 space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-md">
              <Check className="w-8 h-8 stroke-[3]" />
            </div>

            <h3 className="text-lg font-black text-gray-900">
              Your Ad is Live on Baniyas Store!
            </h3>
            <p className="text-xs text-gray-500 max-w-xs mx-auto">
              Buyers in Bole, Kazanchis, and across Addis can now see and chat with you.
            </p>

            {/* Optional Boost Card */}
            <div className="p-4 bg-gradient-to-r from-brand to-brand-hover text-white rounded-2xl text-left space-y-2 shadow-lg">
              <span className="bg-white/20 text-white text-[9px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider">
                BOOST AD VISIBILITY
              </span>
              <h4 className="font-black text-sm">Get 10x More Views with Telebirr</h4>
              <p className="text-xs text-white/80">
                Top Ad placement on Baniyas Store home carousel for 3 days.
              </p>
              <button
                onClick={() => setActiveView('boost')}
                className="w-full py-2 bg-white text-brand font-extrabold text-xs rounded-xl shadow-md"
              >
                Boost Ad (250 ETB)
              </button>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => setActiveView('vendors')}
                className="py-3 bg-black text-white font-bold text-xs rounded-xl"
              >
                Vendor Dashboard
              </button>
              <button
                onClick={() => setMainTab('home')}
                className="py-3 bg-gray-100 text-gray-800 font-bold text-xs rounded-xl"
              >
                Return Home
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
