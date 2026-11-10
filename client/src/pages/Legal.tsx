import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useLenis } from 'lenis/react';
import { CalendarDays } from 'lucide-react';
import PageHero from '@/components/layout/PageHero';
import ReadingProgress from '@/components/motion/ReadingProgress';
import { privacyPolicy, terms, type LegalDoc } from '@/data/legal';
import { formatDate, slugifyHeading } from '@/data/posts';
import { useDocumentTitle, useMetaDescription } from '@/lib/useDocumentTitle';
import { cn } from '@/lib/utils';

const EASE = [0.22, 1, 0.36, 1] as const;

export function PrivacyPage() {
  useDocumentTitle('Privacy Policy');
  useMetaDescription('How Fuserr Solutions collects, uses and protects your information.');
  return <LegalPage doc={privacyPolicy} />;
}

export function TermsPage() {
  useDocumentTitle('Terms of Service');
  useMetaDescription('Terms that govern your use of the Fuserr Solutions website.');
  return <LegalPage doc={terms} />;
}

function LegalPage({ doc }: { doc: LegalDoc }) {
  const ids = doc.sections.map((s) => slugifyHeading(s.title));
  const [active, setActive] = useState(ids[0]);
  const lenis = useLenis();

  useEffect(() => {
    const els = ids.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver(
      (entries) => {
        const vis = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (vis[0]) setActive(vis[0].target.id);
      },
      { rootMargin: '-15% 0px -70% 0px' }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [doc]);

  const jump = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    if (lenis) lenis.scrollTo(el, { offset: -110 });
    else el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <ReadingProgress />
      <PageHero
        variant="stars"
        eyebrow="Legal"
        title={[doc.title, { text: doc.highlight, className: 'text-gradient pb-2' }]}
        description={doc.intro}
      >
        <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-300 backdrop-blur-md">
          <CalendarDays size={15} className="text-cyan-300" /> Last updated {formatDate(doc.updated)}
        </span>
      </PageHero>

      <section className="relative bg-[var(--c-bg)] py-20 lg:py-24">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-12 lg:px-8">
          <aside className="hidden lg:col-span-3 lg:block">
            <nav aria-label="Sections" className="sticky top-28">
              <div className="mb-4 text-xs font-mono uppercase tracking-[0.18em] text-slate-400 dark:text-[#64748B]">Contents</div>
              <ol className="relative space-y-1 border-l border-slate-200 dark:border-navy-500/40">
                {doc.sections.map((s, i) => {
                  const id = ids[i];
                  const on = active === id;
                  return (
                    <li key={id} className="relative">
                      {on && (
                        <motion.span
                          layoutId="legal-indicator"
                          className="absolute -left-px top-0 h-full w-0.5 bg-blue-500"
                          transition={{ type: 'spring', stiffness: 400, damping: 34 }}
                        />
                      )}
                      <button
                        type="button"
                        onClick={() => jump(id)}
                        className={cn(
                          'flex w-full gap-2 py-1.5 pl-4 text-left text-sm transition-colors',
                          on ? 'font-medium text-blue-600 dark:text-blue-400' : 'text-slate-500 hover:text-slate-900 dark:text-[#94A3B8] dark:hover:text-white'
                        )}
                      >
                        <span className="font-mono text-xs opacity-60">{String(i + 1).padStart(2, '0')}</span>
                        {s.title}
                      </button>
                    </li>
                  );
                })}
              </ol>
            </nav>
          </aside>

          <div className="min-w-0 space-y-6 lg:col-span-8 lg:col-start-5">
            {doc.sections.map((s, i) => (
              <motion.section
                key={ids[i]}
                id={ids[i]}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, ease: EASE }}
                className="scroll-mt-28 rounded-3xl border border-slate-200 bg-white p-7 dark:border-navy-500/40 dark:bg-navy-800/40 sm:p-9"
              >
                <h2 className="mb-4 flex items-baseline gap-3 text-xl font-bold text-slate-900 dark:text-white">
                  <span className="font-mono text-sm text-blue-600 dark:text-blue-400">{String(i + 1).padStart(2, '0')}</span>
                  {s.title}
                </h2>
                {s.paragraphs?.map((p) => (
                  <p key={p} className="mb-4 leading-relaxed text-slate-600 last:mb-0 dark:text-[#B4C0D3]">
                    {p}
                  </p>
                ))}
                {s.list && (
                  <ul className="mb-4 space-y-2.5 last:mb-0">
                    {s.list.map((it) => (
                      <li key={it} className="flex items-start gap-3 leading-relaxed text-slate-600 dark:text-[#B4C0D3]">
                        <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-500" />
                        {it}
                      </li>
                    ))}
                  </ul>
                )}
              </motion.section>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
