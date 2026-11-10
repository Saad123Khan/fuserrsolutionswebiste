import { motion } from 'framer-motion';
import { stats } from '@/data/company';
import CountUp from '@/components/motion/CountUp';

const EASE = [0.22, 1, 0.36, 1] as const;

export default function Stats() {
  return (
    <section className="relative overflow-hidden bg-[var(--c-bg)] py-20 lg:py-24">
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-64 w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-600/10 blur-[100px]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-y-12 lg:grid-cols-4">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: EASE }}
              className="relative px-4 text-center lg:px-8"
            >
              {/* Divider line that draws in */}
              {i > 0 && (
                <motion.span
                  aria-hidden
                  initial={{ scaleY: 0 }}
                  whileInView={{ scaleY: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.3 + i * 0.1, ease: EASE }}
                  className={`absolute left-0 top-2 bottom-2 w-px origin-top bg-gradient-to-b from-transparent via-slate-300 to-transparent dark:via-navy-500 ${
                    i === 2 ? 'hidden lg:block' : ''
                  }`}
                />
              )}

              <CountUp
                to={s.value}
                decimals={s.decimals}
                prefix={s.prefix}
                suffix={s.suffix}
                className="block font-montserrat text-5xl font-extrabold tracking-tight text-gradient lg:text-6xl"
              />
              <div className="mt-3 text-sm font-semibold text-slate-900 dark:text-[#E8E8E8]">{s.label}</div>
              <p className="mx-auto mt-1.5 max-w-[15rem] text-xs leading-relaxed text-slate-500 dark:text-[#94A3B8]">
                {s.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
