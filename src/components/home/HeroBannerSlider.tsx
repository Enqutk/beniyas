import React, { useCallback, useEffect, useRef, useState } from 'react';
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
  },
  {
    id: 'home',
    badge: 'Living',
    tag: '#HomeFinds',
    title: '#HomeFinds for Your Space',
    subtitle: 'Sofas, décor & more from Addis vendors. Meet locally or request the seller’s delivery.',
    looks: [
      { seed: 'h4a', price: '28,500', img: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&auto=format&fit=crop&q=80' },
      { seed: 'h4b', price: '9,200', img: 'https://images.unsplash.com/photo-1617806118233-18e1de247200?w=400&auto=format&fit=crop&q=80' },
      { seed: 'h4c', price: '4,800', img: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400&auto=format&fit=crop&q=80' }
    ]
  }
];

const AUTO_MS = 2500;
const SLIDE_MS = 850;

interface HeroBannerSliderProps {
  onCta: () => void;
}

export const HeroBannerSlider: React.FC<HeroBannerSliderProps> = ({ onCta }) => {
  const total = HERO_SLIDES.length;
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [progressKey, setProgressKey] = useState(0);
  const [dragPx, setDragPx] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [width, setWidth] = useState(0);

  const viewportRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef<number | null>(null);

  useEffect(() => {
    const el = viewportRef.current;
    if (!el) return;
    const sync = () => setWidth(el.clientWidth);
    sync();
    const ro = new ResizeObserver(sync);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const goTo = useCallback(
    (next: number) => {
      setIndex(((next % total) + total) % total);
      setProgressKey(k => k + 1);
      setDragPx(0);
    },
    [total]
  );

  useEffect(() => {
    if (paused || dragging) return;
    const id = window.setInterval(() => {
      setIndex(i => (i + 1) % total);
      setProgressKey(k => k + 1);
    }, AUTO_MS);
    return () => window.clearInterval(id);
  }, [paused, dragging, total]);

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    setDragging(true);
    setPaused(true);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    if (touchStartX.current == null) return;
    setDragPx(e.touches[0].clientX - touchStartX.current);
  };

  const onTouchEnd = () => {
    const threshold = Math.max(48, width * 0.15);
    if (dragPx < -threshold) goTo(index + 1);
    else if (dragPx > threshold) goTo(index - 1);
    else setDragPx(0);
    touchStartX.current = null;
    setDragging(false);
    setPaused(false);
  };

  // Pixel-based slide so it glides one banner at a time (no sudden swap)
  const x = width > 0 ? -(index * width) + (dragging ? dragPx : 0) : 0;

  return (
    <div
      ref={viewportRef}
      className="relative rounded-2xl overflow-hidden bg-ink text-paper shadow-lg select-none"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => {
        setPaused(false);
        setDragging(false);
        setDragPx(0);
      }}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
      role="region"
      aria-roledescription="carousel"
      aria-label="Featured collections"
    >
      <div
        className="flex"
        style={{
          width: width > 0 ? width * total : '100%',
          transform: `translate3d(${x}px, 0, 0)`,
          transition: dragging
            ? 'none'
            : `transform ${SLIDE_MS}ms cubic-bezier(0.22, 0.61, 0.36, 1)`,
          willChange: 'transform'
        }}
      >
        {HERO_SLIDES.map((slide, i) => (
          <div
            key={slide.id}
            className="shrink-0 grid md:grid-cols-2 gap-0 min-h-[240px] md:min-h-[300px]"
            style={{ width: width > 0 ? width : '100%' }}
            aria-hidden={i !== index}
          >
            <div className="p-5 md:p-8 flex flex-col justify-center space-y-3 relative z-10">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="btn-primary text-xs font-black px-2.5 py-0.5 rounded-sm uppercase tracking-wider inline-flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5" />
                  {slide.badge}
                </span>
                <span className="text-brand-ring text-xs font-semibold">{slide.tag}</span>
              </div>

              <h2 className="text-2xl md:text-4xl font-black text-paper italic tracking-tight font-serif leading-tight">
                {slide.title}
              </h2>
              <p className="text-xs md:text-sm text-brand-muted max-w-md leading-relaxed">
                {slide.subtitle}
              </p>

              <button
                type="button"
                onClick={onCta}
                className="mt-1 inline-flex items-center gap-1 bg-paper text-ink text-xs font-black px-4 py-2.5 rounded-full w-fit hover:bg-brand-soft transition-colors active:scale-[0.98]"
              >
                View details
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            <div className="flex items-stretch gap-2 p-3 md:p-5 md:pl-2">
              {slide.looks.map(look => (
                <button
                  key={look.seed}
                  type="button"
                  onClick={onCta}
                  className="bg-paper text-ink rounded-xl p-1.5 shadow-xl text-center flex-1 min-w-0 cursor-pointer hover:scale-[1.03] transition-transform duration-300"
                >
                  <SafeImage
                    src={look.img}
                    alt=""
                    fallbackSeed={look.seed}
                    className="w-full aspect-3/4 object-cover rounded-lg mb-1.5"
                  />
                  <span className="text-xs font-black text-brand block">{look.price} ETB</span>
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      <button
        type="button"
        aria-label="Previous slide"
        onClick={() => goTo(index - 1)}
        className="hidden md:flex absolute left-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-paper/10 hover:bg-paper/25 text-paper items-center justify-center backdrop-blur-md border border-paper/20 transition-colors"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      <button
        type="button"
        aria-label="Next slide"
        onClick={() => goTo(index + 1)}
        className="hidden md:flex absolute right-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-paper/10 hover:bg-paper/25 text-paper items-center justify-center backdrop-blur-md border border-paper/20 transition-colors"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      <div className="absolute bottom-3 left-0 right-0 flex items-center justify-center gap-2 z-20 px-4">
        {HERO_SLIDES.map((s, i) => {
          const active = i === index;
          return (
            <button
              key={s.id}
              type="button"
              aria-label={`Go to slide ${i + 1}`}
              aria-current={active}
              onClick={() => goTo(i)}
              className={`relative h-1.5 rounded-full overflow-hidden transition-all duration-500 ${
                active ? 'w-8 bg-paper/25' : 'w-1.5 bg-paper/35 hover:bg-paper/60'
              }`}
            >
              {active && !paused && !dragging && (
                <span
                  key={progressKey}
                  className="absolute inset-y-0 left-0 w-full bg-brand rounded-full origin-left"
                  style={{ animation: `heroProgress ${AUTO_MS}ms linear forwards` }}
                />
              )}
              {active && (paused || dragging) && (
                <span className="absolute inset-0 bg-brand rounded-full" />
              )}
            </button>
          );
        })}
      </div>

      <style>{`
        @keyframes heroProgress {
          from { transform: scaleX(0); }
          to { transform: scaleX(1); }
        }
      `}</style>
    </div>
  );
};

export { HERO_SLIDES };
