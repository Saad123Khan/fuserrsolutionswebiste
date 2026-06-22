
import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import SectionTitle from '@/components/ui/SectionTitle';
import AnimatedSection from '@/components/ui/AnimatedSection';

const testimonials = [
  {
    quote: "Their team delivered a complete SaaS platform in 10 weeks — fully under our brand. Our client never knew a third party was involved. The code quality was exceptional.",
    author: 'Marcus Webb',
    role: 'Director',
    company: 'Luminary Digital Agency',
    initial: 'M',
    color: '#3B82F6',
  },
  {
    quote: "We went from turning down projects to confidently pitching mobile app work. Fuserr handles everything behind the scenes and we take 100% of the credit. Game-changing.",
    author: 'Priya Nair',
    role: 'Founder',
    company: 'Nexus Growth Studio',
    initial: 'P',
    color: '#10B981',
  },
  {
    quote: "The NDA was signed within the hour, kickoff was the next day. They integrated into our Slack, matched our client's brand guide exactly, and shipped every sprint on time.",
    author: 'Tom Hartley',
    role: 'Managing Partner',
    company: 'Hartley & Co Consulting',
    initial: 'T',
    color: '#06B6D4',
  },
  {
    quote: "I was worried about losing control of my client relationships. Instead, Fuserr made me look like a rockstar. Our client renewed immediately and bumped the retainer.",
    author: 'Sarah Osei',
    role: 'CEO',
    company: 'Osei Creative Group',
    initial: 'S',
    color: '#F59E0B',
  },
];

export default function Testimonials() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  const next = useCallback(() => setActive((a) => (a + 1) % testimonials.length), []);
  const prev = useCallback(() => setActive((a) => (a - 1 + testimonials.length) % testimonials.length), []);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(next, 6000);
    return () => clearInterval(id);
  }, [paused, next]);

  const t = testimonials[active];

  return (
    <section
      className="py-24 lg:py-36 relative overflow-hidden bg-slate-50 dark:bg-navy-900"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-slate-200 dark:via-navy-500/50 to-transparent" />

      {/* Background quote mark decoration */}
      <div
        aria-hidden
        className="absolute top-8 left-1/2 -translate-x-1/2 text-[16rem] font-black leading-none select-none pointer-events-none opacity-[0.04] dark:opacity-[0.05] text-blue-600"
      >
        &ldquo;
      </div>

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="mb-14 text-center">
          <SectionTitle
            eyebrow="Agency Partners"
            title="Words from agencies"
            highlight="we power invisibly"
            align="center"
          />
        </AnimatedSection>

        {/* Slider */}
        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -18 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="glass rounded-3xl border border-slate-200 dark:border-navy-500/40 p-10 lg:p-14 text-center"
            >
              <Quote size={28} className="text-blue-500/50 mx-auto mb-7" />

              <blockquote className="text-xl lg:text-2xl font-medium text-slate-700 dark:text-[#E8E8E8] leading-relaxed mb-10 italic">
                &ldquo;{t.quote}&rdquo;
              </blockquote>

              <div className="flex items-center justify-center gap-4">
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-md"
                  style={{ background: `linear-gradient(135deg, ${t.color}, ${t.color}99)` }}
                >
                  {t.initial}
                </div>
                <div className="text-left">
                  <div className="font-semibold text-slate-900 dark:text-[#E8E8E8]">{t.author}</div>
                  <div className="text-sm text-slate-400 dark:text-[#64748B]">
                    {t.role} · {t.company}
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Prev / Next */}
          <button
            onClick={prev}
            aria-label="Previous testimonial"
            className="absolute -left-4 lg:-left-14 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full glass border border-slate-200 dark:border-navy-500/50 flex items-center justify-center text-slate-400 dark:text-[#64748B] hover:text-blue-600 dark:hover:text-blue-400 transition-colors shadow-sm"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            onClick={next}
            aria-label="Next testimonial"
            className="absolute -right-4 lg:-right-14 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full glass border border-slate-200 dark:border-navy-500/50 flex items-center justify-center text-slate-400 dark:text-[#64748B] hover:text-blue-600 dark:hover:text-blue-400 transition-colors shadow-sm"
          >
            <ChevronRight size={18} />
          </button>
        </div>

        {/* Dot indicators */}
        <div className="flex items-center justify-center gap-2 mt-8">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              aria-label={`Testimonial ${i + 1}`}
              className="transition-all duration-300 rounded-full"
              style={{
                width: i === active ? 24 : 8,
                height: 8,
                background: i === active ? '#2563EB' : 'var(--c-border)',
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
