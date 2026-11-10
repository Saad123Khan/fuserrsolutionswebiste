import { useCallback, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion, useInView, useReducedMotion, type PanInfo, type Variants } from 'framer-motion';
import { ArrowLeft, ArrowRight, ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { services, serviceHref, type Service } from '@/data/services';
import SpotlightCard from '@/components/motion/SpotlightCard';
import ServiceVisual from '@/components/services/ServiceVisual';
import SectionHeading from '@/components/ui/SectionHeading';
import { cn } from '@/lib/utils';

const ORDER = ['web', 'mobile', 'saas', 'ai', 'backend', 'integrations', 'ui', 'cloud'];
const ordered = ORDER.map((id) => services.find((s) => s.id === id)).filter((s): s is Service => Boolean(s));
const N = ordered.length;

/** Time each card stays before auto-advancing (ms). */
const AUTOPLAY_MS = 3000;
const EASE = [0.22, 1, 0.36, 1] as const;

/** 3D coverflow-style swap: cards swing around the Y axis and recede in depth. */
const SWAP = { duration: 0.7, ease: [0.65, 0, 0.35, 1] as const };
const slide: Variants = {
  enter: (dir: number) => ({ x: dir > 0 ? '55%' : '-55%', rotateY: dir > 0 ? -35 : 35, z: -180, opacity: 0 }),
  center: { x: 0, rotateY: 0, z: 0, opacity: 1, transition: SWAP },
  exit: (dir: number) => ({ x: dir > 0 ? '-55%' : '55%', rotateY: dir > 0 ? 35 : -35, z: -180, opacity: 0, transition: SWAP }),
};

/**
 * Services carousel: one large card at a time, auto-advancing every few
 * seconds. Users can also use arrows, dots, keyboard or drag/swipe. Autoplay
 * pauses on hover, when off-screen or the tab is hidden, and is off for
 * reduced-motion users.
 */
export default function ServicesCarousel() {
  const rootRef = useRef<HTMLElement>(null);
  const inView = useInView(rootRef, { margin: '-20% 0px -20% 0px' });
  const reduce = useReducedMotion();
  const [[index, dir], setState] = useState<[number, number]>([0, 1]);
  const [hovered, setHovered] = useState(false);
  const [tabHidden, setTabHidden] = useState(false);

  const paginate = useCallback((step: number) => {
    setState(([i]) => [(i + step + N) % N, step]);
  }, []);
  const goTo = (i: number) => setState(([cur]) => [i, i >= cur ? 1 : -1]);

  useEffect(() => {
    const onVis = () => setTabHidden(document.hidden);
    document.addEventListener('visibilitychange', onVis);
    return () => document.removeEventListener('visibilitychange', onVis);
  }, []);

  const playing = !reduce && inView && !hovered && !tabHidden;

  // Autoplay — restarts whenever the card changes (so manual navigation resets the timer)
  useEffect(() => {
    if (!playing) return;
    const t = window.setTimeout(() => paginate(1), AUTOPLAY_MS);
    return () => window.clearTimeout(t);
  }, [index, playing, paginate]);

  const onDragEnd = (_: unknown, info: PanInfo) => {
    const swipe = info.offset.x + info.velocity.x * 0.2;
    if (swipe < -80) paginate(1);
    else if (swipe > 80) paginate(-1);
  };

  const s = ordered[index];

  return (
    <section ref={rootRef} className="relative overflow-hidden bg-[var(--c-bg-alt)] py-24 dark:bg-navy-900 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <SectionHeading
            eyebrow="What we do"
            title={['Everything you need to', { text: 'build and scale', className: 'text-gradient' }]}
            description="One team for design, development, AI and cloud."
          />
          <Link
            to="/services"
            className="group inline-flex shrink-0 items-center gap-2 text-sm font-semibold text-blue-600 transition-colors hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
          >
            All services
            <ArrowUpRight size={14} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>

        {/* Stage */}
        <div
          role="region"
          aria-roledescription="carousel"
          aria-label="Our services"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'ArrowRight') paginate(1);
            if (e.key === 'ArrowLeft') paginate(-1);
          }}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          className="relative rounded-3xl outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
        >
          <div className="relative h-[600px] [perspective:1600px] [transform-style:preserve-3d] sm:h-[560px] lg:h-[440px]">
            {/* Stacked cards behind for depth */}
            <div className="absolute inset-x-10 -bottom-4 top-4 rounded-3xl border border-white/5 bg-white/[0.02]" />
            <div className="absolute inset-x-5 -bottom-2 top-2 rounded-3xl border border-white/10 bg-white/[0.03]" />

            <AnimatePresence initial={false} custom={dir}>
              <motion.div
                key={s.id}
                custom={dir}
                variants={slide}
                initial="enter"
                animate="center"
                exit="exit"
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.25}
                whileDrag={{ scale: 0.97 }}
                onDragEnd={onDragEnd}
                className="absolute inset-0 cursor-grab will-change-transform [backface-visibility:hidden] active:cursor-grabbing"
                aria-roledescription="slide"
                aria-label={`${index + 1} of ${N}: ${s.title}`}
              >
                <BigCard service={s} index={index} />
                {/* Glare sweeping across the card as it lands */}
                <span className="pointer-events-none absolute inset-0 overflow-hidden rounded-2xl">
                  <motion.span
                    className="absolute inset-y-0 -left-1/2 w-1/2 -skew-x-12 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                    initial={{ x: '0%' }}
                    animate={{ x: '400%' }}
                    transition={{ duration: 0.9, delay: 0.15, ease: EASE }}
                  />
                </span>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Controls */}
          <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              {ordered.map((item, i) => {
                const on = i === index;
                return (
                  <button
                    key={item.id}
                    type="button"
                    aria-label={`Show ${item.title}`}
                    aria-current={on}
                    onClick={() => goTo(i)}
                    className="group flex h-6 items-center"
                  >
                    <span
                      className={cn(
                        'relative block h-1.5 overflow-hidden rounded-full transition-all duration-500',
                        on ? 'w-12 bg-white/15' : 'w-4 bg-white/20 group-hover:bg-white/40'
                      )}
                    >
                      {on && (
                        <motion.span
                          key={`${index}-${playing}`}
                          className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500"
                          initial={{ width: playing ? '0%' : '100%' }}
                          animate={{ width: '100%' }}
                          transition={{ duration: playing ? AUTOPLAY_MS / 1000 : 0, ease: 'linear' }}
                        />
                      )}
                    </span>
                  </button>
                );
              })}
            </div>

            <div className="flex items-center gap-4">
              <span className="hidden text-sm text-slate-400 sm:inline">{s.title}</span>
              <span className="font-mono text-sm tabular-nums text-slate-400">
                <span className="text-white">{String(index + 1).padStart(2, '0')}</span> / {String(N).padStart(2, '0')}
              </span>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => paginate(-1)}
                  aria-label="Previous service"
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-white transition-all hover:-translate-x-0.5 hover:border-blue-400 hover:bg-blue-600"
                >
                  <ArrowLeft size={17} />
                </button>
                <button
                  type="button"
                  onClick={() => paginate(1)}
                  aria-label="Next service"
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-white transition-all hover:translate-x-0.5 hover:border-blue-400 hover:bg-blue-600"
                >
                  <ArrowRight size={17} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* Large card: visual + text (side by side on desktop, stacked on mobile) */
