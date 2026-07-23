import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ArrowLeft, Flame, Check, ShieldCheck, Smartphone, Building2 } from 'lucide-react';

export const BoostPaywallModal: React.FC = () => {
  const { setActiveView } = useApp();
  const [selectedPlan, setSelectedPlan] = useState<'top' | 'vip' | 'diamond'>('vip');
  const [paymentMethod, setPaymentMethod] = useState<'telebirr' | 'cbe'>('telebirr');
  const [paid, setPaid] = useState(false);

  const plans = [
    { id: 'top', name: 'TOP AD', duration: '3 Days', price: 250, badge: 'Standard Boost' },
    { id: 'vip', name: 'VIP HIGHLIGHT', duration: '7 Days', price: 500, badge: 'Most Popular 10x Views' },
    { id: 'diamond', name: 'DIAMOND BANNER', duration: '15 Days', price: 1200, badge: 'Home Banner Featured' }
  ];

  return (
    <div className="fixed inset-0 z-50 bg-white flex flex-col max-w-md mx-auto animate-in fade-in duration-200 overflow-y-auto">
      {/* Header */}
      <div className="p-3 border-b border-gray-100 flex items-center justify-between sticky top-0 bg-white z-10">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveView('none')}
            className="p-1 rounded-full text-gray-600 hover:bg-gray-100"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h2 className="text-base font-black text-gray-900 tracking-tight flex items-center gap-1.5">
            <Flame className="w-5 h-5 text-brand fill-current" />
            Baniyas Ad Boost
          </h2>
        </div>
      </div>

      <div className="p-4 space-y-5 flex-1">
        {!paid ? (
          <>
            <div className="text-center py-2 space-y-1">
              <span className="bg-brand-muted text-brand text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase">
                Addis Ababa Marketplace Visibility
              </span>
              <h3 className="text-lg font-black text-gray-900">Choose Boost Package</h3>
              <p className="text-xs text-gray-500">
                Boosted ads stay at the top of search results in Bole, Kazanchis, and all subcities.
              </p>
            </div>

            {/* Plan Cards */}
            <div className="space-y-3">
              {plans.map(p => (
                <div
                  key={p.id}
                  onClick={() => setSelectedPlan(p.id as any)}
                  className={`p-4 rounded-2xl border-2 transition-all cursor-pointer relative ${
                    selectedPlan === p.id
                      ? 'border-brand bg-brand-soft/50 shadow-md'
                      : 'border-gray-200 bg-white hover:border-brand-muted'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-[10px] font-black text-brand uppercase tracking-wider block">
                        {p.badge}
                      </span>
                      <h4 className="font-extrabold text-sm text-gray-900">{p.name}</h4>
                      <span className="text-xs text-gray-500 font-medium">{p.duration} duration</span>
                    </div>

                    <div className="text-right">
                      <span className="text-lg font-black text-gray-900 block">
                        {p.price} <span className="text-xs">ETB</span>
                      </span>
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ml-auto ${
                        selectedPlan === p.id ? 'border-brand bg-brand' : 'border-gray-300'
                      }`}>
                        {selectedPlan === p.id && <Check className="w-3 h-3 text-white" />}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Payment Method */}
            <div className="space-y-2 pt-2">
              <label className="text-xs font-black uppercase text-gray-500 block">
                Select Payment Method (Ethiopia)
              </label>

              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => setPaymentMethod('telebirr')}
                  className={`p-3 rounded-xl border text-xs font-bold flex items-center justify-center gap-2 ${
                    paymentMethod === 'telebirr'
                      ? 'border-emerald-500 bg-emerald-50 text-emerald-900'
                      : 'border-gray-200 bg-gray-50 text-gray-700'
                  }`}
                >
                  <Smartphone className="w-4 h-4 text-emerald-600" /> Telebirr
                </button>
                <button
                  onClick={() => setPaymentMethod('cbe')}
                  className={`p-3 rounded-xl border text-xs font-bold flex items-center justify-center gap-2 ${
                    paymentMethod === 'cbe'
                      ? 'border-purple-500 bg-purple-50 text-purple-900'
                      : 'border-gray-200 bg-gray-50 text-gray-700'
                  }`}
                >
                  <Building2 className="w-4 h-4 text-purple-600" /> CBE Birr / Chapa
                </button>
              </div>
            </div>

            <button
              onClick={() => setPaid(true)}
              className="w-full py-3.5 btn-primary font-black text-sm rounded-xl shadow-lg transition-all"
            >
              Pay via {paymentMethod === 'telebirr' ? 'Telebirr' : 'CBE Birr'}
            </button>
          </>
        ) : (
          <div className="text-center py-12 space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
              <ShieldCheck className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-black text-gray-900">Payment Successful!</h3>
            <p className="text-xs text-gray-500">
              Your ad has been boosted and placed at the top of Baniyas Store search results.
            </p>
            <button
              onClick={() => setActiveView('none')}
              className="px-6 py-3 btn-primary font-bold text-xs rounded-xl shadow-md"
            >
              Done
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
