import { useId, useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Plus, ArrowRight } from 'lucide-react';
import { faqs as defaultFaqs, type FAQItem } from '@/data/faqs';
import SectionHeading from '@/components/ui/SectionHeading';
import { cn } from '@/lib/utils';

const EASE = [0.22, 1, 0.36, 1] as const;

export default function FAQ({ items = defaultFaqs }: { items?: FAQItem[] }) {
  const [open, setOpen] = useState<number | null>(0);
  const baseId = useId();

  return (
    <section className="relative bg-[var(--c-bg)] py-24 lg:py-32">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-12 lg:px-8">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-32">
            <SectionHeading
              eyebrow="FAQ"
              title={['Questions?', { text: 'Answers.', className: 'text-gradient' }]}
              description="Everything you need to know before starting a project with us."
            />
            <Link
              to="/contact"
              className="group mt-8 inline-flex items-center gap-2 text-sm font-semibold text-blue-600 dark:text-blue-400"
            >
              Still have questions? Talk to us
              <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>

        <div className="lg:col-span-8">
          <ul className="divide-y divide-slate-200 border-y border-slate-200 dark:divide-navy-500/40 dark:border-navy-500/40">
            {items.map((f, i) => {
              const isOpen = open === i;
              const panelId = `${baseId}-panel-${i}`;
              const buttonId = `${baseId}-button-${i}`;
              return (
                <motion.li
                  key={f.q}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.45, delay: i * 0.05, ease: EASE }}
                >
                  <h3>
                    <button
                      id={buttonId}
                      type="button"
                      aria-expanded={isOpen}
                      aria-controls={panelId}
                      onClick={() => setOpen(isOpen ? null : i)}
                      className="group flex w-full items-center justify-between gap-6 py-6 text-left"
                    >
                      <span
                        className={cn(
                          'text-lg font-semibold transition-colors',
                          isOpen
                            ? 'text-blue-600 dark:text-blue-400'
                            : 'text-slate-900 group-hover:text-blue-600 dark:text-[#E8E8E8] dark:group-hover:text-blue-400'
                        )}
                      >
                        {f.q}
                      </span>
                      <span
                        className={cn(
                          'flex h-9 w-9 shrink-0 items-center justify-center rounded-full border transition-all duration-300',
                          isOpen
                            ? 'rotate-45 border-blue-600 bg-blue-600 text-white'
                            : 'border-slate-200 text-slate-500 group-hover:border-blue-400 dark:border-navy-500/60 dark:text-[#94A3B8]'
                        )}
                      >
                        <Plus size={16} />
                      </span>
                    </button>
                  </h3>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        id={panelId}
                        role="region"
                        aria-labelledby={buttonId}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: EASE }}
                        className="overflow-hidden"
                      >
                        <p className="max-w-2xl pb-6 pr-12 leading-relaxed text-slate-500 dark:text-[#94A3B8]">{f.a}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
