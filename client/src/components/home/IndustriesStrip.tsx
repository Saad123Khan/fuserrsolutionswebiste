import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { projects, projectShortName } from '@/data/projects';
import { industries } from '@/data/industries';
import SectionHeading from '@/components/ui/SectionHeading';

const EASE = [0.22, 1, 0.36, 1] as const;


export default function IndustriesStrip() {
  return (
    <section className="relative bg-[var(--c-bg)] py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-14 flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <SectionHeading
            eyebrow="Industries"
            title={['Experience across', { text: 'real industries', className: 'text-gradient' }]}
            description="We've shipped production software in sectors where reliability and user experience matter."
          />
          <Link
            to="/industries"
            className="group inline-flex shrink-0 items-center gap-2 text-sm font-semibold text-blue-600 transition-colors hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
          >
            All industries
            <ArrowUpRight size={14} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {industries.map(({ name, slug, icon: Icon, accent, description }, i) => {
            const related = projects.filter((p) => p.industry === name);
            return (
              <motion.div
                key={name}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.55, delay: (i % 3) * 0.08, ease: EASE }}
              >
                <Link
                  to={`/industries#${slug}`}
                  className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-navy-500/40 dark:bg-navy-800/40"
                  style={{ ['--accent' as string]: accent }}
                >
                  {/* Accent wash on hover */}
                  <span
                    className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                    style={{ background: `radial-gradient(ellipse at 0% 0%, ${accent}18, transparent 60%)` }}
                  />
                  <span
                    className="pointer-events-none absolute inset-x-0 bottom-0 h-0.5 origin-left scale-x-0 transition-transform duration-500 group-hover:scale-x-100"
                    style={{ background: accent }}
                  />

                  <div className="relative flex items-start gap-4">
                    <span
                      className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-110"
                      style={{ background: `${accent}15`, border: `1px solid ${accent}30` }}
                    >
                      <Icon size={20} style={{ color: accent }} />
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-2">
                        <h3 className="font-semibold text-slate-900 dark:text-[#E8E8E8]">{name}</h3>
                        {related.length > 0 && (
                          <span className="font-mono text-[11px] text-slate-400 dark:text-[#64748B]">
                            {related.length} {related.length === 1 ? 'project' : 'projects'}
                          </span>
                        )}
                      </div>
                      <p className="mt-1 text-sm leading-relaxed text-slate-500 dark:text-[#94A3B8]">{description}</p>

                      {/* Revealed on hover (always visible on touch) */}
                      {related.length > 0 && (
                        <div className="grid grid-rows-[1fr] transition-[grid-template-rows] duration-500 [@media(hover:hover)]:grid-rows-[0fr] [@media(hover:hover)]:group-hover:grid-rows-[1fr]">
                          <div className="overflow-hidden">
                            <div className="flex flex-wrap gap-1.5 pt-4">
                              {related.map((p) => (
                                <span
                                  key={p.slug}
                                  className="rounded-full border px-2.5 py-0.5 text-[11px] font-medium"
                                  style={{ color: accent, borderColor: `${accent}35`, background: `${accent}10` }}
                                >
                                  {projectShortName[p.slug] ?? p.title}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
