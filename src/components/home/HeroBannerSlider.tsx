import React, { useEffect, useState, useCallback } from 'react';
import { ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import { SafeImage } from '../common/SafeImage';

type HeroLook = { seed: string; price: string; img: string };

type HeroSlide = {
  id: string;
  badge: string;
  tag: string;
  title: string;
  subtitle: string;
  looks: HeroLook[];
};

const HERO_SLIDES: HeroSlide[] = [
  {
    id: 'polished',
    badge: 'Trends',
    tag: '#CutOutDetails',
    title: '#CutOutDetails & #PolishedPieces',
    subtitle: "Unveil the season's most sought-after silhouettes and elevated essentials.",
    looks: [
      { seed: 'h1a', price: '1,850', img: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400&auto=format&fit=crop&q=80' },
      { seed: 'h1b', price: '2,400', img: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=400&auto=format&fit=crop&q=80' },
      { seed: 'h1c', price: '1,950', img: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=400&auto=format&fit=crop&q=80' }
    ]
  },
  {
    id: 'statement',
    badge: 'New In',
    tag: '#StatementGlam',
    title: '#StatementGlam for Addis Nights',
    subtitle: 'Bold looks from local vendors — meetup in Bole & Kazanchis, or ask about vendor delivery.',
    looks: [
      { seed: 'h2a', price: '1,650', img: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=400&auto=format&fit=crop&q=80' },
      { seed: 'h2b', price: '2,100', img: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=400&auto=format&fit=crop&q=80' },
      { seed: 'h2c', price: '1,420', img: 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=400&auto=format&fit=crop&q=80' }
    ]
  },
  {
    id: 'tech',
    badge: 'Hot Deals',
    tag: '#TechFinds',
    title: '#TechFinds · Phones & Gadgets',
    subtitle: 'Verified sellers across Addis. Inspect in person before you pay — vendors handle handoff.',
    looks: [
      { seed: 'h3a', price: '48,900', img: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&auto=format&fit=crop&q=80' },
      { seed: 'h3b', price: '32,500', img: 'https://images.unsplash.com/photo-1593640408182-31c70c8268f5?w=400&auto=format&fit=crop&q=80' },
      { seed: 'h3c', price: '12,800', img: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&auto=format&fit=crop&q=80' }
    ]
  }
];

const AUTO_MS = 5500;

interface HeroBannerSliderProps {
  onCta: () => void;
}

export const HeroBannerSlider: React.FC<HeroBannerSliderProps> = ({ onCta }) => {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const total = HERO_SLIDES.length;

  const go = useCallback(
    (next: number) => {
      setIndex(((next % total) + total) % total);
    },
    [total]
  );

  useEffect(() => {
    if (paused) return;
    const id = window.setInterval(() => go(index + 1), AUTO_MS);
    return () => window.clearInterval(id);
  }, [index, paused, go]);

  const slide = HERO_SLIDES[index];

  return (
    <div
      className="relative rounded-2xl overflow-hidden bg-ink text-paper shadow-md"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="grid md:grid-cols-2 gap-0 min-h-[220px] md:min-h-[280px]">
        <div className="p-5 md:p-8 flex flex-col justify-center space-y-3 relative z-10">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="btn-primary text-xs font-black px-2.5 py-0.5 rounded-sm uppercase tracking-wider inline-flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5" />
              {slide.badge}
            </span>
            <span className="text-brand-ring text-xs font-semibold">{slide.tag}</span>
          </div>

          <h2
            key={`title-${slide.id}`}
            className="text-2xl md:text-4xl font-black text-paper italic tracking-tight font-serif animate-in fade-in duration-500"
          >
            {slide.title}
          </h2>
          <p
            key={`sub-${slide.id}`}
            className="text-xs md:text-sm text-brand-muted max-w-md animate-in fade-in duration-500"
          >
            {slide.subtitle}
          </p>

          <button
            type="button"
            onClick={onCta}
            className="mt-1 inline-flex items-center gap-1 bg-paper text-ink text-xs font-black px-4 py-2.5 rounded-full w-fit hover:bg-brand-soft transition-colors"
          >
            View details
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div
          key={`looks-${slide.id}`}
          className="flex items-stretch gap-2 p-3 md:p-4 overflow-x-auto scrollbar-none animate-in fade-in duration-500"
        >
          {slide.looks.map(look => (
            <button
              key={look.seed}
              type="button"
              onClick={onCta}
              className="bg-paper text-ink rounded-xl p-1.5 shadow-xl text-center w-[30%] min-w-[5.5rem] md:flex-1 cursor-pointer hover:scale-[1.02] transition-transform"
            >
              <SafeImage
                src={look.img}
                alt=""
                fallbackSeed={look.seed}
                className="w-full aspect-3/4 object-cover rounded-lg mb-1"
              />
              <span className="text-xs font-black text-brand block">{look.price} ETB</span>
            </button>
          ))}
        </div>
      </div>

      {/* Arrows — desktop */}
      <button
        type="button"
        aria-label="Previous slide"
        onClick={() => go(index - 1)}
        className="hidden md:flex absolute left-2 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-paper/15 hover:bg-paper/25 text-paper items-center justify-center backdrop-blur-sm border border-paper/20"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      <button
        type="button"
        aria-label="Next slide"
        onClick={() => go(index + 1)}
        className="hidden md:flex absolute right-2 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-paper/15 hover:bg-paper/25 text-paper items-center justify-center backdrop-blur-sm border border-paper/20"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-3 left-0 right-0 flex items-center justify-center gap-1.5 z-20">
        {HERO_SLIDES.map((s, i) => (
          <button
            key={s.id}
            type="button"
            aria-label={`Go to slide ${i + 1}`}
            onClick={() => go(i)}
            className={`h-1.5 rounded-full transition-all ${
              i === index ? 'w-6 bg-brand' : 'w-1.5 bg-paper/40 hover:bg-paper/70'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export { HERO_SLIDES };
