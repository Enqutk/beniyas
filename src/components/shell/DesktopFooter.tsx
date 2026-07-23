import React from 'react';
import { useApp } from '../../context/AppContext';
import { BaniyasLogo } from '../common/BaniyasLogo';
import { ShieldCheck, Smartphone, MapPin, Sparkles, Heart } from 'lucide-react';

export const DesktopFooter: React.FC = () => {
  const { openPLP, setActiveView, toggleLanguage, language } = useApp();

  return (
    <footer className="hidden md:block bg-zinc-950 text-gray-300 border-t border-zinc-800 pt-12 pb-8 mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-8 border-b border-zinc-800">
          {/* Col 1: Brand Info */}
          <div className="space-y-3">
            <BaniyasLogo variant="dark" size="md" />
            <p className="text-xs text-gray-400 leading-relaxed pt-1">
              Baniyas Store is your premier verified marketplace. Discover and shop trendy fashion, electronics, vehicles, property, and services with fast local delivery.
            </p>
            <div className="flex items-center gap-2 text-xs text-emerald-400 font-semibold pt-1">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              <span>Verified Seller Trust Standards</span>
            </div>
          </div>

          {/* Col 2: Popular Subcities */}
          <div className="space-y-3">
            <h4 className="font-extrabold text-sm text-white uppercase tracking-wider">
              Popular Subcities
            </h4>
            <ul className="space-y-2 text-xs text-gray-400">
              <li>
                <button onClick={() => openPLP('all', undefined, 'Bole')} className="hover:text-white transition-colors">
                  Bole Medhanialem & Atlas Ads
                </button>
              </li>
              <li>
                <button onClick={() => openPLP('all', undefined, 'Kazanchis')} className="hover:text-white transition-colors">
                  Kazanchis & UN Square Ads
                </button>
              </li>
              <li>
                <button onClick={() => openPLP('all', undefined, 'CMC')} className="hover:text-white transition-colors">
                  CMC & Summit Properties
                </button>
              </li>
              <li>
                <button onClick={() => openPLP('all', undefined, 'Piazza')} className="hover:text-white transition-colors">
                  Piazza & Lideta Marketplace
                </button>
              </li>
              <li>
                <button onClick={() => openPLP('all', undefined, 'Sarbet')} className="hover:text-white transition-colors">
                  Sarbet & Old Airport Cars
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Quick Category Shortcuts */}
          <div className="space-y-3">
            <h4 className="font-extrabold text-sm text-white uppercase tracking-wider">
              Popular Categories
            </h4>
            <ul className="space-y-2 text-xs text-gray-400">
              <li>
                <button onClick={() => openPLP('phones')} className="hover:text-white transition-colors">
                  Mobile Phones & Accessories
                </button>
              </li>
              <li>
                <button onClick={() => openPLP('vehicles')} className="hover:text-white transition-colors">
                  Vehicles & Cars in Addis
                </button>
              </li>
              <li>
                <button onClick={() => openPLP('electronics')} className="hover:text-white transition-colors">
                  Laptops & Electronics
                </button>
              </li>
              <li>
                <button onClick={() => openPLP('property')} className="hover:text-white transition-colors">
                  Apartments & Houses for Rent
                </button>
              </li>
              <li>
                <button onClick={() => openPLP('fashion')} className="hover:text-white transition-colors">
                  Habesha Clothing & Fashion
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Safety & Payment Support */}
          <div className="space-y-3">
            <h4 className="font-extrabold text-sm text-white uppercase tracking-wider">
              Safety & Local Payment
            </h4>
            <p className="text-xs text-gray-400 leading-relaxed">
              Always meet sellers in public places. Support local transfers via Telebirr or CBE Birr upon inspecting items in person.
            </p>
            <div className="p-3 bg-zinc-900 border border-zinc-800 rounded-xl space-y-1">
              <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider block">
                SAFETY RULE #1
              </span>
              <p className="text-[11px] text-gray-300">
                Do NOT send wire advances prior to physical inspection.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom copyright row */}
        <div className="flex flex-col sm:flex-row items-center justify-between text-xs text-gray-500 gap-4 pt-2">
          <div>
            © {new Date().getFullYear()} Baniyas Store. All rights reserved.
          </div>
          <div className="flex items-center gap-4">
            <button onClick={() => setActiveView('help')} className="hover:text-white transition-colors">
              Safety Rules
            </button>
            <span className="text-gray-400">
              Language: English
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
