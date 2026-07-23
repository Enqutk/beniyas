import React from 'react';
import { useApp } from '../../context/AppContext';
import { ArrowLeft, ShieldAlert, CheckCircle2, MapPin, DollarSign, Phone } from 'lucide-react';

export const SafetyHelpView: React.FC = () => {
  const { setActiveView } = useApp();

  return (
    <div className="bg-white min-h-screen pb-20">
      {/* Header */}
      <div className="p-3 border-b border-gray-100 flex items-center gap-2 sticky top-0 bg-white z-10">
        <button
          onClick={() => setActiveView('none')}
          className="p-1 rounded-full text-gray-600 hover:bg-gray-100"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h2 className="text-base font-black text-gray-900 tracking-tight flex items-center gap-1.5">
          <ShieldAlert className="w-5 h-5 text-amber-500" />
          Safety & Buying Rules in Addis Ababa
        </h2>
      </div>

      <div className="p-4 space-y-5 text-xs text-gray-700 leading-relaxed">
        <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 space-y-1">
          <h3 className="font-bold text-amber-950 text-sm">#1 Rule: No Advance Payments</h3>
          <p className="text-amber-900">
            Never send money via Telebirr or bank transfer to hold an item before inspecting it in person.
          </p>
        </div>

        <div className="space-y-2">
          <h3 className="font-black text-sm uppercase text-gray-900">Safe Meeting Locations in Addis</h3>
          <ul className="space-y-1.5">
            <li className="flex items-center gap-2 bg-gray-50 p-2 rounded-lg border border-gray-100">
              <MapPin className="w-4 h-4 text-[#FF3F6C]" />
              <span>Bole Medhanialem & Atlas Commercial Centers</span>
            </li>
            <li className="flex items-center gap-2 bg-gray-50 p-2 rounded-lg border border-gray-100">
              <MapPin className="w-4 h-4 text-[#FF3F6C]" />
              <span>Kazanchis International Bank Area</span>
            </li>
            <li className="flex items-center gap-2 bg-gray-50 p-2 rounded-lg border border-gray-100">
              <MapPin className="w-4 h-4 text-[#FF3F6C]" />
              <span>Piazza & Mexico Public Square</span>
            </li>
          </ul>
        </div>

        <div className="space-y-2">
          <h3 className="font-black text-sm uppercase text-gray-900">How to Spot Fake Ads</h3>
          <p>
            If a price is dramatically below market rate (e.g. iPhone 15 Pro for 20,000 ETB), or the seller insists on sending a deposit first, report the user immediately via chat.
          </p>
        </div>
      </div>
    </div>
  );
};
