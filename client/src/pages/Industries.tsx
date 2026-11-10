import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useLenis } from 'lenis/react';
import { ArrowRight, ArrowUpRight, CheckCircle2, Sparkles } from 'lucide-react';
import { industries, type Industry } from '@/data/industries';
import { projects, projectShortName } from '@/data/projects';
import Magnetic from '@/components/motion/Magnetic';
import Button from '@/components/ui/Button';
import CTABanner from '@/components/home/CTABanner';
import { useDocumentTitle, useMetaDescription } from '@/lib/useDocumentTitle';
import { cn } from '@/lib/utils';
import PageHero from '@/components/layout/PageHero';

const EASE = [0.22, 1, 0.36, 1] as const;
const inView = { once: true, margin: '-80px' } as const;

export default function IndustriesPage() {
  useDocumentTitle('Industries We Serve');
  useMetaDescription('Software for healthcare, logistics, ecommerce, home services, education and fitness, built by Fuserr Solutions.');
  const lenis = useLenis();

  const jump = (slug: string) => {
    const el = document.getElementById(slug);
    if (!el) return;
    if (lenis) lenis.scrollTo(el, { offset: -96 });
    else el.scrollIntoView({ behavior: 'smooth' });
    window.history.replaceState(null, '', `#${slug}`);
  };

  return (
    <>
      {/* ── Hero ── */}
      <PageHero
        variant="hex"
        eyebrow="Industries"
        title={['Software built for', { text: 'how your industry works', className: 'text-gradient pb-2' }]}
        description="We've shipped production platforms in these sectors, so we understand their workflows, users and compliance needs from day one."
      >
          {/* Industry chips */}
          <motion.ul
            initial="hidden"
            animate="show"
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.05, delayChildren: 0.7 } } }}
            className="flex flex-wrap justify-center gap-2"
          >
            {industries.map(({ slug, name, icon: Icon, accent }) => (
              <motion.li
                key={slug}
                variants={{ hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: EASE } } }}
              >
                <a
                  href={`#${slug}`}
                  onClick={(e) => {
                    e.preventDefault();
                    jump(slug);
                  }}
                  className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/70 px-4 py-2 text-sm font-medium text-slate-600 backdrop-blur transition-all hover:-translate-y-0.5 hover:text-slate-900 dark:border-navy-500/50 dark:bg-navy-800/50 dark:text-[#94A3B8] dark:hover:text-white"
                >
                  <Icon size={14} style={{ color: accent }} />
                  {name}
                </a>
              </motion.li>
            ))}
          </motion.ul>
      </PageHero>

      {/* ── Industry sections ── */}
      <section className="relative bg-[var(--c-bg-alt)] dark:bg-navy-900">
        <div className="mx-auto max-w-7xl divide-y divide-slate-200 px-4 dark:divide-navy-500/30 sm:px-6 lg:px-8">
          {industries.map((ind, i) => (
            <IndustryRow key={ind.slug} industry={ind} index={i} />
          ))}
        </div>
      </section>

      {/* ── Not listed ── */}
      <section className="relative bg-[var(--c-bg)] py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={inView}
            transition={{ duration: 0.7, ease: EASE }}
            className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-700 p-10 text-white sm:p-14"
          >
            <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-24 left-10 h-64 w-64 rounded-full bg-cyan-400/20 blur-3xl" />
            <div className="relative flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
              <div className="max-w-2xl">
                <Sparkles size={22} className="mb-4 text-blue-200" />
                <h2 className="text-3xl font-bold leading-tight sm:text-4xl">Don&apos;t see your industry?</h2>
                <p className="mt-3 text-blue-100">
                  Good software principles travel well. Tell us about your space and we&apos;ll show you how we&apos;d
                  approach it.
                </p>
              </div>
              <Magnetic strength={0.2}>
                <Button href="/contact" variant="secondary" size="lg" className="group border-0 bg-white text-blue-700 hover:bg-blue-50 dark:bg-white dark:text-blue-700 dark:hover:bg-blue-50">
                  Let&apos;s talk <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                </Button>
              </Magnetic>
            </div>
          </motion.div>
        </div>
      </section>

      <CTABanner />
    </>
  );
}