function BigCard({ service: s, index }: { service: Service; index: number }) {
  const Icon = s.icon;
  return (
    <SpotlightCard className="grid h-full grid-rows-[0.85fr_1fr] bg-[#0A1224] shadow-[0_24px_60px_-30px_rgba(0,0,0,0.7)] dark:bg-[#0A1224] lg:grid-cols-2 lg:grid-rows-1">
      {/* Visual */}
      <div
        className="pointer-events-none relative flex items-center overflow-hidden border-b border-white/10 lg:border-b-0 lg:border-r"
        style={{ background: `radial-gradient(circle at 0% 0%, ${s.accent}30, transparent 45%), radial-gradient(ellipse at 50% 110%, ${s.accent}38, transparent 70%)` }}
      >
        <div className="absolute inset-0 dot-grid opacity-40" />
        <span className="absolute right-6 top-5 font-montserrat text-4xl font-black text-white/[0.06] lg:text-5xl">
          {String(index + 1).padStart(2, '0')}
        </span>
        <div className="relative mx-auto w-full max-w-[440px] px-6 py-6 max-lg:scale-[0.85]">
          <ServiceVisual id={s.id} />
        </div>
      </div>

      {/* Text */}
      <div className="flex flex-col justify-center p-6 sm:p-8 lg:px-10 lg:py-8">
        <div className="mb-4 flex items-center gap-3 lg:block">
          <span
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl lg:mb-5 lg:h-12 lg:w-12"
            style={{ background: `${s.accent}18`, border: `1px solid ${s.accent}35` }}
          >
            <Icon size={21} style={{ color: s.accent }} />
          </span>
          <h3 className="text-2xl font-bold tracking-tight text-white lg:text-3xl xl:text-4xl">{s.title}</h3>
        </div>
        <p className="text-sm leading-relaxed text-slate-400 sm:text-base">{s.intro}</p>

        <ul className="mt-5 grid gap-x-4 gap-y-2 sm:grid-cols-2">
          {s.offerings.slice(0, 4).map((o) => (
            <li key={o.title} className="flex items-center gap-2 text-sm text-slate-300">
              <CheckCircle2 size={15} className="shrink-0" style={{ color: s.accent }} />
              {o.title}
            </li>
          ))}
        </ul>

        <div className="mt-7 flex flex-wrap items-center justify-between gap-4">
          <div className="hidden flex-wrap gap-1.5 sm:flex">
            {s.tech.slice(0, 4).map((t) => (
              <span key={t} className="tech-tag">
                {t}
              </span>
            ))}
          </div>
          <Link
            to={serviceHref(s.id)}
            draggable={false}
            className="group inline-flex shrink-0 items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-600/30 transition-all hover:-translate-y-0.5 hover:bg-blue-500"
          >
            Explore
            <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </SpotlightCard>
  );
}
