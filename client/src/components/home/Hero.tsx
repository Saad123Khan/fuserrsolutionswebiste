import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useLenis } from 'lenis/react';
import { ArrowRight, ArrowUpRight, Star } from 'lucide-react';
import Button from '@/components/ui/Button';
import Magnetic from '@/components/motion/Magnetic';
import TextReveal from '@/components/motion/TextReveal';
import DotWave from '@/components/motion/DotWave';
import { company, stats } from '@/data/company';

const EASE = [0.22, 1, 0.36, 1] as const;

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, delay, ease: EASE },
});

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const lenis = useLenis();
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end start'] });
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const waveScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);

  const projects = stats.find((s) => s.label === 'Projects delivered');
  const years = stats.find((s) => s.label === 'Years of experience');

  const scrollNext = () => {
    const el = sectionRef.current;
    if (!el) return;
    const y = el.offsetTop + el.offsetHeight;
    if (lenis) lenis.scrollTo(y - 64);
    else window.scrollTo({ top: y - 64, behavior: 'smooth' });
  };

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-[100svh] items-center justify-center overflow-hidden bg-[#030712]"
    >
      {/* Glows behind the wave */}
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="hero-blob absolute -top-40 left-[8%] h-[560px] w-[560px] rounded-full bg-blue-600/15 blur-[140px]" />
        <div className="hero-blob hero-blob--2 absolute -top-20 right-[6%] h-[480px] w-[480px] rounded-full bg-violet-600/15 blur-[140px]" />
        <div className="hero-blob hero-blob--3 absolute bottom-[-10%] left-1/2 h-[420px] w-[900px] -translate-x-1/2 rounded-full bg-cyan-500/15 blur-[140px]" />
      </div>

      {/* Live animated dot wave */}
      <motion.div style={{ scale: waveScale }} className="absolute inset-0 origin-bottom">
        <DotWave trackRef={sectionRef} />
      </motion.div>

      {/* Readability vignette + bottom fade into the next section */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_45%_32%_at_50%_42%,rgba(3,7,18,0.7)_0%,rgba(3,7,18,0.2)_60%,transparent_85%)]"
      />
      <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-[#030712]" />
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-[#030712] to-transparent" />

      {/* Content */}
      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="relative z-10 mx-auto w-full max-w-5xl px-4 pb-24 pt-32 text-center sm:px-6 lg:px-8"
      >
        {/* Status pill */}
        <motion.div {...fadeUp(0)} className="mb-8 flex justify-center">
          <Link
            to="/work"
            className="group inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-medium text-slate-300 backdrop-blur-md transition-colors hover:border-blue-400/50 hover:bg-white/10"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            Available for new projects
            <span className="h-3 w-px bg-white/20" />
            <span className="inline-flex items-center gap-1 text-blue-300">
              See our work
              <ArrowRight size={12} className="transition-transform group-hover:translate-x-0.5" />
            </span>
          </Link>
        </motion.div>

        <TextReveal
          as="h1"
          trigger="mount"
          delay={0.15}
          stagger={0.08}
          segments={[
            'We build software that',
            { text: 'moves your business forward.', className: 'text-gradient pb-2' },
          ]}
          className="font-montserrat text-[2.75rem] font-extrabold leading-[1.02] tracking-tight text-white drop-shadow-[0_8px_40px_rgba(0,0,0,0.6)] sm:text-7xl lg:text-[5.5rem]"
        />

        <motion.p
          {...fadeUp(0.7)}
          className="mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-slate-300 sm:text-xl"
        >
          Fuserr Solutions designs and builds custom web, mobile, SaaS and AI products, from first idea to launch
          and beyond.
        </motion.p>

        <motion.div {...fadeUp(0.85)} className="mt-11 flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-6">
          <Magnetic strength={0.25} className="w-full sm:w-auto">
            <Button
              href="/contact"
              variant="primary"
              size="lg"
              className="group w-full px-9 font-montserrat shadow-[0_10px_40px_rgba(37,99,235,0.55)] sm:w-auto"
            >
              Start a Project
              <ArrowRight size={17} className="transition-transform group-hover:translate-x-1" />
            </Button>
          </Magnetic>
          <Link
            to="/work"
            className="group inline-flex w-full items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/5 px-8 py-4 font-montserrat text-base font-semibold text-white backdrop-blur-md transition-all hover:border-white/30 hover:bg-white/10 sm:w-auto"
          >
            View Our Work
            <ArrowUpRight size={17} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </motion.div>

        {/* Trust line */}
        <motion.div
          {...fadeUp(1)}
          className="mt-12 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-slate-400"
        >
          <span className="inline-flex items-center gap-1.5">
            <span className="flex">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} size={13} className="fill-amber-400 text-amber-400" />
              ))}
            </span>
            <strong className="font-semibold text-white">{company.rating}</strong> client rating
          </span>
          {projects && (
            <>
              <span className="hidden h-1 w-1 rounded-full bg-slate-600 sm:block" />
              <span>
                <strong className="font-semibold text-white">
                  {projects.value}
                  {projects.suffix}
                </strong>{' '}
                projects delivered
              </span>
            </>
          )}
          {years && (
            <>
              <span className="hidden h-1 w-1 rounded-full bg-slate-600 sm:block" />
              <span>
                <strong className="font-semibold text-white">
                  {years.value}
                  {years.suffix}
                </strong>{' '}
                years building software
              </span>
            </>
          )}
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.button
        type="button"
        onClick={scrollNext}
        aria-label="Scroll to content"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2"
      >
        <span className="flex h-11 w-7 justify-center rounded-full border-2 border-white/25 pt-2 transition-colors hover:border-white/50">
          <motion.span
            className="h-2 w-1 rounded-full bg-white/70"
            animate={{ y: [0, 14, 0], opacity: [1, 0.2, 1] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          />
        </span>
      </motion.button>
    </section>
  );
}