function IndustryRow({ industry: ind, index }: { industry: Industry; index: number }) {
  const Icon = ind.icon;
  const related = projects.filter((p) => p.industry === ind.name);
  const flip = index % 2 === 1;

  return (
    <div id={ind.slug} className="grid scroll-mt-28 items-center gap-12 py-20 lg:grid-cols-2 lg:gap-20 lg:py-24">
      {/* Info */}
      <motion.div
        initial={{ opacity: 0, x: flip ? 40 : -40 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={inView}
        transition={{ duration: 0.7, ease: EASE }}
        className={cn(flip && 'lg:order-2')}
      >
        <span
          className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl"
          style={{ background: `${ind.accent}15`, border: `1px solid ${ind.accent}35` }}
        >
          <Icon size={24} style={{ color: ind.accent }} />
        </span>
        <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl">{ind.name}</h2>
        <p className="mt-3 text-lg text-slate-500 dark:text-[#94A3B8]">{ind.description}</p>

        <div className="mt-7 rounded-2xl border-l-4 bg-white/60 p-5 dark:bg-navy-800/40" style={{ borderColor: ind.accent }}>
          <div className="mb-1 text-xs font-mono uppercase tracking-wider text-slate-400 dark:text-[#64748B]">The challenge</div>
          <p className="text-slate-700 dark:text-[#E8E8E8]">{ind.challenge}</p>
        </div>

        <div className="mt-7">
          <div className="mb-3 text-xs font-mono uppercase tracking-wider text-slate-400 dark:text-[#64748B]">What we build</div>
          <ul className="grid gap-3 sm:grid-cols-2">
            {ind.solutions.map((s, i) => (
              <motion.li
                key={s}
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.2 + i * 0.06, ease: EASE }}
                className="flex items-center gap-2.5 text-sm font-medium text-slate-700 dark:text-[#E8E8E8]"
              >
                <CheckCircle2 size={16} className="shrink-0" style={{ color: ind.accent }} />
                {s}
              </motion.li>
            ))}
          </ul>
        </div>
      </motion.div>

      {/* Related projects */}
      <motion.div
        initial={{ opacity: 0, x: flip ? -40 : 40 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={inView}
        transition={{ duration: 0.8, delay: 0.1, ease: EASE }}
        className={cn('space-y-4', flip && 'lg:order-1')}
      >
        <div className="text-xs font-mono uppercase tracking-wider text-slate-400 dark:text-[#64748B]">
          {related.length === 1 ? 'Featured project' : 'Featured projects'}
        </div>
        {related.map((p) => (
          <Link
            key={p.slug}
            to={`/work/${p.slug}`}
            className="group flex items-center gap-5 overflow-hidden rounded-3xl border border-slate-200 bg-white p-3 pr-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-navy-500/40 dark:bg-navy-800/40"
          >
            <div className="relative aspect-[4/3] w-36 shrink-0 overflow-hidden rounded-2xl bg-slate-100 dark:bg-navy-800 sm:w-48">
              <img
                src={p.cover}
                alt={p.title}
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
              />
            </div>
            <div className="min-w-0 flex-1">
              <div className="truncate font-semibold text-slate-900 transition-colors group-hover:text-blue-600 dark:text-white dark:group-hover:text-blue-400">
                {projectShortName[p.slug] ?? p.title}
              </div>
              <div className="mt-1 line-clamp-2 text-sm text-slate-500 dark:text-[#94A3B8]">{p.tagline}</div>
              <div className="mt-2 text-xs font-mono" style={{ color: ind.accent }}>
                {p.service}
              </div>
            </div>
            <ArrowUpRight
              size={18}
              className="shrink-0 text-slate-300 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-blue-500 dark:text-navy-500"
            />
          </Link>
        ))}
      </motion.div>
    </div>
  );
}
