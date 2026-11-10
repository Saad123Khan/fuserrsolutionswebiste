import { useRef, type ReactNode } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import HeroCanvas, { type HeroVariant } from '@/components/motion/HeroCanvas';
import TextReveal, { type RevealSegment } from '@/components/motion/TextReveal';
import { cn } from '@/lib/utils';

const EASE = [0.22, 1, 0.36, 1] as const;

interface PageHeroProps {
  /** Small label above the title (string gets the standard line style). */
  eyebrow?: ReactNode;
  title: RevealSegment[] | string;
  description?: ReactNode;
  /** Content above the eyebrow, e.g. breadcrumb or back link. */
  top?: ReactNode;
  /** Content below the description, e.g. buttons, chips, meta. */
  children?: ReactNode;
  /** Right-hand column; switches to a two-column layout on large screens. */
  aside?: ReactNode;
  align?: 'center' | 'left';
  /** "lg" fills the viewport; "md" is a shorter inner-page hero. */
  size?: 'md' | 'lg';
  /** Background animation for this page. */
  variant?: HeroVariant;
  /** Hex accent colour for accent-aware animations (aurora, sparks). */
  accent?: string;
  titleClassName?: string;
  className?: string;
}

/**
 * Shared animated hero used on every inner page: per-page animated canvas background,
 * glows, readability vignette, word-reveal title and scroll parallax.
 */
export default function PageHero({
  eyebrow,
  title,
  description,
  top,
  children,
  aside,
  align = 'center',
  size = 'md',
  variant = 'network',
  accent,
  titleClassName,
  className,
}: PageHeroProps) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -90]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);
  const waveScale = useTransform(scrollYProgress, [0, 1], [1, 1.12]);

  const split = Boolean(aside);
  const centered = align === 'center' && !split;

  const heading = (
    <div className={cn(centered && 'mx-auto max-w-4xl text-center', !centered && 'max-w-3xl')}>
      {top && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: EASE }}
          className={cn('mb-8', centered && 'flex justify-center')}
        >
          {top}
        </motion.div>
      )}

      {eyebrow && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.05, ease: EASE }}
          className={cn('mb-6 flex items-center gap-2', centered && 'justify-center')}
        >
          {typeof eyebrow === 'string' ? (
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-mono uppercase tracking-[0.2em] text-cyan-300 backdrop-blur-md">
              <span className="h-1.5 w-1.5 rounded-full bg-cyan-300 shadow-[0_0_10px_2px_rgba(34,211,238,0.7)]" />
              {eyebrow}
            </span>
          ) : (
            eyebrow
          )}
        </motion.div>
      )}

      <TextReveal
        as="h1"
        trigger="mount"
        delay={0.12}
        stagger={0.06}
        segments={title}
        className={cn(
          'font-montserrat font-extrabold leading-[1.05] tracking-tight text-white drop-shadow-[0_8px_40px_rgba(0,0,0,0.6)]',
          size === 'lg' ? 'text-5xl sm:text-7xl lg:text-[5.25rem]' : 'text-4xl sm:text-6xl lg:text-[4.25rem]',
          titleClassName
        )}
      />

      {description && (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5, ease: EASE }}
          className={cn('mt-6 text-lg leading-relaxed text-slate-300 sm:text-xl', centered ? 'mx-auto max-w-2xl' : 'max-w-xl')}
        >
          {description}
        </motion.div>
      )}

      {children && (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.65, ease: EASE }}
          className="mt-10"
        >
          {children}
        </motion.div>
      )}
    </div>
  );

  return (
    <section
      ref={ref}
      className={cn(
        'relative flex items-center overflow-hidden bg-[#030712]',
        size === 'lg' ? 'min-h-[100svh]' : 'min-h-[78svh]',
        className
      )}
    >
      {/* Glows */}
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="hero-blob absolute -top-40 left-[6%] h-[520px] w-[520px] rounded-full bg-blue-600/15 blur-[140px]" />
        <div className="hero-blob hero-blob--2 absolute -top-24 right-[6%] h-[460px] w-[460px] rounded-full bg-violet-600/15 blur-[140px]" />
        <div className="hero-blob hero-blob--3 absolute bottom-[-15%] left-1/2 h-[380px] w-[860px] -translate-x-1/2 rounded-full bg-cyan-500/15 blur-[140px]" />
      </div>

      {/* Animated wave */}
      <motion.div style={{ scale: waveScale }} className="absolute inset-0 origin-bottom">
        <HeroCanvas variant={variant} accent={accent} trackRef={ref} />
      </motion.div>

      {/* Readability + edge fades */}
      <div
        aria-hidden
        className={cn(
          'pointer-events-none absolute inset-0',
          split
            ? 'bg-[radial-gradient(ellipse_55%_50%_at_25%_45%,rgba(3,7,18,0.75)_0%,rgba(3,7,18,0.2)_60%,transparent_85%)]'
            : 'bg-[radial-gradient(ellipse_45%_35%_at_50%_45%,rgba(3,7,18,0.72)_0%,rgba(3,7,18,0.2)_60%,transparent_85%)]'
        )}
      />
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-[#030712] to-transparent" />
      <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-b from-transparent to-[#030712]" />

      {/* Content */}
      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="relative z-10 mx-auto w-full max-w-7xl px-4 pb-20 pt-36 sm:px-6 lg:px-8 lg:pt-40"
      >
        {split ? (
          <div className="grid items-center gap-14 lg:grid-cols-2">
            {heading}
            <div>{aside}</div>
          </div>
        ) : (
          heading
        )}
      </motion.div>
    </section>
  );
}
