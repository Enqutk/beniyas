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

/** [cloneLast, ...slides, cloneFirst] — seamless forward/back loop */
const LOOP = [
  { ...HERO_SLIDES[HERO_SLIDES.length - 1], id: `${HERO_SLIDES[HERO_SLIDES.length - 1].id}-clone-end` },
  ...HERO_SLIDES,
  { ...HERO_SLIDES[0], id: `${HERO_SLIDES[0].id}-clone-start` }
];

const REAL_COUNT = HERO_SLIDES.length;
const LOOP_LEN = LOOP.length;
const AUTO_MS = 2800;
const SLIDE_MS = 720;
const SLIDE_PCT = 100 / LOOP_LEN;

interface HeroBannerSliderProps {
  onCta: () => void;
}

export const HeroBannerSlider: React.FC<HeroBannerSliderProps> = ({ onCta }) => {
  const [pos, setPos] = useState(1);
  const [animate, setAnimate] = useState(true);
  const [paused, setPaused] = useState(false);
  const [progressKey, setProgressKey] = useState(0);
  const [dragPx, setDragPx] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [width, setWidth] = useState(0);

  const viewportRef = useRef<HTMLDivElement>(null);
  const touchStart = useRef<{ x: number; y: number } | null>(null);
  const axis = useRef<'x' | 'y' | null>(null);
  const jumping = useRef(false);

  const realIndex = (() => {
    if (pos === 0) return REAL_COUNT - 1;
    if (pos === LOOP_LEN - 1) return 0;
    return pos - 1;
  })();

  useEffect(() => {
    const el = viewportRef.current;
    if (!el) return;
    const sync = () => setWidth(el.clientWidth);
    sync();
    const ro = new ResizeObserver(sync);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const goNext = useCallback(() => {
    if (jumping.current) return;
    setAnimate(true);
    setPos(p => p + 1);
    setProgressKey(k => k + 1);
    setDragPx(0);
  }, []);

  const goPrev = useCallback(() => {
    if (jumping.current) return;
    setAnimate(true);
    setPos(p => p - 1);
    setProgressKey(k => k + 1);
    setDragPx(0);
  }, []);

  const goToReal = useCallback((real: number) => {
    if (jumping.current) return;
    setAnimate(true);
    setPos(real + 1);
    setProgressKey(k => k + 1);
    setDragPx(0);
  }, []);

  const onTransitionEnd = (e: React.TransitionEvent) => {
    if (e.propertyName !== 'transform' || jumping.current) return;
    if (pos === LOOP_LEN - 1) {
      jumping.current = true;
      setAnimate(false);
      setPos(1);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          jumping.current = false;
          setAnimate(true);
        });
      });
    } else if (pos === 0) {
      jumping.current = true;
      setAnimate(false);
      setPos(REAL_COUNT);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          jumping.current = false;
          setAnimate(true);
        });
      });
    }
  };

  useEffect(() => {
    if (paused || dragging) return;
    const id = window.setInterval(goNext, AUTO_MS);
    return () => window.clearInterval(id);
  }, [paused, dragging, goNext]);

  const onTouchStart = (e: React.TouchEvent) => {
    touchStart.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    axis.current = null;
  };

  const onTouchMove = (e: React.TouchEvent) => {
    if (!touchStart.current) return;
    const dx = e.touches[0].clientX - touchStart.current.x;
    const dy = e.touches[0].clientY - touchStart.current.y;

    if (axis.current == null) {
      if (Math.abs(dx) < 8 && Math.abs(dy) < 8) return;
      axis.current = Math.abs(dx) > Math.abs(dy) ? 'x' : 'y';
      if (axis.current === 'x') {
        setDragging(true);
        setPaused(true);
      }
    }

    if (axis.current === 'x') {
      setDragPx(dx);
    }
  };

  const endTouch = () => {
    if (axis.current === 'x') {
      const threshold = Math.max(40, width * 0.18);
      if (dragPx < -threshold) goNext();
      else if (dragPx > threshold) goPrev();
      else setDragPx(0);
    }
    touchStart.current = null;
    axis.current = null;
    setDragging(false);
    setPaused(false);
  };

  const baseShift = -(pos * SLIDE_PCT);

  return (
    <div
      ref={viewportRef}
      className="relative rounded-xl md:rounded-2xl overflow-hidden bg-ink text-paper shadow-lg select-none touch-pan-y"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => {
        setPaused(false);
        setDragging(false);
        setDragPx(0);
      }}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={endTouch}
      onTouchCancel={endTouch}
      role="region"
      aria-roledescription="carousel"
      aria-label="Featured collections"
    >
      <div
        className="flex"
        onTransitionEnd={onTransitionEnd}
        style={{
          width: `${LOOP_LEN * 100}%`,
          transform: dragging
            ? `translate3d(calc(${baseShift}% + ${dragPx}px), 0, 0)`
            : `translate3d(${baseShift}%, 0, 0)`,
          transition:
            animate && !dragging
              ? `transform ${SLIDE_MS}ms cubic-bezier(0.25, 0.1, 0.25, 1)`
              : 'none',
          willChange: 'transform'
        }}
      >
        {LOOP.map((slide, i) => (
          <div
            key={`${slide.id}-${i}`}
            className="shrink-0 flex flex-col md:grid md:grid-cols-2 md:min-h-[300px]"
            style={{ width: `${SLIDE_PCT}%` }}
            aria-hidden={i !== pos}
          >
            {/* Copy */}
            <div className="px-3 pt-3 pb-1.5 md:p-8 flex flex-col justify-center gap-1 md:gap-3 relative z-10">
              <div className="flex items-center gap-1.5 md:gap-2 flex-wrap">
                <span className="btn-primary text-[10px] md:text-xs font-black px-2 py-0.5 rounded-sm uppercase tracking-wider inline-flex items-center gap-1">
                  <Sparkles className="w-3 h-3 md:w-3.5 md:h-3.5" />
                  {slide.badge}
                </span>
                <span className="text-brand-ring text-[10px] md:text-xs font-semibold">{slide.tag}</span>
              </div>

              <h2 className="text-[1.05rem] leading-snug md:text-4xl md:leading-tight font-black text-paper italic tracking-tight font-serif line-clamp-2">
                {slide.title}
              </h2>
              <p className="hidden md:block text-sm text-brand-muted max-w-md leading-relaxed">
                {slide.subtitle}
              </p>

              <button
                type="button"
                onClick={onCta}
                className="mt-0.5 md:mt-1 inline-flex items-center gap-1 bg-paper text-ink text-[11px] md:text-xs font-black px-3 py-1.5 md:px-4 md:py-2.5 rounded-full w-fit hover:bg-brand-soft transition-colors active:scale-[0.98]"
              >
                View details
                <ChevronRight className="w-3.5 h-3.5 md:w-4 md:h-4" />
              </button>
            </div>

            {/* Looks */}
            <div className="grid grid-cols-3 gap-1.5 px-2.5 pb-7 md:flex md:items-stretch md:gap-2 md:p-5 md:pl-2 md:pb-5">
              {slide.looks.map(look => (
                <button
                  key={look.seed}
                  type="button"
                  onClick={onCta}
                  className="bg-paper text-ink rounded-lg md:rounded-xl p-1 md:p-1.5 shadow-md md:shadow-lg text-center min-w-0 cursor-pointer active:scale-[0.98] md:hover:scale-[1.03] transition-transform duration-300"
                >
                  <SafeImage
                    src={look.img}
                    alt=""
                    fallbackSeed={look.seed}
                    className="w-full aspect-square md:aspect-[3/4] object-cover rounded-md md:rounded-lg mb-1"
                  />
                  <span className="text-[10px] md:text-xs font-black text-brand block truncate px-0.5">
                    {look.price} ETB
                  </span>
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      <button
        type="button"
        aria-label="Previous slide"
        onClick={goPrev}
        className="hidden md:flex absolute left-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-paper/10 hover:bg-paper/25 text-paper items-center justify-center backdrop-blur-md border border-paper/20 transition-colors"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      <button
        type="button"
        aria-label="Next slide"
        onClick={goNext}
        className="hidden md:flex absolute right-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-paper/10 hover:bg-paper/25 text-paper items-center justify-center backdrop-blur-md border border-paper/20 transition-colors"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      <div className="absolute bottom-2.5 left-0 right-0 flex items-center justify-center gap-1.5 z-20 px-4 pointer-events-none">
        {HERO_SLIDES.map((s, i) => {
          const active = i === realIndex;
          return (
            <button
              key={s.id}
              type="button"
              aria-label={`Go to slide ${i + 1}`}
              aria-current={active ? 'true' : undefined}
              onClick={() => goToReal(i)}
              className={`pointer-events-auto relative h-1 rounded-full overflow-hidden transition-all duration-400 ${
                active ? 'w-7 bg-paper/25' : 'w-1.5 bg-paper/40'
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
