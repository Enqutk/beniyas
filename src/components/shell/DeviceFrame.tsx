import React from 'react';
import { useApp } from '../../context/AppContext';
import { Signal, Wifi, Battery } from 'lucide-react';

export const DeviceFrame: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isPhoneFrame } = useApp();

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 flex flex-col items-center justify-start antialiased selection:bg-black selection:text-white">
      {/* Main Container */}
      <div
        className={`w-full transition-all duration-300 ${
          isPhoneFrame
            ? 'max-w-[400px] my-0 md:my-4 rounded-none md:rounded-[44px] shadow-2xl border-0 md:border-[10px] md:border-slate-800 bg-white overflow-hidden relative min-h-screen md:min-h-[850px] md:max-h-[880px] flex flex-col'
            : 'w-full min-h-screen bg-gray-50 relative flex flex-col'
        }`}
      >
        {/* Simulated Phone Top Status Bar (Only visible when phone frame mode is explicitly toggled) */}
        {isPhoneFrame && (
          <div className="hidden md:flex items-center justify-between px-6 py-2 bg-white text-gray-900 text-[11px] font-semibold shrink-0 select-none border-b border-gray-100">
            <span>9:41</span>
            <div className="w-20 h-4 bg-gray-900 rounded-full mx-auto -mt-1 flex items-center justify-center">
              <div className="w-3 h-3 rounded-full bg-slate-900 border border-slate-700"></div>
            </div>
            <div className="flex items-center gap-1.5 text-gray-700">
              <Signal className="w-3 h-3 fill-current" />
              <Wifi className="w-3 h-3" />
              <Battery className="w-3.5 h-3.5" />
            </div>
          </div>
        )}

        {/* App Content Container */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden relative flex flex-col bg-gray-50 pb-16 md:pb-0">
          {children}
        </div>

        {/* Simulated Home Indicator Bar for phone frame */}
        {isPhoneFrame && (
          <div className="hidden md:block w-32 h-1 bg-gray-300 rounded-full mx-auto my-1 shrink-0"></div>
        )}
      </div>
    </div>
  );
};

