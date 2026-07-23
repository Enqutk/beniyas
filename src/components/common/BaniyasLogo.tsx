import React from 'react';

interface BaniyasLogoProps {
  variant?: 'light' | 'dark'; // 'dark' = dark bg (white text), 'light' = light bg (dark text)
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  showSubtitle?: boolean;
}

export const BaniyasLogo: React.FC<BaniyasLogoProps> = ({
  variant = 'light',
  size = 'md',
  className = '',
  showSubtitle = true,
}) => {
  const isDark = variant === 'dark';

  const containerHeight = {
    sm: 'h-7',
    md: 'h-9',
    lg: 'h-11',
  }[size];

  const titleTextSize = {
    sm: 'text-xs md:text-sm tracking-[0.16em]',
    md: 'text-sm md:text-base tracking-[0.18em]',
    lg: 'text-lg md:text-xl tracking-[0.2em]',
  }[size];

  const subTextSize = {
    sm: 'text-[8px] md:text-[9px] tracking-[0.22em]',
    md: 'text-[9px] md:text-[10px] tracking-[0.26em]',
    lg: 'text-[11px] md:text-[12px] tracking-[0.3em]',
  }[size];

  const textColor = isDark ? 'text-white' : 'text-gray-900';
  const bottomCurveColor = isDark ? '#FFFFFF' : '#0F172A';

  return (
    <div className={`flex items-center gap-2.5 select-none ${containerHeight} ${className}`}>
      <svg
        viewBox="0 0 100 100"
        className="h-full w-auto aspect-square shrink-0 overflow-visible"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden
      >
        {/* Top yellow/gold loop of B — logo orange (fixed) */}
        <path
          d="M 22 8 L 54 8 C 74 8 86 18 86 32 C 86 44 76 52 58 52 L 22 52 Z"
          fill="#F59E0B"
        />
        <path
          d="M 38 20 C 38 16 42 13 47 13 C 52 13 56 16 56 20 L 62 20 C 63.5 20 64.5 21.2 64.2 22.6 L 60.5 43 C 60.2 44.2 59.1 45 57.9 45 L 36.1 45 C 34.9 45 33.8 44.2 33.5 43 L 29.8 22.6 C 29.5 21.2 30.5 20 32 20 L 38 20 Z M 42 20 L 52 20 C 52 17.5 49.8 15.5 47 15.5 C 44.2 15.5 42 17.5 42 20 Z"
          fill="#0F172A"
        />
        <path
          d="M 22 42 L 58 42 C 78 42 88 54 88 68 C 88 84 72 92 50 92 L 22 92 Z"
          fill={bottomCurveColor}
        />
      </svg>

      <div className="h-[75%] w-[1.5px] bg-amber-500/80 shrink-0" />

      <div className="flex flex-col justify-center leading-none">
        <span className={`font-black ${titleTextSize} ${textColor} font-sans uppercase`}>
          BANIYAS
        </span>
        {showSubtitle && (
          <div className="flex items-center gap-1 mt-0.5">
            <div className="h-[1px] w-2.5 bg-amber-500 shrink-0" />
            <span className={`font-bold ${subTextSize} text-amber-500 uppercase font-sans`}>
              STORE
            </span>
            <div className="h-[1px] w-2.5 bg-amber-500 shrink-0" />
          </div>
        )}
      </div>
    </div>
  );
};
