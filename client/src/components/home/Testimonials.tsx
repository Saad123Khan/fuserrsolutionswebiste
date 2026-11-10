import { motion } from 'framer-motion';
import { Quote, Star } from 'lucide-react';
import { testimonials, type Testimonial } from '@/data/testimonials';
import { company } from '@/data/company';
import SectionHeading from '@/components/ui/SectionHeading';
import Marquee from '@/components/motion/Marquee';

const EASE = [0.22, 1, 0.36, 1] as const;

export default function Testimonials() {
  // With few reviews, a single row reads better; split into two opposing rows once there are enough.
  const twoRows = testimonials.length >= 6;
  const half = Math.ceil(testimonials.length / 2);
  const rows = twoRows ? [testimonials.slice(0, half), testimonials.slice(half)] : [testimonials];

  return (
    <section className="relative overflow-hidden bg-[var(--c-bg-alt)] py-24 dark:bg-navy-900 lg:py-32">
      <div className="mx-auto mb-14 flex max-w-7xl flex-col items-center gap-10 px-4 sm:px-6 lg:flex-row lg:items-end lg:justify-between lg:px-8">
        <SectionHeading
          eyebrow="Client reviews"
          title={['What our', { text: 'clients say', className: 'text-gradient' }]}
          description="Long-term relationships built on shipping great software, on time."
        />

        {/* Rating summary */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease: EASE }}
          className="flex shrink-0 items-center gap-5 rounded-2xl border border-slate-200 bg-white px-6 py-5 shadow-sm dark:border-navy-500/40 dark:bg-navy-800/50"
        >
          <span className="font-montserrat text-5xl font-extrabold text-gradient">{company.rating}</span>
          <span>
            <span className="flex gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + i * 0.08, type: 'spring', stiffness: 400, damping: 15 }}
                >
                  <Star size={16} className="fill-amber-400 text-amber-400" />
                </motion.span>
              ))}
            </span>
            <span className="mt-1 block text-xs text-slate-500 dark:text-[#94A3B8]">Average client rating</span>
          </span>
        </motion.div>
      </div>

      <div className="space-y-5">
        {rows.map((row, i) => (
          <Marquee key={i} duration={45} reverse={i === 1} gapClassName="gap-5 pr-5">
            {row.map((t) => (
              <ReviewCard key={t.author} t={t} />
            ))}
          </Marquee>
        ))}
      </div>
    </section>
  );
}

function ReviewCard({ t }: { t: Testimonial }) {
  const initials = t.author
    .split(' ')
    .map((n) => n[0])
    .join('')
    .slice(0, 2);

  return (
    <figure className="flex w-[22rem] shrink-0 flex-col rounded-2xl border border-slate-200 bg-white p-7 transition-colors duration-300 hover:border-blue-300 dark:border-navy-500/40 dark:bg-navy-800/50 dark:hover:border-blue-500/40 sm:w-[26rem]">
      <Quote size={22} className="mb-4 text-blue-500/40" />
      <blockquote className="flex-1 leading-relaxed text-slate-700 dark:text-[#E8E8E8]">{t.quote}</blockquote>
      <figcaption className="mt-6 flex items-center gap-3 border-t border-slate-100 pt-5 dark:border-navy-500/30">
        {t.avatar ? (
          <img src={t.avatar} alt="" className="h-10 w-10 rounded-full object-cover" />
        ) : (
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 text-sm font-bold text-white">
            {initials}
          </span>
        )}
        <span>
          <span className="block text-sm font-semibold text-slate-900 dark:text-white">{t.author}</span>
          <span className="block text-xs text-slate-500 dark:text-[#94A3B8]">
            {t.role}, {t.company}
          </span>
        </span>
      </figcaption>
    </figure>
  );
}
