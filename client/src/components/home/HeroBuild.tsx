import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, ArrowUpRight, Star } from 'lucide-react';
import Button from '@/components/ui/Button';
import Magnetic from '@/components/motion/Magnetic';
import TextReveal from '@/components/motion/TextReveal';
import CodeTypingBackground from '@/components/motion/CodeTypingBackground';
import { company, stats } from '@/data/company';

const EASE = [0.22, 1, 0.36, 1] as const;

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, delay, ease: EASE },
});

/**
 * Homepage hero (experimental): full-screen, centred copy over a blurred
 * background of code typing itself. The previous dot-wave hero is kept in Hero.tsx.
 */
export default function HeroBuild() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end start'] });
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const bgY = useTransform(scrollYProgress, [0, 1], [0, 80]);

  const projects = stats.find((s) => s.label === 'Projects delivered');
  const years = stats.find((s) => s.label === 'Years of experience');

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-[100svh] items-center justify-center overflow-hidden bg-[#030712]"
    >
      {/* Coding background */}
      <motion.div style={{ y: bgY }} className="absolute inset-0">
        <CodeTypingBackground />
      </motion.div>

      {/* Glows */}
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="hero-blob absolute -top-40 left-[8%] h-[520px] w-[520px] rounded-full bg-blue-600/20 blur-[140px]" />
        <div className="hero-blob hero-blob--2 absolute -top-24 right-[6%] h-[460px] w-[460px] rounded-full bg-violet-600/20 blur-[140px]" />
        <div className="hero-blob hero-blob--3 absolute bottom-[-10%] left-1/2 h-[380px] w-[900px] -translate-x-1/2 rounded-full bg-cyan-500/10 blur-[140px]" />
      </div>

      {/* Readability: dark centre + edge fades */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_55%_45%_at_50%_48%,rgba(3,7,18,0.92)_0%,rgba(3,7,18,0.6)_55%,rgba(3,7,18,0.15)_85%)]"
      />
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-[#030712] to-transparent" />
      <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-48 bg-gradient-to-b from-transparent to-[#030712]" />

      {/* Content */}
      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="relative z-10 mx-auto w-full max-w-5xl px-4 pb-24 pt-32 text-center sm:px-6 lg:px-8"
      >
        <TextReveal
          as="h1"
          trigger="mount"
          delay={0.15}
          stagger={0.08}
          segments={['We build software that', { text: 'moves your business forward.', className: 'text-gradient pb-2' }]}
          className="font-montserrat text-[2.75rem] font-extrabold leading-[1.02] tracking-tight text-white drop-shadow-[0_8px_40px_rgba(0,0,0,0.8)] sm:text-7xl lg:text-[5.5rem]"
        />

        <motion.p {...fadeUp(0.7)} className="mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-slate-300 sm:text-xl">
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

    </section>
  );
}
