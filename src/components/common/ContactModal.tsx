import React from 'react';
import { useApp } from '../../context/AppContext';
import { Phone, ShieldAlert, X, Copy, Check } from 'lucide-react';

export const ContactModal: React.FC = () => {
  const { showContactModal, contactModalSeller, closeContactModal, language } = useApp();
  const [copied, setCopied] = React.useState(false);

  if (!showContactModal || !contactModalSeller) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(contactModalSeller.phone);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-xs p-0 sm:p-4 animate-in fade-in duration-200">
      <div className="w-full max-w-sm bg-white rounded-t-2xl sm:rounded-2xl overflow-hidden shadow-2xl transition-all border border-gray-200">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-100 bg-gray-50/80">
          <div className="flex items-center gap-3">
            <img
              src={contactModalSeller.avatar}
              alt={contactModalSeller.name}
              className="w-10 h-10 rounded-full object-cover border border-gray-200"
            />
            <div>
              <h3 className="font-extrabold text-gray-900 text-sm">{contactModalSeller.name}</h3>
              <span className="text-xs text-emerald-600 font-medium flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                Verified Seller • Responds &lt; 10 mins
              </span>
            </div>
          </div>
          <button
            onClick={closeContactModal}
            className="p-1.5 rounded-full text-gray-400 hover:bg-gray-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 space-y-4">
          <div className="text-center py-3 bg-gray-50 rounded-xl border border-gray-200">
            <span className="text-xs uppercase tracking-wider text-gray-500 font-bold block mb-1">
              Seller Phone Number
            </span>
            <div className="text-2xl font-black text-gray-900 tracking-tight font-mono select-all">
              {contactModalSeller.phone}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <a
              href={`tel:${contactModalSeller.phone}`}
              className="flex items-center justify-center gap-2 py-3 px-4 btn-primary font-extrabold text-sm rounded-xl shadow-md transition-all active:scale-[0.98]"
            >
              <Phone className="w-4 h-4" />
              Call Now
            </a>
            <button
              onClick={handleCopy}
              className="flex items-center justify-center gap-2 py-3 px-4 bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold text-sm rounded-xl border border-gray-200 transition-all active:scale-[0.98]"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4 text-gray-600" />}
              {copied ? 'Copied!' : 'Copy Phone'}
            </button>
          </div>

          {/* Safety Tip Box */}
          <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-amber-950 text-xs leading-relaxed flex items-start gap-2.5">
            <ShieldAlert className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold block text-amber-950 mb-0.5">
                Safety First
              </span>
              Never send advance wire payments! Always meet the seller in person in public places like Bole or Kazanchis before paying.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

